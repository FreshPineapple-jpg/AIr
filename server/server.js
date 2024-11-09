const express = require("express");
const bodyParser = require("body-parser");
const db = require("./firebase");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Route to process asthma safety check
app.post("/check-safety", async (req, res) => {
    const { longitude, latitude, temperature, AQI, PM10, NO2, CO } = req.body;

    // Validate incoming data
    if (!longitude || !latitude || !temperature || !AQI || !PM10 || !NO2 || !CO) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Send data to the ML model
        const isSafe = await checkAsthmaSafety({ longitude, latitude, temperature, AQI, PM10, NO2, CO });
        
        // Return the result
        res.json({ isSafe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to determine safety" });
    }
});


app.post("/log-event", async (req, res) => {
    const { longitude, latitude, temperature, AQI, PM10, NO2, CO, symptoms, timestamp } = req.body;

    // Check if all required fields are provided
    if (!longitude || !latitude || !temperature || !AQI || !PM10 || !NO2 || !CO || !symptoms || !timestamp) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Log the asthma event to Firestore
        const eventRef = db.collection("asthma_events").doc(); // Create a new document
        await eventRef.set({
            longitude,
            latitude,
            temperature,
            AQI,
            PM10,
            NO2,
            CO,
            symptoms,
            timestamp,
        });

        res.json({ message: "Event logged successfully" });
    } catch (error) {
        console.error("Error logging event:", error);
        res.status(500).json({ error: "Failed to log event" });
    }
});

app.get("/get-events", async (req, res) => {
    try {
        // Fetch all events from Firestore
        const snapshot = await db.collection("asthma_events").get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "No events found" });
        }

        // Extract the data from the snapshot
        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Return the events
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
