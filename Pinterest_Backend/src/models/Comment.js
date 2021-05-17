import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema(
  {
    userID: { type: String, require},
    postID: { type: String, require},
    ownerName: { type: String, require},
    linkAvatar: {type: String},
    content: {type: String}
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Comment", CommentSchema);