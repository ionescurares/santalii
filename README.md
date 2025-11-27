# Santalii

An elegant single-page wedding experience handcrafted for **Andreea & Andrei**.  
Hero photography, cinematic typography, and soft neutrals set the tone while the RSVP flow captures guests directly to Airtable through a minimal Node backend.

## Highlights

- **Immersive hero** with three curated portraits, date monogram, and scroll indicator.
- **Story-driven sections**: love story, schedule, venue, dress code, registry, and photo previews.
- **Dual countdowns**: Squarespace timer plus a bespoke full-width “Număr nopțile, număr zilele” hero.
- **Refined RSVP experience**:
  - Romanian validation copy + custom success state.
  - Conditional questions (attendance toggle drives guest requirements).
  - Smooth scroll CTA and scroll animations throughout.
- **Squarespace-inspired design system**: CSS vars for typography, spacing, and HSL palette.
- **Responsive everywhere**: optimized image ratios, flex/fallbacks, and scroll effects on mobile.

## Stack

| Layer        | Tech                                                    |
|--------------|---------------------------------------------------------|
| Front-end    | HTML5, CSS3, vanilla JS (served from `public/`)         |
| Animation/UI | IntersectionObserver, custom countdown, Squarespace UI  |
| Backend      | Node.js + Express (`server.js`)                         |
| Data store   | Airtable REST API (RSVP submissions)                    |
| Tooling      | npm scripts, nodemon, dotenv                            |

## Local Setup

```bash
git clone https://github.com/ionescurares/santalii.git
cd santalii
npm install
cp .env.example .env   # add Airtable credentials
npm run dev
```

- App runs at `http://localhost:3000`.
- Static assets live in `public/`; API requests hit `/api/rsvp`.

## Deploying

1. Pick any Node-friendly host (Render, Railway, Fly.io, Vercel, etc.).
2. Set `PORT`, `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID`.
3. Deploy the entire repo (front-end + Express server).  
4. Optional: keep GitHub Pages for static preview, but production RSVP must run through the Node app.

## Personalizing

- Update copy, names, and dates directly in `public/index.html`.
- Swap hero/location images in `public/assets/`.
- Adjust colors/spacing via `public/styles.css` variables.
- Change countdown dates in `public/script.js`.
- Map the Airtable fields in `server.js` to fit your base.

## License

Free for personal wedding projects.  
If you launch your own celebration with it, send love! 💌
