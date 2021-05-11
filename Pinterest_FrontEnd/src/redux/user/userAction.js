import { GET_CURRENT_USER } from './userTypes';

export const getCurrentUser = (user) => {
    return {
        type: GET_CURRENT_USER,
        payLoad: user
    }
}