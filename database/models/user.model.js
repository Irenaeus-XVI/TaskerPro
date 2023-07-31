import mongoose from "mongoose";


//NOTE - userSchema


const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    phone: String
}, {
    timestamps: true
});



const userModel = mongoose.model("User", userSchema);

export default userModel;