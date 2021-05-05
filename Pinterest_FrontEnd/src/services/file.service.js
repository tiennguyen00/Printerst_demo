import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getFileById = fileId => requestService.getWithoutTrackLoading(`${requestUrl.getFileById}/${fileId}`);
const deleteFileById = (fileId) => requestService.getWithoutTrackLoading(`${requestUrl.deleteFileById}/${fileId}`);
const getDownloadUrl = fileId => requestService.get(`${requestUrl.getDownloadUrl}/${fileId}`);

export const fileService = {
    getFileById,
    deleteFileById
}