import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["toDo", "doing", "done"],
        default: "toDo"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    assignTo: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    deadline: Date
});


const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;