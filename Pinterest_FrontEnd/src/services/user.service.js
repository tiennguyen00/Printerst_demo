import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getProfile = () => requestService.get(requestUrl.getProfile);

export const userService = {
    getProfile
}