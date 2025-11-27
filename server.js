const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

const publicDir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.post('/api/rsvp', async (req, res) => {
    const { name, phone, guests, attendance } = req.body || {};

    if (!name || !attendance) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (attendance === 'yes' && !guests) {
        return res.status(400).json({ error: 'Please let us know how many guests are coming.' });
    }

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
        console.warn('⚠️ Airtable environment variables are missing');
        return res.status(500).json({ error: 'Server is not configured for Airtable yet' });
    }

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
    const payload = {
        records: [
            {
                fields: {
                    Name: name,
                    Phone: phone || 'Nespecificat',
                    Guests: attendance === 'yes' ? guests : 'Nu participă',
                    Attendance: attendance
                }
            }
        ]
    };

    try {
        const response = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseBodyText = await response.text();
        let responseBody;
        try {
            responseBody = responseBodyText ? JSON.parse(responseBodyText) : null;
        } catch {
            responseBody = responseBodyText;
        }

        if (!response.ok) {
            console.error('Airtable error response:', responseBody);
            const errorMessage =
                responseBody?.error?.message ||
                'Failed to submit RSVP. Please try again later.';
            return res.status(response.status).json({ error: errorMessage });
        }

        return res.status(201).json({ success: true, records: responseBody?.records || [] });
    } catch (error) {
        console.error('RSVP submission failed:', error);
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

app.get('/api/rsvp/test', async (req, res) => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
        return res.status(500).json({ error: 'Server is not configured for Airtable yet' });
    }

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?maxRecords=5`;

    try {
        const response = await fetch(airtableUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`
            }
        });

        const responseBodyText = await response.text();
        let responseBody;
        try {
            responseBody = responseBodyText ? JSON.parse(responseBodyText) : null;
        } catch {
            responseBody = responseBodyText;
        }

        if (!response.ok) {
            console.error('Airtable read error:', responseBody);
            const errorMessage =
                responseBody?.error?.message || 'Failed to read data from Airtable.';
            return res.status(response.status).json({ error: errorMessage });
        }

        return res.status(200).json({ success: true, records: responseBody?.records || [] });
    } catch (error) {
        console.error('Airtable read test failed:', error);
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

app.use((req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

