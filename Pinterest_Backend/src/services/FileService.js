import { ServiceError } from "../utils/ServiceError";
import mongoose from "mongoose";
import File from "../models/Post";
import Comment from "../models/Comment";

export default {
    getFileById: async (fileId) => {
        return File.find({_id: fileId})
            .then(async (file) => {
                if (file) {
                    return Promise.resolve(file)
                }
                return Promise.reject(new ServiceError(400, "Not found any file!"))
            }, async (error) => {
                return Promise.reject(new ServiceError(500, error.message, error));
            });
    },
    deleteFileById: async (fileId) => {
        return File.findOne({_id: fileId})
            .then(async (file) => {
                if(!file)
                    return Promise.reject(new ServiceError(400, "File not existed!"));
                const dele = await File.deleteOne({_id: fileId});
                return Promise.resolve(file.link.split("=")[1]);
            }, async (error) => {
                return Promise.reject(new ServiceError(500, error.message, error));
            });
    },
    getAllFile: async () => {
        return File.find()
            .then(async (file) => {
                if(file.length === 0)
                    return Promise.reject(new ServiceError(400, "File not existed!"));
                return Promise.resolve(file);
            }, async (error) => {
                return Promise.reject(new ServiceError(500, error.message, error));
            });
    },
    getAllCommentById: async (fileId) => {
        return Comment.find({postID: fileId})
            .then(async (file) => {
                if(file.length === 0)
                    return Promise.reject(new ServiceError(400, "Not comment is founded!"));
                return Promise.resolve(file);
            }, async (error) => {
                return Promise.reject(new ServiceError(500, error.message, error));
            });
    },
    updateFileById: async (post) => {
        const query = {'_id': post.postID};
        return await File.findByIdAndUpdate(query, post).catch(err => {
            console.log(err);
            return err;
        })
    }
}