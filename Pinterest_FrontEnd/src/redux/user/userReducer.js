import { GET_CURRENT_USER } from './userTypes';

// =======================
// ======================
const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_USER: return {
            user: action.payLoad
        };
        default: 
            return state;
    }
}

export default userReducer;