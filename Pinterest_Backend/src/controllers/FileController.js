import fileService from "../services/FileService";
import Log from "../core/logging";
import { googleAPIDelete } from "../services/GoogleDrive";

export default {
  getFileById: async (req, res, next) => {
    let { fileId } = req.params;
    await fileService
      .getFileById(fileId)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("FileService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  deleteFileById: async (req, res, next) => {
    let { fileId } = req.params;
    await fileService
      .deleteFileById(fileId)
      .then((driveId) => {
        googleAPIDelete(driveId);
        return res.status(200);
      })
      .catch((error) => {
        Log.error("FileService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  getAllFile: async (req, res, next) => {
    await fileService
      .getAllFile()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("FileService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  getAllCommentById: async (req, res, next) => {
    let { fileId } = req.params;
    await fileService
      .getAllCommentById(fileId)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("FileService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  updateFileById: async (req, res, next) => {
    let post = req.body;
    await fileService
      .updateFileById(post)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("FileService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
};
