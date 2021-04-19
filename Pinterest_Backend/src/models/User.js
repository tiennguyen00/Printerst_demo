import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, maxlength: 3 },
    profilePhoto: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
