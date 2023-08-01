import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword, updateUser } from './controller/user.controller.js';
import { auth } from '../middleware/auth.js';

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);



export default router;