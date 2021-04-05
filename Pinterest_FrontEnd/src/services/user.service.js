import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getProfile = () => requestService.get(requestUrl.getProfile);

const post = (data) => requestService.post(requestUrl.post, data);

export const userService = {
    getProfile,
    post
}