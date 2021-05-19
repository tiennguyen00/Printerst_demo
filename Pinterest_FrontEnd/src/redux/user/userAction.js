import { GET_CURRENT_USER } from './userTypes';
import { LOAD_PHOTO_USER } from './userTypes';

export const getCurrentUser = (user) => {
    return {
        type: GET_CURRENT_USER,
        payLoad: user
    }
}

//Dùng để tự động load lại hình ảnh khi user vừa mới post xong!!
export const loadPhotos = (isLoad) => {
    return {
        type:  LOAD_PHOTO_USER,
        payLoad: isLoad,
    }
}