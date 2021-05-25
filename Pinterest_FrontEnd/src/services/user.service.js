import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getProfile = () => requestService.get(requestUrl.getProfile);

const post = (data) => requestService.post(requestUrl.post, data);

const getPhotos = () => requestService.get(requestUrl.getPhotos);

const postWithTicket = (data) => requestService.post(requestUrl.postWithTicket, data);

const postComment = (data) => requestService.post(requestUrl.postComment, data);


export const userService = {
    getProfile,
    post, //Post khi user post ảnh mới lên
    getPhotos,
    postWithTicket,
    postComment
}