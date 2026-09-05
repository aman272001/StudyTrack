const mongoose = require("mongoose");

const id = (value) => mongoose.Types.ObjectId.isValid(value);
const required = (fields) => (req, res, next) => {
    const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === "");
    if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
    next();
};
const validId = (param) => (req, res, next) => {
    if (!id(req.params[param])) return res.status(400).json({ message: "Invalid id" });
    next();
};
module.exports = { required, validId, id };
