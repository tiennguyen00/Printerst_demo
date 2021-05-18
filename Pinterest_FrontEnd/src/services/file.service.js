import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getFileById = fileId => requestService.getWithoutTrackLoading(`${requestUrl.getFileById}/${fileId}`);
const deleteFileById = (fileId) => requestService.getWithoutTrackLoading(`${requestUrl.deleteFileById}/${fileId}`);
const getDownloadUrl = fileId => requestService.get(`${requestUrl.getDownloadUrl}/${fileId}`);
const getAllFile = () => requestService.get(requestUrl.getAllFile);
const getAllCommentById = (fileId) => requestService.getWithoutTrackLoading(`${requestUrl.getAllCommentById}/${fileId}`);
const updateFileById = payload => requestService.put(`${requestUrl.updateFileById}/${payload.postID}`, payload);

export const fileService = {
    getFileById,
    deleteFileById,
    getAllFile,
    getAllCommentById,
    updateFileById
}