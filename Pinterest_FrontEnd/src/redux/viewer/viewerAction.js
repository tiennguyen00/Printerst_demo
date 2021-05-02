import { SHOW_VIEWER, HIDE_VIEWER } from './viewerTypes';

export const showViewer = (fileId, isFullScreenViewer = false) => {
    return {
        type: SHOW_VIEWER,
        payload: {
            fileId,
            isFullScreenViewer
        }
    }
};

export const hideViewer = () => {
    return {
        type: HIDE_VIEWER
    }
}