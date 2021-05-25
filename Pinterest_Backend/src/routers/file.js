import express from "express";
import JWTMiddleware from "../middleware/JWTmiddleware";
import controller from "../controllers/FileController";

const router = express.Router();
router.get("/getFileById/:fileId", JWTMiddleware, controller.getFileById);
router.get("/deleteFileById/:fileId", JWTMiddleware, controller.deleteFileById)
router.get("/getAllFile", controller.getAllFile);
router.get("/getAllCommentById/:fileId", controller.getAllCommentById);
router.put("/updateFileById/:fileId", JWTMiddleware, controller.updateFileById);

export default router;