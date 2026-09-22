const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/uploadRoutes");

const { askGemini } = require("./services/geminiService");
const { analyzeDocument } = require("./services/documentAnalysis");

const { getDocument } = require("./utils/documentStore");
const { getRelevantChunks } = require("./utils/chunker");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FactoryMind AI Backend Running 🚀",
  });
});

/*
==========================
DOCUMENT ANALYSIS
==========================
*/

app.post("/api/analyze", async (req, res) => {
  try {
    const document = getDocument();

    if (!document) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF first.",
      });
    }

    const analysis = await analyzeDocument(document);

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

/*
==========================
CHAT
==========================
*/

app.post("/api/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const document = getDocument();

    if (!document) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF first.",
      });
    }

    const context = getRelevantChunks(document, message);

    const prompt = `
You are FactoryMind AI.

Answer ONLY using the context below.

Rules:

1. Never invent information.

2. Answer in Markdown.

3. Keep answers concise.

4. If information is missing, reply:

"I couldn't find this information in the uploaded document."

------------------------

CONTEXT

${context}

------------------------

QUESTION

${message}
`;

    const reply = await askGemini(prompt);

    res.json({
      success: true,
      reply,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});