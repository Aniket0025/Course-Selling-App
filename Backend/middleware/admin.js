const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "Token not provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        req.userId = decoded.id; // use lowercase 'id'
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    adminMiddleware
};
