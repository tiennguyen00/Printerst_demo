import User, {UserSchema} from "../models/User";
import md5 from "md5";
import {ServiceError} from "../utils/ServiceError";
import {Token} from '../models/Token'

export default {
    register: async (email, password) => {
        let user = await User.findOne({email})
        if (!user) {
            let register = new User({email, password: md5(password), status: "true" })
            return register.save()
                .then(async (result) => {
                    let user = JSON.parse(JSON.stringify(result));
                    console.log("Result: ", user);
                })
                .catch(error => {
                    return Promise.reject(new ServiceError(500, error.message, error));
                });
        }
        return Promise.reject(new ServiceError(400, "User existed!"))
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
    }
}