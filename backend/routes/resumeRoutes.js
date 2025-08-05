const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const axios = require("axios");

const upload = multer({ storage: multer.memoryStorage() });
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
function extractJsonString(text) {
    // Remove any code fences
    const fenceRegex = /```(?:json)?([\s\S]*?)```/i;
    const match = text.match(fenceRegex);
    if (match) {
        return match[1].trim();
    }
    // If no fences, try to extract from first { to last }
    const firstCurly = text.indexOf("{");
    const lastCurly = text.lastIndexOf("}");
    if (firstCurly !== -1 && lastCurly !== -1 && lastCurly > firstCurly) {
        return text.substring(firstCurly, lastCurly + 1);
    }
    return text.trim();
}
async function parseWithChatGPT(rawText) {
    const prompt = `Given the following resume text, extract the main information in valid JSON only. Do NOT add any Markdown, comments, or backticks. The response must be pure JSON.
        Parse the following resume text and return a JSON with these fields:
        - fullName
        - contact { address, phone, email }
        - summary
        - skills (array)
        - workExperience (array: title, company, dates, details[])
        Return **only** a JSON object, no extra text.
        Resume:
        ${rawText}
            `.trim();

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful resume parser." },
                { role: "user", content: prompt }
            ],
            temperature: 0.1,
            max_tokens: 1500,
        },
        {
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    // Always extract clean JSON
    const text = response.data.choices[0].message.content.trim();
    const jsonString = extractJsonString(text);

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from LLM response:", jsonString);
        throw e;
    }}


router.post("/", upload.single("resume"), async (req, res) => {
    try {
        let rawText = "";
        if (!req.file) return res.status(400).json({ error: "No file uploaded." });
        if (req.file.mimetype === "application/pdf") {
            const pdfData = await pdfParse(req.file.buffer);
            rawText = pdfData.text;
        } else if (
            req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer: req.file.buffer });
            rawText = result.value;
        } else {
            return res.status(400).json({ error: "Unsupported file type." });
        }

        // Instead of homebrew parsing, let ChatGPT structure it:
        const resumeJson = await parseWithChatGPT(rawText);
        res.json({ resumeJson });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
