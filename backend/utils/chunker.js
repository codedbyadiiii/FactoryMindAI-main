function splitIntoChunks(text, chunkSize = 800) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}

function getRelevantChunks(text, question, maxChunks = 4) {
  const chunks = splitIntoChunks(text);

  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const scoredChunks = chunks.map((chunk) => {
    let score = 0;

    const lowerChunk = chunk.toLowerCase();

    keywords.forEach((word) => {
      if (lowerChunk.includes(word)) {
        score++;
      }
    });

    return {
      chunk,
      score,
    };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks
    .slice(0, maxChunks)
    .map((item) => item.chunk)
    .join("\n\n-----------------------\n\n");
}

module.exports = {
  splitIntoChunks,
  getRelevantChunks,
};