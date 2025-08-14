import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://profleet.vevisec.dk/api-v2/tracker/list";
const HASH = "75a99ae4f0da12228894ba85cc5ee490"; // Din hash

app.get("/trackers", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ hash: HASH })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `API fejl: ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfejl", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server kører på port ${PORT}`);
});
