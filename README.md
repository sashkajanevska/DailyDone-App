# DailyDone - To-Do List App

DailyDone is a simple and efficient To-Do List app designed to help you manage your daily tasks with ease. Organize your to-dos into categories like Today, Priority, and Upcoming, or sort them into lists such as Home, Work, Hobbies, Travel, and more. The app allows you to create, edit, delete, and mark tasks as completed effortlessly. Built with React, DailyDone is flexible and easily expandable, making it adaptable to future upgrades and improvements.

![Desktop Preview](./fe-app/public/desktop-preview.png)

## 📌 Pages

- **Home - Log In/Register**
- **To-dos**

## ⚙️ Built With

### Programming Languages

- **JavaScript:**
  High-level programming language for creating dynamic and interactive web environment.
- **HTML:**
  Markup language for defining and structuring web content.
- **CSS:**
  Stylesheet language for designing the website layout and appearance.

### Libraries

- **React:**
  JavaScript library for building user interfaces.
- **Axios:**
  Promise-based HTTP client for making API requests in the frontend.
- **CORS:**
  Node.js package that enables Cross-Origin Resource Sharing (CORS) for handling API requests from different origins.
- **dotenv:**
  Module for loading environment variables from a .env file, ensuring sensitive information (like API keys) is kept secure.
- **jsonwebtoken (JWT):**
  Library for generating and verifying JSON Web Tokens (JWT) used for authentication and secure communication.

### Backend & Database

- **Node.js:**
  JavaScript runtime environment that allows running JavaScript code outside the browser, essential for backend development.

- **Express:**
  Fast, minimalistic Node.js framework for building server-side applications and APIs.

- **MongoDB:**
  NoSQL database used for storing structured and unstructured data in a flexible, JSON-like format.

### Development Tools

- **Node.js:**
  JavaScript runtime environment required for managing dependencies and running development tools during development, but not essential for the frontend in production.

- **Nodemon:**
  Node.js tool that automatically restarts the backend server when file changes are detected, improving development workflow.

### Deployment

- **Render:**
  Cloud platform for hosting full-stack applications, including backend servers and databases.

## 🚀 Live Demo

https://dailydone-5m06.onrender.com/

## 👉 Getting Started

**1.** **Clone the repository** --> (git clone /repositoryURL/)

**2.** **Open terminal** --> (Open terminal in both fe-app and be-app directories)

**3.** **Install dependencies** --> (npm install in both fe-app and be-app terminal)

**4.** **Set up environment variables** --> (

&nbsp;&nbsp; **4.1** **Backend .env file content:**

- Create .env file in the backend directory (be-app).
- Define the port the server will listen on by adding: PORT=your_port_number.
- Set up MongoDB:
  - Create a MongoDB Atlas account (if you don’t have one).
  - Create a cluster in the default Project 0 directory.
  - **IMPORTANT:** Copy the password when you create the cluster, then replace "password" in the connection string with the correct value.
  - Get the connection string from your cluster and add it to the .env file as follows: MONGO_HOST=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=myApp.
  - For more details, follow the [MongoDB Atlas Connection Guide](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster).
  - Generate a secret key for authentication:
    - **Open the Node.js console by running** --> (node)
    - **Import the crypto module** --> (const crypto = require('crypto'))
    - **Generate a random secret key** --> (crypto.randomBytes(32).toString('hex'))
    - **Exit the Node.js console** --> (Ctrl + C twice)
    - **Add the generated key to your .env file** --> (SECRET_KEY=your_generated_key)

&nbsp;&nbsp; **4.2** **Frontend .env file content:**

- Create .env file in the frontend directory (fe-app).
- Define the backend API URL by adding the following variable: REACT_APP_BACKEND_API=http://localhost:YOUR_BACKEND_PORT.
  - Replace YOUR_BACKEND_PORT with the actual PORT value from your backend .env file.)

**5.** **Start both servers (frontend and backend)** --> (npm start in both fe-app and be-app terminal)

**6.** **Visit the live site** --> (http://localhost:3000)

## Author

👩🏻‍💻 Sashka Janevska

- **GitHub:** https://github.com/sashkajanevska

## Show Your Support

Give a ⭐ if you like this project!
