import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword, updateUser, deleteUser, softDelete, logOut, verifyEmail } from './controller/user.controller.js';
import { auth } from '../../middleware/auth.js';


router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);
router.delete("/deleteUser", auth, deleteUser);
router.delete("/softDelete", auth, softDelete);
router.post("/logOut", auth, logOut);
router.get("/verify/:token", verifyEmail)



export default router;