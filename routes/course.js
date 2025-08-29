
const {Router} = require("express");
const courseRouter = Router();
const {CourseModel} = require("../db")

courseRouter.post("/purchases",function(req,res) {
    
    res.json({
        message:"Signin endpoint"
    })
    
})

courseRouter.get("/preview",function(req,res) {

    res.json({
        message:"Signin endpoint"
    })
    
})

module.exports = {
    courseRouter:courseRouter
}