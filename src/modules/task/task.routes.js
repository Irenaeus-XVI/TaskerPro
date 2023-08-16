import express from 'express';
const router = express.Router();
import { addTask, updateTask, deleteTask, getAllTasksWithUserData, getAllTasksOfOneUser, getAllTasksThatNotDoneAfterDeadline } from './controller/task.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { taskSchema } from './task.validator.js';



router.post("/addTask", auth, validation(taskSchema), addTask)
router.put("/updateTask", auth, updateTask)
router.delete("/deleteTask", auth, deleteTask)
router.get("/getAllTasksWithUserData", getAllTasksWithUserData)
router.get("/getAllTasksOfOneUser", auth, getAllTasksOfOneUser)
router.get("/getAllTasksThatNotDoneAfterDeadline", getAllTasksThatNotDoneAfterDeadline)

export default router;