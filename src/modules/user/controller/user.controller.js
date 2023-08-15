
import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import taskModel from "../../../../database/models/task.model.js";



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
        res.status(500).json({ ERROR: err });
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
                await userModel.findByIdAndUpdate(userFounded._id, { loggedOut: false });
                const tokenPayload = {
                    id: userFounded._id,
                    name: userFounded.userName,
                }
                jwt.sign(tokenPayload, process.env.SECRETKEY, (err, decoded) => {

                    res.json({ Message: "Welcome.", token: decoded });
                });

            } else {
                res.status(401).json({ Message: "Wrong password" });
            }
        }
        else {
            res.status(401).json({ Message: "You Have To Register First." });
        }
    }
    catch (err) {
        res.status(500).json({ Message: "Error", err });;
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
            res.status(401).json({ Message: "You Have To LogIn First.", updatedUser });
        }
    }
    catch (err) {
        res.status(500).json({ Message: "Error", err });;
    }
}


//NOTE - 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser = async (req, res) => {
    try {
        let { userId } = req;
        let { age, firstName, lastName } = req.body;
        if (!firstName || !lastName) {
            return res.status(400).json({ Message: "Both firstName and lastName are required." });
        }
        const userName = firstName + " " + lastName

        const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { age, userName }, { new: true }).select("-password -_id");
        if (updatedUser) {
            res.status(200).json({ Message: "User Updated Successfully.", updatedUser });
        } else {
            res.status(401).json({ Message: "You Have To LogIn First." });
        }
    }
    catch (err) {
        res.status(500).json({ Message: "Error", err });
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
            const tasks = await taskModel.deleteMany({ userId });
            res.status(200).json({ Message: "User Deleted Successfully.", deletedUser, tasks });
        } else {
            res.status(404).json({ Message: "No User Found." });
        }
    }
    catch (err) {
        res.status(500).json({ Message: "Error", err });
    }
}

//NOTE - 6-soft delete(user must be logged in)
export const softDelete = async (req, res) => {
    try {
        let { userId } = req;
        const softDeletedUser = await userModel.findByIdAndUpdate({ _id: userId }, { deleted: true }, { new: true });
        if (softDeletedUser) {
            res.status(200).json({ Message: "User Soft Deleted Successfully.", softDeletedUser });
        }
        else {
            res.status(401).json({ Message: "You have to log in first." });
        }
    }
    catch (err) {
        res.status(500).json({ Message: "Error", err });
    }
}

//NOTE - 7-logout

export const logOut = async (req, res) => {
    try {
        let { userId } = req;
        const loggedOutUser = await userModel.findByIdAndUpdate({ _id: userId }, { loggedOut: true }, { new: true }).select(" -password");
        if (loggedOutUser) {
            res.status(200).json({ Message: "You have successfully logged out." });
        } else {
            res.status(404).json({ Message: "User not found." });
        }


    }
    catch (err) {
        res.status(501).json({ err })
    }
}



