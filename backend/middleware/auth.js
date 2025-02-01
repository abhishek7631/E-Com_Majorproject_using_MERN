const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authSignIn = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== true)
      return res.status(400).json({ message: "You are unauthorized person" });
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
