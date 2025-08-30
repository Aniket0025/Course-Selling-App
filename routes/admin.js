const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");



//adminRouter.use(adminMiddleware);


adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {

        const hashpassword = await bcrypt.hash(password, 5);

        await AdminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({
            email: email
        });

        //for email
        if (!admin) {
            return res.status(403).json({
                message: "User not found"
            });
        }

        //for bcrypt password compare

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(403).json({
                message: "password was wrong"
            });
        }

        const token = jwt.sign({
            id: admin.id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course", adminMiddleware, async function (req, res) {

    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    const course = await CourseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "Signin endpoint"
    })
})

adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "Signin endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}