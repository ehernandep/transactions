import { model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    company: { required: true, type: String },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    city: { required: true, type: String },
    rol: { required: true, type: String },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model("Users", UserSchema);
export default UserModel;
