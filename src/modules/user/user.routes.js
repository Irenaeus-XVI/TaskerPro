import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword, updateUser, deleteUser, softDelete, logOut } from './controller/user.controller.js';
import { auth } from '../middleware/auth.js';

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);
router.delete("/deleteUser", auth, deleteUser);
router.delete("/softDelete", auth, softDelete);
router.get("/logOut", auth, logOut);



export default router;