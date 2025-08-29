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

async function main() {


await mongoose.connect("mongodb://127.0.0.1:27017/SellingApp")

app.listen(3000);

console.log("Listening on port 3000")

}
main()