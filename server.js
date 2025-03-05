import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Required for Node.js 18+ compatibility

const app = express();
app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbxrPmX-KvjHVcCbmq-YO74-dWYF7dY7L_6RZ-WtQ0uJs1GM-tyAKQ0DAuZExjoPhLZa/exec"; // Replace with actual URL

    try {
        console.log("🔹 Incoming request body:", req.body);

        const response = await fetch(googleScriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        console.log("🔹 Response status from Google Apps Script:", response.status);
        const textResponse = await response.text(); // Get response as plain text
        console.log("🔹 Raw Response Body:", textResponse); // Log the full response

        try {
            // Try to parse JSON response
            const data = JSON.parse(textResponse);
            console.log("✅ Google Apps Script JSON Response:", data);
            res.json(data);
        } catch (jsonError) {
            // If JSON parsing fails, return the raw response instead
            console.error("❌ JSON Parsing Error:", jsonError.message);
            res.status(500).json({ error: "Invalid JSON response", rawResponse: textResponse });
        }

    } catch (error) {
        console.error("❌ Proxy Error:", error.message);
        res.status(500).json({ error: "Proxy failed", details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Proxy server running at http://localhost:${PORT}`));
