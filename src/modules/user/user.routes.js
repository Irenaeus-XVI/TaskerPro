import express from 'express';
const router = express.Router();
import { signUp } from './controller/user.controller.js';


router.post("/signUp", signUp);



export default router;