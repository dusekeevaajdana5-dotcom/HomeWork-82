import express from "express";
import User from "../models/User";
import { UserInfoGoogle } from "../types";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import auth, { RequestWithUser } from "../middlewares/auth";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { HydratedDocument } from "mongoose";


interface UserMethods {
    generateToken(): void;
}


type UserDocument = HydratedDocument<UserInfoGoogle, UserMethods>;

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.googleClientId);


usersRouter.post("/", async (req, res) => {
    const userData: Omit<UserInfoGoogle, "token" | "role"> = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.username,
    };

    try {

        const user = new User(userData) as unknown as UserDocument;
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({ message: e.message });
        }
    }
});


usersRouter.post("/sessions", async (req, res) => {
    const user = await User.findOne({ username: req.body.username }) as UserDocument | null;

    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({ error: "Invalid Password" });
    }

    const token = randomUUID();
    await user.updateOne({ $set: { token } });

    return res.send(user);
});


usersRouter.delete("/sessions", auth, async (expressReq, res) => {
    const req = expressReq as RequestWithUser;
    try {
        const user = req.user as unknown as UserDocument;

        user.generateToken();
        await user.save();

        res.send({ message: "Successful logout" });
    } catch (e) {
        res.status(500).send({ error: "Error during logout" });
    }
});


usersRouter.post("/login/google", async (req, res, next) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: req.body.credential,
            audience: config.googleClientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: "Google login Error!" });
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture;


        let user = await User.findOne({ googleId: id }) as UserDocument | null;

        if (!user) {
            user = new User({
                username: email,
                password: randomUUID(),
                googleId: id,
                displayName,
                avatar
            }) as unknown as UserDocument;
        }

        user.generateToken();
        await user.save();

        return res.send(user);

    } catch (e) {
        next(e);
    }
});

export default usersRouter;
