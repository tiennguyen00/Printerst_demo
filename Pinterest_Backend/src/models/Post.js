import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema(
  {
    userID: { type: String, require: true},
    status: { type: String},
    linkFile: { type: String },
    count: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Post", PostSchema);
