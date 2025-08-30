const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db")
const { CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");



//adminRouter.use(adminMiddleware);


adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashpassword = await bcrypt.hash(password, 5);

        await AdminModel.create({
            email,
            password: hashpassword,
            firstName,
            lastName
        });

        res.json({ message: "Signup succeeded" });
    } catch (e) {
        res.status(500).json({
            message: "Signup failed",
            error: e.message
        });
    }
});

adminRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);

        res.json({
            message: "Login Successful",
            token
        });

    } catch (e) {
        res.status(500).json({
            message: "Signin failed",
            error: e.message
        });
    }
});


adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await CourseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            message: "Course Created",
            courseId: course._id
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create course",
            error: err.message
        });
    }
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { courseId, title, description, imageUrl, price } = req.body; // get courseId from body

    if (!courseId) {
        return res.status(400).json({ message: "courseId is required" });
    }

    try {
        const result = await CourseModel.updateOne(
            { _id: courseId, creatorId: adminId }, // ensure admin owns the course
            { title, description, imageUrl, price }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found or you are not the creator" });
        }

        res.json({
            message: "Course updated",
            courseId: courseId
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update course",
            error: err.message
        });
    }
});


adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    try {
        const courses = await CourseModel.find({
            creatorId: adminId // fetch all courses created by this admin
        });

        res.json({
            message: "Courses fetched successfully",
            courses
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch courses",
            error: err.message
        });
    }
});


module.exports = {
    adminRouter: adminRouter
}