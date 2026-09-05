const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "Authentication required" });
        if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Server authentication is not configured" });
        const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Invalid authentication" });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
