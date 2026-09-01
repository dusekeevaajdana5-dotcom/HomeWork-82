import express from "express";
import User from "../models/User";
import {UserInfo} from "../types";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
    const userData: Omit<UserInfo, "token" | "role"> = {
        username : req.body.username,
        password : req.body.password,
    };

    try {
        const user = new User (userData);
        await user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({message: e.message});
        }
    }
});


usersRouter.post ("/sessions", async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        return res.status(400).send({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({message: "Invalid Password"});
    }

    const token = randomUUID();
    await user.updateOne(
        { _id: user._id },
        { $set: { token } }
    );

   return res.send({message: "Username and password are correct!", token});
});

export default usersRouter;