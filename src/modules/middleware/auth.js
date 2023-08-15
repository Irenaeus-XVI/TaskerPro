import Jwt from "jsonwebtoken";
import userModel from "../../../database/models/user.model.js";


export const auth = (req, res, next) => {
    let { token } = req.headers;
    Jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
        if (err) {
            res.status(501).json({ Message: "Invalid Token" });
        } else {
            const user = await userModel.findById(decoded.id);
            if (decoded.id && !user.loggedOut) {
                req.userId = decoded.id;
                console.log(decoded.id);
                next();
            } else {
                res.status(401).json({ Message: "Unauthorized: User is logged out." });
            }
        }
    });

} 