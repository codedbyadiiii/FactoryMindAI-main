const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return data.text;
  } catch (error) {
    console.error("PDF Error:", error);
    throw new Error("Unable to read PDF");
  }
}

module.exports = { extractText };