import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema(
  {
    userID: { type: String, default: "null" },
    status: { type: String, default: "" },
    link: { type: String },
    count: { type: Number, default: 0 }, //đếm lượt react
    originalName: { type: String, default: "" },
    photoOfUser: { type: String, default: ""}, // Khi nhấn vào nut save ở trang Home thì lưu tên chủ nhân của ảnh đó vào đây.
    views: {type: Number, default: 0},
    downloads: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Post", PostSchema);
