import User, {UserSchema} from "../models/User";
import Post from "../models/Post"
import Comment from '../models/Comment';
import md5 from "md5";
import {ServiceError} from "../utils/ServiceError";
import {Token} from '../models/Token'
import crypto from 'crypto';
import revmd5 from 'reverse-md5';



export default {
    register: async (email, password, confirmPassword) => {
        let user = await User.findOne({email})
        //Kiểm tra đã nhập confirmPassword đúng chưa?
        if(password !== confirmPassword)
            return Promise.reject(new ServiceError(405, "These passwords don't match"));
        //Kiếm tra user đã tồn tại trong database chưa?
        if (!user) { 
            let register = new User({email, password: md5(password), status: "true" })
            return register.save()
                .then(async (result) => {
                    let user = JSON.parse(JSON.stringify(result));
                })
                .catch(error => {
                    return Promise.reject(new ServiceError(500, error.message, error));
                });
        }
        else
            return Promise.reject(new ServiceError(400, "User existed!"));
        
    },
    login: async (email, password) => {
        let user = await User.findOne({email, password: md5(password)});
        if (user) {
            let token = await Token.createToken(user);
            return Promise.resolve({
                email,
                token
            })
        }

        return Promise.reject(new ServiceError(400, 'Username or password is not correct!'))
    },
    updateRegisterInfo: async (userId, body, photoUrl) => {
        return User.findOne({_id: userId}).then(async (user) => {
            if (user) {
                user.firstName = body.firstName;
                user.lastName = body.lastName;
                user.age = body.age;
                user.profilePhoto = photoUrl;
                let updatedUser = await user.save();
                delete updatedUser.password;
                delete updatedUser.id;
                delete updatedUser.__v;
                delete updatedUser.createdAt;
                delete updatedUser.updatedAt;

                return Promise.resolve(updatedUser);
            }
            return Promise.reject(new ServiceError(400, "Load fail!!!"));
        },
        async (error) => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    },

    getProfile: async (userId) => {
        return User.findOne({_id: userId}).then(async (user) => {
            if(user) {
                return Promise.resolve(user);
            }
            return Promise.reject(new ServiceError(400, "User is not exists!")); 
        },
        async (error) => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    },
    post: async (userID, status, link, originalName, photoOfUser) => {
        let post = new Post({userID, status, link, originalName, photoOfUser })
            return post.save()
                .then(async (result) => {
                    let post = JSON.parse(JSON.stringify(result));
                })
                .catch(error => {
                    return Promise.reject(new ServiceError(500, error.message, error));
                });
    },
    postWithTicket: async (userID, link, originalName, photoOfUser) => {
        let post = new Post({userID, link, originalName, photoOfUser});
            return post.save()
                    .then(async (result) => {
                         return JSON.parse(JSON.stringify(result));
                    })
                    .catch(error => {
                        return Promise.reject(new ServiceError(500, error.message, error));
                    });
    },

    getPhotos: async (userId) => {
        
        return Post.find({userID: userId}).then(async (photos) => {
            if(photos){
                return Promise.resolve(photos);
            }
            return Promise.reject(new ServiceError(400, "Not found any photo!"))
        }, async (error) => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    },
    postComment: async (userID, postID, ownerName, linkAvatar, content) => {
        let comment = new Comment({userID, postID, ownerName, linkAvatar, content});
        return comment.save()
        .then(async (result) => {
            let post = JSON.parse(JSON.stringify(result));
        })
        .catch(error => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    },

    forgotPassword: async (email) => {
        return User.findOne({email}).then(async (user) => {
            if (user) {
               const rev = revmd5();
            //    console.log(rev(user.password));
                return Promise.resolve({message: `Hi, ${user.email || 'Customer'}. Your password is ${rev(user.password).str}`});
            }
            return Promise.reject(new ServiceError(400, "User is not exists!"));
        },
        async (error) => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    },
    generateNewPassword: () => {
        return crypto.randomBytes(12).toString('hex');
    },

    getForgotPasswordMailTemplate(user, newPassword) {
        return `<p>Hi, ${user.name || 'Customer'}, <br/> Your new password is ${newPassword}</p>`
    },
}