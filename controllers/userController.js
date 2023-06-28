const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const validator = require('validator');
const bcrypt = require('bcrypt');


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
//signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields are required.");
    }
    if (!validator.isEmail(email)) {
      throw Error("Invalid Email.");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Please choose a strong password.");
    }

    const user = await User.findOne({ email });
    if (user) {
      throw Error("Email already registered.");
    }

    const salt = await bcrypt.genSalt(9);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });
    const token = createToken(newUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password){throw Error("All fields are required.")}
    
    const user = await User.findOne({email});
    if (!user) {throw Error("Email not registered.");}

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
