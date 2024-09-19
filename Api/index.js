const express=require("express");
const database=require("./db/Config"); 
require("dotenv").config();
const bodyParser= require("body-parser");
const cors=require("cors");
const AuthRouter=require("./Routes/AuthRouter");
const multer = require('multer');
const path = require('path');

const PORT= process.env.PORT ||8080;

const app=express();

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const registeredEmails = ['test@example.com', 'user1@gmail.com'];


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
        return cb(null, true);
      } else {
        return cb(new Error('Only .jpg and .png formats allowed!'));
      }
    };
 
    const upload = multer({ storage, fileFilter });
    app.post('/submit', upload.single('image'), (req, res) => {
        const { name, email, mobileNo, designation, gender, courses } = req.body;
        if (!name || !email || !mobileNo || !designation || !gender || !req.file) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobileNo)) {
    return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits' });
  }
  if (registeredEmails.includes(email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  registeredEmails.push(email);
  return res.status(200).json({ success: true, message: 'Form submitted successfully' });
});

app.use("/auth", AuthRouter)

app.listen(PORT,()=>{
    console.log(`PORT is running on ${PORT}`);
})