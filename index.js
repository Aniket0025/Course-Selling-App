const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")

const app= express();

app.use(express.json());

app,use("/user",userRouter)
app,use("/course",courseRouter)

createUserRoute(app);
createCourseRoute(app);




app.listen(3000);