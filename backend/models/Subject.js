const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    code: { type: String, trim: true, maxlength: 30 },
    teacher: { type: String, trim: true, maxlength: 100 },
    color: { type: String, trim: true, maxlength: 20 },
    credits: { type: Number, min: 0, max: 20 }
}, { timestamps: true });

subjectSchema.index({ userId: 1, name: 1 }, { unique: true });
module.exports = mongoose.model("Subject", subjectSchema);
