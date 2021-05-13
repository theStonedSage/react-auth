const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');


mongoose.connect("mongodb+srv://amit:amit@cluster0.tafxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
    console.log('db conected');
});
mongoose.set("useCreateIndex",true);


const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    optionsSuccessStatus:200
}))
app.use(bodyParser.json());
app.use(passport.initialize());

const rootRouter = require("./routes/root");
const { Router } = require('express');

app.use("/",rootRouter);

app.listen(4000,(err)=>{
    console.log('server started');
})