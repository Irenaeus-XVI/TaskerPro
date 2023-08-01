import Jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
    let { token } = req.headers;
    Jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(501).json({ Message: "Invalid Token" });
        } else {
            if (decoded) {
                req.userId = decoded.id;
                console.log(decoded.id);
                next();
            }
        }
    });

} 