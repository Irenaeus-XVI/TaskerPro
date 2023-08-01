


import taskModel from "../../../../database/models/task.model.js";
import userModel from "../../../../database/models/user.model.js";


//NOTE - 1-add task with status (toDo)(user must be logged in)
export const addTask = async (req, res) => {
    try {
        let { userId } = req;
        let { title, description, status, deadline } = req.body;
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            const task = await taskModel.create({ title, description, status, userId, deadline });
            user.tasks.push(task._id);
            await user.save();
            res.status(200).json({ Message: "Task Added Successfully.", task })
        } else {
            res.status(404).json({ Message: "User Not Found.", user })

        }

    }

    catch (err) {
        res.status(500).json({ Error: err });
    }

}



//NOTE - 2-update task (title , description , status) (user must be logged in) (creator only can update task)
export const updateTask = async (req, res) => {
    try {
        let { userId } = req;
        let { title, description, status, taskId } = req.body;
        const task = await taskModel.findOne({ _id: taskId });
        console.log(task);
        if (!task) {
            return res.status(404).json({ Message: "Task Not Found.", task });
        }
        const updatedTask = await taskModel.findOneAndUpdate({ _id: taskId, userId }, { title, description, status }, { new: true });
        if (updatedTask) {
            res.status(200).json({ Message: "Task Updated Successfully.", updatedTask });
        } else {
            res.status(404).json({ Message: "You Are Not Authorized To Update This Task.", updatedTask });
        }
    }
    catch (err) {
        res.status(500).json({ Error: err });

    }
}




//NOTE - 3-delete task(user must be logged in) (creator only can delete task)
export const deleteTask = async (req, res) => {
    try {
        let { userId } = req;
        let { taskId } = req.body;

        const task = await taskModel.findOne({ _id: taskId });
        console.log(task);
        if (!task) {
            return res.status(404).json({ Message: "Task Not Found.", task });
        }
        const deletedTask = await taskModel.findOneAndDelete({ _id: taskId, userId });

        if (deletedTask) {
            //NOTE - Remove Task From User Array 
            const user = await userModel.findById({ _id: userId });
            user.tasks = user.tasks.filter((task) => {
                return task.toString() != deletedTask._id;
            })
            await user.save();
            res.status(200).json({ Message: "Task Deleted Successfully.", deletedTask })
        } else {
            res.status(404).json({ Message: "You Are Not Authorized To Delete This Task", deletedTask });

        }
    }

    catch (err) {
        res.status(500).json({ Error: err });

    }


}



//NOTE - 4-get all tasks with user data
export const getAllTasksWithUserData = async (req, res) => {

    try {
        const tasks = await taskModel.find().populate({ path: "userId", select: "-_id -password" });
        if (tasks.length) {
            res.status(200).json({ Tasks: tasks });
        } else {
            res.status(200).json({ Message: "No Tasks Found." });
        }
    } catch (error) {
        res.status(500).json({ Error: err });
    }
}
//NOTE - 5-get tasks of oneUser with user data userId (user must be logged in)
export const getAllTasksOfOneUser = async (req, res) => {
    try {
        let { userId } = req;
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            const tasks = await taskModel.find({ userId }).populate({ path: "userId", select: " -password" });
            res.status(200).json({ Tasks: tasks });
        } else {
            res.status(404).json({ Message: "User Not Found " });

        }

    } catch (error) {
        res.status(500).json({ Error: err });

    }
}



//NOTE - 6-get all tasks that not done after deadline
export const getAllTasksThatNotDoneAfterDeadline = async (req, res) => {

    const currentDate = new Date()
    const tasks = await taskModel.find({
        $or: [
            { status: "toDo" }, { status: "doing" }
        ],
        deadline: { $lt: currentDate }
    });
    res.status(200).json({ Tasks: tasks });

}





