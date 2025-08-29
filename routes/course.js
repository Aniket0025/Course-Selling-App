
const {Router} = require("express");
const courseRouter = Router();

courseRouter.post("/purchases",function(req,res) {
    
    res.json({
        message:"Signin endpoint"
    })
    
})

courseRouter.post("/preview",function(req,res) {

    res.json({
        message:"Signin endpoint"
    })
    
})

module.exports = {
    courseRouter:courseRouter
}