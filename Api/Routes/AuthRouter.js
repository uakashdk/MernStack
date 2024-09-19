const express = require("express");
const { registerValidation, loginValidation } = require("../Middleware/AuthValidation");
const { register, login } = require("../Controller/AuthController");
const router = express.Router();


router.post('/signup',registerValidation,register);
router.post('/login',loginValidation,login);

module.exports = router; 
