import express from 'express';
const router = express.Router();
import { signUp, signIn, changePassword } from './controller/user.controller.js';
import { auth } from '../middleware/auth.js';

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/changePassword", auth, changePassword);



export default router;