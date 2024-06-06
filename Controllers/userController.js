const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyPassword = require("../herlpers/passwordChecker.js");
const generateToken = require("../services/token.js");

const SignUp = async (req, res) => {
  console.log("______authSignup________");
  const { name, email, password } = req.body;
  console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    console.log("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    console.log("Invalid user data");
  }
};

//Login

const Login = async (req, res) => {
  console.log("___authLogin_________");

  const { email, password } = req.body;

  if(!email || !password){
 return res.status(400).json({message:"Auth required Email and Password"})
  }

  

  const user = await User.findOne({ email });
  const userpasswordCheck = await verifyPassword(password, user.password);
  if (user && userpasswordCheck) {
    generateToken(res, user._id);

 res.status(200).json({
      message: "Successfully Logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
    
      },
    });
  } else {
    res.status(401);
    console.log("Invalid email or password");
  }
};

//Logout
const Logout = (req, res) => {
  console.log("________authLogout________");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { SignUp, Login, Logout };
