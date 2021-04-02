<<<<<<< HEAD
import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getProfile = () => requestService.get(requestUrl.getProfile);

export const userService = {
    getProfile
=======
import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getProfile = () => requestService.get(requestUrl.getProfile);

export const userService = {
    getProfile
>>>>>>> b935cc25f7d2528d37b10017ce3f5c883d959419
}