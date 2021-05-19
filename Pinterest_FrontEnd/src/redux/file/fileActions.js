import { LOAD_PHOTO_COMMENT } from './fileTypes';

export const loadComments = (isLoad) => {
    return {
        type: LOAD_PHOTO_COMMENT,
        payLoad: isLoad
    }
}