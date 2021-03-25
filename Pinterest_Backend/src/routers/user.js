import express from 'express'
import controller from '../controllers/UserController'
import JWTMiddleware from '../middleware/JWTmiddleware';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage });

const router = express.Router()
router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/updateRegisterProfile', JWTMiddleware, controller.updateRegisterInfo)
router.post('/forgotPassword', controller.forgotPassword)

export default router