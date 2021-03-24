import User from "../models/User";
import UserService from "../services/UserService"
import Log from "../core/logging"

export default {
    register: async (req, res, next) => {
        let { email, password, confirmPassword } = req.body;
        UserService.register(email, password, confirmPassword)
            .then(result => {
                return res.status(201).json(result)
            })
            .catch((error) => {
                Log.error('UserService', error.message, error);
                return res.status(error.code).json(error);
            })
    },
    login: async (req, res, next) => {
        let { email, password } = req.body;
        UserService.login(email, password)
            .then((result) => {
                return res.status(201).json(result);
            })
            .catch((error) => {
                Log.error('UserService', error.message, error);
                return res.status(error.code).json(error);
            })
    },
    updateRegisterInfo: async (req, res) => {
        let { user } = req;
        console.log("User: ", req.user);
        let photoUrl = "";
        UserService.updateRegisterInfo(user._id, req.body, photoUrl)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((error) => {
                Log.error('UserService', error.message, error);
                return res.status(error.code).json(error);
            })
    }
}