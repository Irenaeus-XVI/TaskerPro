import Jwt from "jsonwebtoken";
import userModel from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";


export const auth = (req, res, next) => {
    let { token } = req.headers;
    Jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
        if (err) {
            return next(new AppError('Invalid Token', 401));

        } else {
            const user = await userModel.findById(decoded.id);
            if (decoded.id && !user.loggedOut) {
                req.userId = decoded.id;
                console.log(decoded.id);
                next();
            } else {
                return next(new AppError('Unauthorized: User is logged out.', 401));
            }
        }
    });

} 