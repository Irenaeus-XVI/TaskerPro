import { AppError } from "../utils/AppError.js";

export function validation(Schema) {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (!error) {
            next();
        }
        else {
            return next(new AppError(error, 409));
        }
    }

}