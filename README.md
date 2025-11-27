# Santalii - Wedding Website

A beautiful, elegant wedding website for Andreea & Andrei's special day.

## Features

- **Elegant Design**: Modern, minimalist design with black and white aesthetic
- **Hero Section**: Three-image layout with date overlay
- **Event Schedule**: Timeline of wedding day events
- **Location Information**: Venue details and travel information
- **Countdown Timer**: Live countdown to the wedding date (June 26, 2026)
- **Registry Section**: Gift registry information
- **Dress Code**: Formal attire guidelines
- **RSVP Form**: Interactive RSVP form with validation
- **Fully Responsive**: Works perfectly on all devices

## Technologies Used

- HTML5 / CSS3 / Vanilla JavaScript for the front-end (`public/`)
- Node.js + Express for the backend
- Airtable API (via REST) for RSVP data storage
- Google Fonts (Playfair Display & Lato)

## Local Development

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Airtable credentials:
   ```bash
   PORT=3000
   AIRTABLE_API_KEY=your_api_key
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   AIRTABLE_TABLE_ID=tblXXXXXXXXXXXXXX
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
   The site is served from `http://localhost:3000` and proxies form submissions to `/api/rsvp`.

## Production Deployment

Deploy the entire Node app to any host that supports custom servers (Render, Railway, Fly.io, Vercel, etc.).  
Set the same environment variables from the `.env.example` on your host so the RSVP endpoint can write to Airtable.

## Customization

To customize this website for your own wedding:

1. Update couple names in `index.html`
2. Change the wedding date in `index.html` and `script.js`
3. Update venue information in the location section
4. Modify colors in `styles.css` CSS variables
5. Replace images with your own wedding photos

## License

Free to use for personal wedding websites.

