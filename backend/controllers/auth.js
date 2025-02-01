const User = require("../models/user");

exports.register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });
    res.status(200).json({ message: "User Registraion Successfull" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
