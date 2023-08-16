import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword, updateUser, deleteUser, softDelete, logOut, verifyEmail } from './controller/user.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { signInSchema, signUpSchema } from './user.validator.js';


router.post("/signUp", validation(signUpSchema), signUp);
router.post("/signIn", validation(signInSchema), signIn);
router.put("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);
router.delete("/deleteUser", auth, deleteUser);
router.delete("/softDelete", auth, softDelete);
router.post("/logOut", auth, logOut);
router.get("/verify/:token", verifyEmail)



export default router;