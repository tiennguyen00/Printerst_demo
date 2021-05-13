import express from "express";
import controller from "../controllers/UserController";
import JWTMiddleware from "../middleware/JWTmiddleware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/routers/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const router = express.Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post(
  "/updateRegisterProfile",
  JWTMiddleware,
  upload.single("profilePhoto"),
  controller.updateRegisterInfo
);
router.post("/forgotPassword", controller.forgotPassword);
router.get("/getProfile", JWTMiddleware, controller.getProfile);
router.post("/post", JWTMiddleware, upload.single("linkFile"), controller.post);
router.get("/getPhotos", JWTMiddleware, controller.getPhotos);
router.post("/postWithTicket", upload.single("linkFile"), JWTMiddleware, controller.postWithTicket);
router.post("/postComment", JWTMiddleware, upload.single(""), controller.postComment);

export default router;
