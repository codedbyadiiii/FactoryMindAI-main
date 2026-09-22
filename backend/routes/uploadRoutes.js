const { extractText } = require("../services/pdfService");
const { saveDocument } = require("../utils/documentStore");
const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const text = await extractText(req.file.path);
    saveDocument(text);

   res.json({
  success: true,
  message: "Document uploaded successfully.",
  filename: req.file.filename,
  originalName: req.file.originalname,
  characters: text.length,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;