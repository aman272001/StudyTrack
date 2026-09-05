const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
    note: { type: String, trim: true, maxlength: 500 }
}, { timestamps: true });

attendanceSchema.index({ userId: 1, subjectId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("Attendance", attendanceSchema);
