const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password_hash: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

    const { password_hash, ...userData } = user.toObject();
    
    res.status(200).json({
      success: true,
      message: "Login successful", 
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
  }
};

module.exports = { registerUser, loginUser };
