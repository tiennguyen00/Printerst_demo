import { GET_CURRENT_USER } from './userTypes';
import { LOAD_PHOTO_USER } from './userTypes';

// =======================
// ======================
const initialState = {
    user: {},
    isLoad: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_USER: return {
            ...state,
            user: action.payLoad
        };
        case LOAD_PHOTO_USER: return {
            ...state,
            isLoad: action.payLoad
        };
        default: 
            return state;
    }
}

export default userReducer;