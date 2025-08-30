
const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db")
const { PurchasesModel } = require("../db")
const { userMiddleware } = require("../middleware/user");


courseRouter.post("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await PurchasesModel.create({
        userId: userId,
        courseId: courseId

    })

    res.json({
        message: "You have successfully bougth the course"
    })

})

courseRouter.get("/preview", async function (req, res) {

    const course = await CourseModel.find({});

    res.json({
        course: course
    })

})

module.exports = {
    courseRouter: courseRouter
}