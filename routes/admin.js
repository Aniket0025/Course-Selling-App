const {Router} = require("express");
const adminRouter = Router();
const {AdminModel} = require("../db")


//adminRouter.use(adminMiddleware);

adminRouter.post("/signup",function(req,res) {
    res.json({
        message:"Signup endpoint"
    })
})

adminRouter.post("/signin",function(req,res) {  
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.post("/course",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.put("/course",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.get("/course/bulk",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

module.exports = {
    adminRouter:adminRouter
}