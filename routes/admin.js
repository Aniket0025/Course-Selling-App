const {Router} = require("express");
const adminRouter = Router();
const {AdminModel} = require("../db")


//adminRouter.use(adminMiddleware);

adminRouter.post("/signup",function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    res.json({
        message:"Signup endpoint"
    })
})

adminRouter.post("/signin",function(req,res) { 
    const email = req.body.email;
    const password = req.body.password;
    
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.post("/",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.put("/",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

adminRouter.get("/bulk",function(req,res) {    
    res.json({
        message:"Signin endpoint"
    })    
})

module.exports = {
    adminRouter:adminRouter
}