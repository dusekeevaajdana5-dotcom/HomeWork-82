import  { HydratedDocument, Model } from "mongoose";
import mongoose from "mongoose";
import { UserInfo, UserInfoGoogle } from "../types";
import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_WORK_FACTOR = 10;

export interface UserMethods {
    generateToken(): void;
}

type UserModel = Model<UserInfoGoogle, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserInfoGoogle, UserMethods, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<any>,value: string): Promise<boolean>{
                if (!this.isModified('username')) return true;

                const user = await User.findOne({username: value});
                return !Boolean(user);
            },
            message: 'This user is already registered'
        }
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
    },
    displayName: {
        type: String,
        required: true,
    },
    googleId: String,
    avatar: String,
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

const User = mongoose.model<UserInfoGoogle, UserModel>("User", UserSchema);
export default User;
