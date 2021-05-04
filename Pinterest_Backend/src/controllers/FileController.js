import fileService from '../services/FileService';
import Log from '../core/logging';
import { googleAPIDelete } from '../services/GoogleDrive';

export default {
    getFileById: async (req, res, next) => {
        let { fileId } = req.params;
        fileService.getFileById(fileId)
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(error => {
                Log.error('FileService', error.message, error);
                return res.status(error.code).json(error);
            })
    },
    deleteFileById: async (req, res, next) => {
        let { fileId } = req.params;
        fileService.deleteFileById(fileId)
            .then((driveId) => {
                googleAPIDelete(driveId);
                return res.status(200);
            })
            .catch(error => {
                Log.error('FileService', error.message, error);
                return res.status(error.code).json(error);
            })
    }
    
    
}