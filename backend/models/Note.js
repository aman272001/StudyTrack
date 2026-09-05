const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, default: "", trim: true, maxlength: 20000 },
    tags: [{ type: String, trim: true, maxlength: 30 }],
    fileName: { type: String, trim: true },
    filePath: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
