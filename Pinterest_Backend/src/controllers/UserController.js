import User from "../models/User";
import UserService from "../services/UserService"
import Log from "../core/logging"   
import googleAPI from '../services/GoogleDrive';


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
    updateRegisterInfo: async (req, res, err) => {
        let { user } = req, photoUrl;

        googleAPI(req, res, err)
            .then(path => {
                photoUrl = path;
                UserService.updateRegisterInfo(user._id, req.body, photoUrl)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch((error) => {
                    Log.error('UserService', error.message, error);
                    return res.status(error.code).json(error);
                })    
            })
    },
    forgotPassword: async (req, res) => {
        UserService.forgotPassword(req.body.email)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(error => {
                return res.status(error.code).json(error);
            })
    }
}