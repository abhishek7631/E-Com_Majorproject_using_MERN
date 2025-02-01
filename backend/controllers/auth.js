const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is Required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is Required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is Required" });
  }

  if (!phone) {
    return res.status(400).json({ message: "Phone is Required" });
  }

  if (!address) {
    return res.status(400).json({ message: "Address is Required" });
  }

  //exisiting user

  const exisitingUser = await User.findOne({ email });

  if (exisitingUser) {
    return res
      .status(200)
      .json({ message: "Already user register please login" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      role,
    });
    res.status(200).json({ message: "User Registration Successfull" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "User Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
