import User, {UserSchema} from "../models/User";
import md5 from "md5";

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
    }
}