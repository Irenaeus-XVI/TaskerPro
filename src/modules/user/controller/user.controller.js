
import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import taskModel from "../../../../database/models/task.model.js";
import { sendEmail } from "../../../Email/sendEmail.js";
import { handleAsyncError } from '../../../middleware/handleAsyncError.js'
import { AppError } from "../../../utils/AppError.js";




//NOTE - 1-signUp 
export const signUp = handleAsyncError(async (req, res, next) => {


    //NOTE - Check for user registered before
    let { userName, email, password, age, gender, phone } = req.body;
    const userFounded = await userModel.findOne({ email }).select("-password -_id ");

    if (userFounded) {
        return next(new AppError('user Already Exist', 409));
    } else {
        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SULTROUND));
        const user = await userModel.insertMany({ userName, email, password: hashedPassword, age, gender, phone });
        const verifyToken = jwt.sign({ id: user[0]._id }, process.env.VERIFY_SECRET);
        sendEmail({ email, api: `http://localhost:3000/user/verify/${verifyToken}` });


        res.status(200).json({ Message: "user Added Successfully", user });
    }





});




//NOTE - 2-login-->with create token
export const signIn = handleAsyncError(async (req, res, next) => {
    let { email, password } = req.body;


    const userFounded = await userModel.findOne({ email });
    if (userFounded.verified) {
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
                return next(new AppError('Wrong password', 400));
            }
        }
        else {
            return next(new AppError('You Have To Register First.', 401));

        }
    } else {
        return next(new AppError('You Have To Verify Your Account First.', 401));
    }





});

//NOTE - 3-change password (user must be logged in)

export const changePassword = handleAsyncError(async (req, res, next) => {

    let { userId } = req;
    let { password } = req.body;
    const userFounded = await userModel.findById({ _id: userId });
    if (userFounded) {
        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SULTROUND));
        const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true }).select("-password -_id");
        res.status(200).json({ Message: "Password Updated Successfully.", updatedUser });
    } else {
        return next(new AppError('You Have To LogIn First.', 401));
    }

});


//NOTE - 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser = handleAsyncError(async (req, res, next) => {

    let { userId } = req;
    let { age, firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return next(new AppError('Both firstName and lastName are required.', 400));
    }
    const userName = firstName + " " + lastName

    const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { age, userName }, { new: true }).select("-password -_id");
    if (updatedUser) {
        res.status(200).json({ Message: "User Updated Successfully.", updatedUser });
    } else {
        return next(new AppError('You Have To LogIn First.', 401));

    }



});

//NOTE - 5-delete user(user must be logged in)
export const deleteUser = handleAsyncError(async (req, res, next) => {

    let { userId } = req;
    console.log(userId, "asd");

    const deletedUser = await userModel.findByIdAndDelete({ _id: userId });
    console.log(deletedUser);
    if (deletedUser) {
        const tasks = await taskModel.deleteMany({ userId });
        res.status(200).json({ Message: "User Deleted Successfully.", deletedUser, tasks });
    } else {
        return next(new AppError('No User Found.', 404));

    }

});

//NOTE - 6-soft delete(user must be logged in)
export const softDelete = handleAsyncError(async (req, res, next) => {

    let { userId } = req;
    const softDeletedUser = await userModel.findByIdAndUpdate({ _id: userId }, { deleted: true }, { new: true });
    if (softDeletedUser) {
        res.status(200).json({ Message: "User Soft Deleted Successfully.", softDeletedUser });
    }
    else {
        return next(new AppError('You have to log in first."', 401));

    }

});

//NOTE - 7-logout

export const logOut = handleAsyncError(async (req, res, next) => {

    let { userId } = req;
    const loggedOutUser = await userModel.findByIdAndUpdate({ _id: userId }, { loggedOut: true }, { new: true }).select(" -password");
    if (loggedOutUser) {
        res.status(200).json({ Message: "You have successfully logged out." });
    } else {
        return next(new AppError('User not found."', 404));
    }






});


export const verifyEmail = handleAsyncError((req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return res.json({ err: err });
        const updatedUser = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true })
        res.status(200).json({ Message: "Verify", updatedUser })

    })

});



