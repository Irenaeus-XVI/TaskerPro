import express from 'express';
const router = express.Router();
import { addTask, updateTask, deleteTask, getAllTasksWithUserData } from './controller/task.controller.js';
import { auth } from '../middleware/auth.js';



router.post("/addTask", auth, addTask)
router.put("/updateTask", auth, updateTask)
router.delete("/deleteTask", auth, deleteTask)
router.get("/getAllTasksWithUserData", getAllTasksWithUserData)

export default router;