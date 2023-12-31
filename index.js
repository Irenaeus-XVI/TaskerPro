//NOTE - import dotenv
import * as dotenv from 'dotenv';
//NOTE - configurations 
dotenv.config();
//NOTE - import expressJS
import express from 'express';
const app = express();
const port = 3000;
//NOTE - CONNECT DATABASE
import { connection } from './database/connection.js';
connection();
import userRoutes from './src/modules/user/user.routes.js';
import taskRoutes from './src/modules/task/task.routes.js';
import { AppError } from './src/utils/AppError.js';
import { globalError } from './src/utils/GlobalErrorHandling.js';
app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.use('*', (req, res, next) => {
    // res.json({ Message: `Invalid Url ${req.originalUrl}` });
    // next(new Error(`Invalid Url ${req.originalUrl}`));
    next(new AppError(`Invalid Url ${req.originalUrl}`, 404));
})



//NOTE - Global Error Handling.
app.use(globalError);
app.listen(port, () => console.log(`Server is listening on port ${port}!`));