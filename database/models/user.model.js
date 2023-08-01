import mongoose from "mongoose";


//NOTE - userSchema


const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    phone: String,
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});



const userModel = mongoose.model("User", userSchema);

export default userModel;