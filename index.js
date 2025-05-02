const express = require("express");
const cors = require("cors");
const { extractOCR } = require("./api/ocr");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("OCR API is running at /api/ocr");
});

// OCR endpoint
app.post("/api/ocr", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid base64 image" });
    }

    const data = await extractOCR(imageBase64);

    res.json({
      success: true,
      data,
      message: "Successfully extracted JSON from image",
    });
  } catch (error) {
    console.error("OCR ERROR:", error); // log full error
    res.status(500).json({
      success: false,
      message: "Data extraction failed",
      error: error.message || "Internal error",
    });
  }
});

app.listen(3000, () => {
  console.log(`Data extract API running on http://localhost:${3000}`);
});

module.exports = app;
