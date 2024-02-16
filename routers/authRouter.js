import {Router} from "express";
import authController from "../controllers/authController.js";
import { signUpSchema} from "../Validators/signUpValidator.js";

import validator from "../Middleware/validator.js";
import { emailExists } from "../Middleware/emailExists.js";
import { signInSchema } from "../Validators/signInValidators.js";
import passport from "../Middleware/passport.js";
import { dniExists } from "../Middleware/dniExists.js";

const authRouter = Router()
const {signUp, signIn, loginWithToken}=authController

authRouter.post('/in', signIn)
authRouter.post('/up', validator(signUpSchema),emailExists,dniExists,   signUp)
authRouter.get('/token', passport.authenticate('jwt', {session:false}), loginWithToken)

export default authRouter