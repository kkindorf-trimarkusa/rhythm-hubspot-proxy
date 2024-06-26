// index.js

const express = require('express');
const axios = require('axios');
require('dotenv').config(); // For loading environment variables

const app = express();
const port = process.env.PORT || 8081; // Choose your desired port

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to proxy data to HubSpot API
app.post('/post-to-hubspot', async (req, res) => {
    try {
        // Example endpoint to HubSpot's API (replace with your specific API endpoint)
        const apiUrl = `https://api.hubapi.com/marketing/v3/transactional/single-email/send`;

        // Example HubSpot API key from environment variables
        const apiKey = process.env.HUBSPOT_API_KEY;

        // Make a POST request to HubSpot's API
        const response = await axios.post(apiUrl, req.body, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Return the response from HubSpot's API
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error posting to HubSpot:', error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`HubSpot proxy server listening at port ${port}`);
});
