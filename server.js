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
    const { name, email, guests, attendance, dietary, message } = req.body || {};

    if (!name || !email || !guests || !attendance) {
        return res.status(400).json({ error: 'Missing required fields' });
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
                    Email: email,
                    Guests: guests,
                    Attendance: attendance,
                    Dietary: dietary || '',
                    Message: message || ''
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

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Airtable error:', errorBody);
            return res.status(502).json({ error: 'Failed to submit RSVP. Please try again later.' });
        }

        const data = await response.json();
        return res.status(201).json({ success: true, records: data.records });
    } catch (error) {
        console.error('RSVP submission failed:', error);
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

app.use((req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

