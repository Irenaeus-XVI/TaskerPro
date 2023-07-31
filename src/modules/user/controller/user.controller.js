
import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";




//NOTE - 1-signUp 
export const signUp = async (req, res) => {
    try {

        //NOTE - Check for user registered before
        let { userName, email, password, age, gender, phone } = req.body;
        const userFounded = await userModel.findOne({ email }).select("-password -_id ");
        if (userFounded) {
            res.status(200).json({ Message: "user Already Exist", userFounded });
        } else {
            const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SULTROUND));
            const user = await userModel.insertMany({ userName, email, password: hashedPassword, age, gender, phone });
            res.status(200).json({ Message: "user Added Successfully", user });
        }
    } catch (err) {
        res.status(501).json({ Message: "ERROR", err });
    }

}