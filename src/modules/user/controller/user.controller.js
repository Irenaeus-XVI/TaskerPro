
import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
    try {

        //NOTE - Check for user registered before
        let { userName, email, password, age, gender, phone } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await userModel.insertMany({ userName, email, password: hashedPassword, age, gender, phone });
        res.json({ Message: "user Added Successfully", user });

    } catch (err) {
        res.json({ Message: "ERROR", err });
    }

}