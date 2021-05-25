import { LOAD_PHOTO_COMMENT } from './fileTypes';

// =======================
// ======================
const initialState = {
    isLoad: false
}

const fileReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_PHOTO_COMMENT: return {
            ...state,
            isLoad: action.payLoad
        }
        default: 
            return state;
    }
}

export default fileReducer;