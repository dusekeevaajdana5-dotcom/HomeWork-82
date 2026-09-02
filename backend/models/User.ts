import  { HydratedDocument, Model } from "mongoose";
import mongoose from "mongoose";
import { UserInfo } from "../types";
import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_WORK_FACTOR = 10;

interface UserMethods {
    generateToken(): void;
}

type UserModel = Model<UserInfo, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserInfo, UserMethods, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["administrator", "user"],
        default: "user"
    }
});


UserSchema.methods.generateToken = function (this: HydratedDocument<UserInfo, UserMethods>) {
    this.token = crypto.randomUUID();
};


UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});

UserSchema.set("toJSON", {
    transform: function (_, ret: Partial<UserInfo>) {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model<UserInfo, UserModel>("User", UserSchema);
export default User;
