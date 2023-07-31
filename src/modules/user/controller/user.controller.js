
import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
export const signUp = (req, res) => {
    try {
        let { userName, email, password, age, gender, phone } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = userModel.insertMany({ userName, emai