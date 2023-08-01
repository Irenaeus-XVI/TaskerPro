import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword, updateUser, deleteUser } from './controller/user.controller.js';
import { auth } from '../middleware/auth.js';

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);
router.delete("/deleteUser", auth, deleteUser);



export default router;