# TaskerPro

TaskerPro is a task management application built using Express and Mongoose, allowing users to manage their tasks efficiently. Users can sign up, log in, add tasks, update task status, and perform various other actions to organize their tasks effectively.

## Features

- User Authentication: Users can sign up and log in securely using hashed passwords. Token-based authentication is used to protect API endpoints.

- Task Management: Users can add tasks, update task details, and change the status of tasks (To-Do, Doing, Done).

- User Profile: Users can update their profile information such as age, first name, and last name.

- Task Filtering: The app provides filters to get tasks for a specific user and tasks that are not completed after the deadline.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing


## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   `git clone https://github.com/Irenaeus-XVI/New-folder.git`

2. Install dependencies:

   `cd TaskerPro`

   `npm install`


3. Set up environment variables:

Create a `.env` file in the root directory and provide the following variables:



    `PORT=3000`

    `MONGODB_URI=your_mongodb_connection_string`

    `SECRET_KEY=your_secret_key_for_jwt`

    `SALT_ROUNDS=10`


4. Run the app:

   `npm start`



The server will start on `http://localhost:3000`.

the user API provides endpoints for user registration, login, updating user information, deleting users, and more.

- **POST** `/user/signUp`: Register a new user.
- **POST** `/user/signIn`: Login and get an access token.
- **PUT** `/user/changePassword`: Change the user's password (authentication required).
- **PUT** `/user/updateUser`: Update user information (authentication required).
- **DELETE** `/user/deleteUser`: Delete the user account (authentication required).
- **DELETE** `/user/softDelete`: Soft delete the user account (authentication required).
- **GET** `/user/logOut`: Logout and invalidate the access token (authentication required).

### Task API

The task API provides endpoints for adding tasks, updating task information, deleting tasks, and retrieving tasks.

- **POST** `/task/addTask`: Add a new task (authentication required).
- **PUT** `/task/updateTask`: Update task information (authentication required).
- **DELETE** `/task/deleteTask`: Delete a task (authentication required).
- **GET** `/task/getAllTasksWithUserData`: Get all tasks with user data.
- **GET** `/task/getAllTasksOfOneUser`: Get all tasks of a specific user (authentication required).
- **GET** `/task/getAllTasksThatNotDoneAfterDeadline`: Get all tasks that are not done after the deadline.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Author

[Irenaeus-XVI](https://github.com/Irenaeus-XVI)



