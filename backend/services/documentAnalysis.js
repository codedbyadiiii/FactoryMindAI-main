const { askGemini } = require("./geminiService");

async function analyzeDocument(document) {

    const prompt = `
You are FactoryMind AI.

Analyze the uploaded industrial document.

Return your answer in Markdown using exactly this format.

# Document Summary

## Main Topic
...

## Industry
...

## Key Technologies
- ...

## Key Points
- ...

## Suggested Questions
- ...
- ...
- ...
- ...

Keep it concise.

DOCUMENT:

${document}
`;

    return await askGemini(prompt);

}

module.exports = {
    analyzeDocument,
};