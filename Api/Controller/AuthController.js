const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET || "secret-5280";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      success: true,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Auth failed: email or password is incorrect";

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Compare passwords
    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: existingUser.email,
      name: existingUser.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



module.exports={
  register,
  login
}