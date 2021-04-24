import { SHOW_VIEWER } from './viewerTypes';

export const showViewer = (fileId, isFullScreenViewer = false) => {
    return {
        type: SHOW_VIEWER,
        payload: {
            fileId,
            isFullScreenViewer
        }
    }
}