const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");

const app= express();

app.use(express.json());

app.use("/app/v1/user",userRouter);
app.use("/app/v2/admin",adminRouter);
app.use("/app/v2/course",courseRouter);



// createUserRoute(app);
// createCourseRoute(app);




app.listen(3000);