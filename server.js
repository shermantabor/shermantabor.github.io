import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure this route exists and is a POST request
app.post("/proxy", async (req, res) => {
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbxrPmX-KvjHVcCbmq-YO74-dWYF7dY7L_6RZ-WtQ0uJs1GM-tyAKQ0DAuZExjoPhLZa/exec"; // Replace with your actual Google Apps Script URL

    try {
        console.log("🔹 Incoming request body:", req.body);

        const response = await fetch(googleScriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        console.log("🔹 Response status from Google Apps Script:", response.status);

        if (!response.ok) {
            throw new Error(`Google Apps Script error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Google Apps Script Response:", data);
        res.json(data);
    } catch (error) {
        console.error("❌ Proxy Error:", error.message);
        res.status(500).json({ error: "Proxy failed", details: error.message });
    }
});

// ✅ Add a test GET route to check if server works
app.get("/", (req, res) => {
    res.send("Server is running! ✅");
});

// ✅ Use a dynamic port required by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app.get("/proxy", (req, res) => {
    res.send("✅ The /proxy route exists but only accepts POST requests.");
});
