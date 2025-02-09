require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { authenticateUser } = require("./users/authentication.middleware");
const userController = require("./users/userController");
const todoController = require("./todos/todoController");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use(authenticateUser);
app.use("/todos", todoController);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server on port ${PORT}: `, err);
    console.error(`Error: ${err.message}`);
    return;
  }
  console.log(`Server started successfully! Listening on port ${PORT}...`);
});
