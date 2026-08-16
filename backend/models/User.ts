import mongoose from "mongoose";
import {UserInfo} from "../../types";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema<UserInfo>({
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
    }
});

UserSchema.pre("save", async function () {
    const salt =  await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    console.log("save");
});

UserSchema.set("toJSON", {
  transform: function (_, ret: Partial<UserInfo>) {
      delete ret.password;
      return ret;
  }
})

const User = mongoose.model("User", UserSchema);
export default User;