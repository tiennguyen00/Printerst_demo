import { SHOW_VIEWER } from './viewerTypes';

// =======================
// ======================
const initialState = {
    pins: {
        fileId: null,
        visible: false
    }
}

const viewerReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_VIEWER: return {
            // ...state,
        }
        default: 
            return state;
    }
}

export default viewerReducer;