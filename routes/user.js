
// const express = require("express");
// const Router = express.Router;

const { Router } = require("express");
const { UserModel } = require("../db")
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aniketaudumbaryadav"

const bcrypt = require("bcrypt");
const { model } = require("mongoose");


const userRouter = Router();


userRouter.post("/signup", async function (req, res) {
    // const email = req.body.email;
    // const password = req.body.password;
    // const firstName= req.body.firstName;
    // const lastName= req.body.lastName;

    const { email, password, firstName, lastName } = req.body;
    try {

        const hashpassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            email: email,
            password: hashpassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "Signup succeded"
        })
    }
    catch (e) {
        res.json({
            message: "Signup failed"
        })
    }


})

userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email: email
        });

        //for email
        if (!user) {
            return res.status(403).json({
                message: "User not found"
            });
        }

        //for bcrypt password compare

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                message: "password was wrong"
            });
        }

        const token = jwt.sign({
            id: user.id
        }, JWT_USER_PASSWORD);

        res.json({
            message: "Login Successfull",
            token: token
        })

    }
    catch (e) {
        res.json({
            message: "Signin failed"
        })
    }
})

userRouter.get("/purchases", function (req, res) {

    res.json({
        message: "purchases endpoint"
    })

})



module.exports = {
    userRouter: userRouter
}