
export const globalError =
    //NOTE - Global Error Handling.
    (err, req, res, next) => {
        process.env.MODE == 'dev' ? res.status(err.statusCode).json({ Error: err.message, stack: err.stack }) : res.status(500).json({ Error: err.message });
    }