const jwt = require("jsonwebtoken");
const userService = require("./userService");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    res.status(401).json({ error: "Authentication failed. Please try again." });
    return;
  }

  const user = await userService.findUserByID(decodedToken._id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      error: "Unauthorized: The user could not be found or is not recognized.",
    });
  }
};

module.exports = {
  authenticateUser,
};
