const express = require("express");
const auth = require("../middleware/auth");
const { required, validId } = require("../middleware/validate");
const controller = require("../controllers/resourceController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const notesDirectory = path.join(__dirname, "..", "uploads", "notes");
fs.mkdirSync(notesDirectory, { recursive: true });
const pdfUpload = multer({
    storage: multer.diskStorage({
        destination: notesDirectory,
        filename: (req, file, callback) => callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`)
    }),
    fileFilter: (req, file, callback) => {
        const isPdf = file.mimetype === "application/pdf" && path.extname(file.originalname).toLowerCase() === ".pdf";
        callback(isPdf ? null : new Error("Only PDF files are allowed."), isPdf);
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

const makeRouter = (type, requiredFields, middleware = []) => {
    const router = express.Router();
    router.use(auth);
    router.get("/", controller.list(type));
    if (type === "attendance") router.get("/stats", controller.attendanceStats);
    if (type === "tasks") router.patch("/:id/complete", validId("id"), controller.complete);
    router.post("/", ...middleware, required(requiredFields), controller.create(type));
    router.get("/:id", validId("id"), controller.get(type));
    router.put("/:id", validId("id"), ...middleware, controller.update(type));
    router.patch("/:id", validId("id"), ...middleware, controller.update(type));
    router.delete("/:id", validId("id"), controller.remove(type));
    return router;
};

module.exports = {
    subjects: makeRouter("subjects", ["name"]),
    tasks: makeRouter("tasks", ["title"]),
    attendance: makeRouter("attendance", ["subjectId", "date", "status"]),
    notes: (() => {
        const router = makeRouter("notes", ["title"], [pdfUpload.single("file")]);
        router.get("/:id/file", validId("id"), controller.noteFile);
        return router;
    })()
};
