
// const express = require("express");
// const Router = express.Router;

const {Router} = require("express"); 

const userRouter = Router();
const {UserModel} = require("../db")

userRouter.post("/signup",function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;

    res.json({
        message:"Signup endpoint"
    })

})

userRouter.post("/signin",function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    
    res.json({
        message:"Signin endpoint"
    })
    
})

userRouter.get("/purchases",function(req,res) {
    
    res.json({
        message:"purchases endpoint"
    })
    
})



module.exports = {
    userRouter:userRouter
}