import { SHOW_VIEWER, HIDE_VIEWER } from './viewerTypes';

// =======================
// ======================
const initialState = {
    fileId: null,
    visible: false
}

const viewerReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_VIEWER: return {
            ...state,
            fileId: action.payload.fileId,
            isFullScreenViewer: action.payload.isFullScreenViewer,
            visible: true,
        };
        case HIDE_VIEWER: return {
            ...state,
            fileId: null,
            visible: false,
        };
        default: 
            return state;
    }
}

export default viewerReducer;