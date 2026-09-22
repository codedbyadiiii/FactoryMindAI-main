let documentText = "";

function saveDocument(text) {
  documentText = text;
}

function getDocument() {
  return documentText;
}

module.exports = {
  saveDocument,
  getDocument,
};