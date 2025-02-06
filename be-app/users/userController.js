const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("./userService");
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({
        error:
          "Registration failed! Please provide a valid username, email and password to continue.",
      });

    const user = await userService.findUserByEmail(email);

    if (user) {
      return res.status(409).json({
        error: "Registration failed! The email address is already in use.",
      });
    }

    const newUser = await userService.register({ username, email, password });

    if (!newUser) {
      return res.status(500).json({
        error: "An error occurred during registration. Please try again later.",
      });
    }

    const payload = { _id: newUser._id, email: newUser.email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7 days" });
    res.status(201).json({ token, username: newUser.username });
  } catch (error) {
    console.error("Error creating User!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        error:
          "Login failed! Please provide an email and password to continue.",
      });

    const user = await userService.login({ email, password });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Cannot login! Invalid email or password." });
    }

    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7 days" });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error("Error logging in User!", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
