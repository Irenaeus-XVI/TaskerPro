
import userModel from "../../../../database/models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken';



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

//NOTE - 2-login-->with create token
export const signIn = async (req, res) => {

    try {
        let { email, password } = req.body;
        const userFounded = await userModel.findOne({ email });
        if (userFounded) {
            const hashedPassword = bcrypt.compareSync(password, userFounded.password);

            if (hashedPassword) {
                jwt.sign({ id: userFounded._id, name: userFounded.userName }, process.env.SECRETKEY, (err, decoded) => {
                    res.json({ Message: "Welcome.", token: decoded });
                });

            } else {
                res.json({ Message: "Wrong password" });
            }
        }
        else {
            res.json({ Message: "You Have To Register First." });
        }
    }
    catch (err) {
        res.status(400).json({ err });
    }

}


//NOTE - 3-change password (user must be logged in)
export const changePassword = async (req, res) => {
    try {
        let { userId } = req;
        let { password } = req.body;
        const userFounded = await userModel.findById({ _id: userId });
        if (userFounded) {
            const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SULTROUND));
            const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true }).select("-password -_id");
            res.status(200).json({ Message: "Password Updated Successfully.", updatedUser });
        } else {
            res.status(200).json({ Message: "You Have To LogIn First.", updatedUser });
        }
    }
    catch (err) {
        res.status(501).json({ err });
    }
}


//NOTE - 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser = async (req, res) => {
    try {
        let { userId } = req;
        let { age, firstName, lastName } = req.body;
        const userName = firstName + " " + lastName

        const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { age, userName }, { new: true }).select("-password -_id");
        if (updatedUser) {
            res.status(200).json({ Message: "User Updated Successfully.", updatedUser });
        } else {
            res.status(200).json({ Message: "You Have To LogIn First." });
        }
    }
    catch (err) {
        res.status(501).json({ err })
    }


}

//NOTE - 5-delete user(user must be logged in)
export const deleteUser = async (req, res) => {
    try {
        let { userId } = req;
        console.log(userId, "asd");

        const deletedUser = await userModel.findByIdAndDelete({ _id: userId });
        console.log(deletedUser);
        if (deletedUser) {
            res.status(200).json({ Message: "User Deleted Successfully.", deletedUser });
        } else {
            res.status(200).json({ Message: "No User Found." });
        }
    }
    catch (err) {
        res.status(501).json({ err })
    }
}





