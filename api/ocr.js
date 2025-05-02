const { createWorker } = require("tesseract.js");

async function extractOCR(imageBase64) {
  const base64Data = imageBase64.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  const worker = await createWorker("eng", 1, {
    logger: (m) => console.log(m),
  });

  const {
    data: { text },
  } = await worker.recognize(buffer);
  await worker.terminate();

  const cleaned = text.trim();
  const normalized = cleaned
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/,\s*}/g, "}")
    .replace(/\\n/g, "\n")
    .trim();

  try {
    return JSON.parse(normalized);
  } catch {
    const fallback = {};
    for (const line of normalized.split("\n")) {
      const match = line.match(/"?(\w+)"?\s*:\s*"?([^"]+)"?/);
      if (match) fallback[match[1].toLowerCase()] = match[2].trim();
    }
    return fallback;
  }
}

module.exports = { extractOCR };
