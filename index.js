require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require('mongoose');
//connecting with mongoose
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology:true})

const db = mongoose.connection
db.on('error',(err) => console.error(err))
db.once('open',()=> console.log("database connected."))


// server listen at port 3000
app.listen(3000, () => console.log("server connected!"))