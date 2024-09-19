const mongoose = require("mongoose");
require("dotenv").config();

const uri = "mongodb+srv://akashshaurya1998:Akash%40528@cluster0.fudql.mongodb.net/MernStack?retryWrites=true&w=majority&appName=Cluster0/MernStack";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
