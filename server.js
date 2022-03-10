const express = require("express");
const Mongoose = require("mongoose");
const app = express();
const UserRouter = require("./api/router/router");
app.use(express.json());
app.use("/user", UserRouter);
app.get("/", (req, res, next) =>{
    console.log("hello server");
    res.status(200).json({name: "jamal", message: "hello server"});
});


Mongoose.connect("mongodb://127.0.0.1:27017/myhomedb")
    .then(res => {
        console.log("db connected");
        app.listen(3000,"127.0.0.1");
    
    })
    .catch(err => {
        console.log("db error", err);
    });
