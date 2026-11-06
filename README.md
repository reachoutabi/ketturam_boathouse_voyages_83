# Ketturam – Luxury Houseboat Booking Service HTML Template

> **ThemeForest & TemplateMonster Commercial Ready**  
> A serene, elegant, and authentic HTML5/CSS3/ES6 template for Kerala backwater houseboats, kettuvallam cruises, luxury lake resorts, and private boat charters.

---

## Highlights & Features

- **Atmospheric, High-End Design:** Specifically crafted around the calm mood of Kerala backwaters (Alleppey & Kumarakom)—misty mornings, still water, coir, teak, and monsoon skies.
- **Original Color System (Design Tokens):** 
  - `Deep Lagoon Ink` (`#0F2B2E`)
  - `Monsoon Mist` (`#DCE6E1`)
  - `Coir Linen` (`#F3ECDF`)
  - `Teak Ember` (`#9C5B3B`)
  - `Lotus Dusk` (`#C99A98`)
  - `Champagne Brass` (`#BFA574`)
  - `Riverstone Grey` (`#5E6B68`)
  - `Night Backwater` (`#0A1E21`)
- **Light & Dark Mode ("Night Lagoon"):** Seamlessly switches between an airy morning aesthetic and deep lagoon teal-black with warm copper accents. Persists in `localStorage`.
- **Full RTL Support:** Built with CSS Logical Properties (`margin-inline`, `padding-inline`, `inset-inline-start`) and direction switches for Arabic/Hebrew locales. Persists in `localStorage`.
- **Pure Frontend Architecture:** Zero frameworks (no React, Vue, PHP, or Node dependencies). 100% clean HTML5, CSS3, and ES6 JavaScript.
- **No Dead Buttons:** Every button performs a functional action—triggering dynamic modals, filtering categories, pre-filling booking forms, or notifying via toasts.
- **Dynamic Booking & Estimation Engine:** 
  - Real-time client-side validation
  - Live price calculation based on vessel, nights, and guest counts
  - Generates unique reference IDs (e.g. `KTR-2026-XXXXX`)
  - Saves bookings to `localStorage`
  - Instant WhatsApp Concierge generator preloaded with full reservation specs
- **Interactive Lightbox:** Accessible image viewer with keyboard navigation, touch gestures, captions, and an inline booking action.
- **Fully Responsive Across All Screen Sizes & Devices:**
  - **Desktop:** 1920px (FHD), 1440px (2K/QHD), 1280px, 1024px
  - **Tablet:** 912px (Surface Pro), 834px (iPad Pro 11"), 820px (iPad Air), 768px (iPad Mini)
  - **Mobile:** 480px, 430px (iPhone 16 Pro Max), 414px (iPhone 11/XR), 390px (iPhone 14/15/16), 375px (iPhone 13 mini/SE), 320px (compact devices)
  - Zero horizontal scrolling (`overflow-x: hidden`), fluid clamp typography, touch swipe carousel, sticky comparison table, and viewport-adaptive modals.

---

## Pages Included

1. **`index.html` (Home):**
   - Transparent-to-solid glassmorphism sticky header
   - Cinematic hero with gentle parallax zoom
   - Quick availability & enquiry search strip
   - Curated cruise highlights (Day cruise, overnight, honeymoon)
   - "The Ketturam Distinction" feature cards
   - Handcrafted fleet showcase
   - A day-on-the-water timeline (12 PM to 7 AM next day)
   - Backwater destinations (Alleppey, Kumarakom, Kuttanad)
   - Animated statistics counters
   - Guest reflections touch-friendly slider
   - Authentic onboard gastronomy section
   - Moments gallery preview
   - Frequently Asked Questions accordion
   - Call to action banner & rich footer

2. **`boats.html` (Boats & Packages):**
   - Category filter tabs: All, Honeymoon, Luxury, Family, Eco-Solar, Deluxe
   - Fleet cards with amenity icons, bedroom layouts, and ratings
   - Interactive **Boat Details Modal** with complete specifications, hull material, AC hours, and inclusions
   - Six curated cruise packages (Day, Overnight, 2-Night, Honeymoon, Family, Corporate)
   - Responsive package comparison table
   - Gastronomy breakdown for all four included onboard meals

3. **`gallery.html` (Atmosphere & Moments):**
   - Category filter tabs: All Moments, Houseboats & Decks, Luxe Interiors, Authentic Cuisine, Golden Sunsets, Canal Life
   - Masonry photo grid with hover captions
   - Fullscreen keyboard/touch accessible Lightbox with booking CTA
   - Atmospheric video reel showcase card

4. **`contact.html` (Contact & Reservations):**
   - Harbour master contact details, phone, direct WhatsApp, and jetty address
   - How-to-reach guide (Airport, Railway, Free Jetty Parking)
   - Comprehensive interactive booking form with URL parameter pre-filling
   - Live cost estimator
   - Booking confirmation modal with 1-click WhatsApp concierge dispatch
   - Embedded interactive harbor map

5. **`404.html` (Uncharted Waters):**
   - Serene themed error page with quick links back to safe harbor

---

## Folder Structure

```
nov_83_project/
├── index.html                  # Home Overview
├── boats.html                  # Houseboat Fleet & Packages Catalog
├── gallery.html                # High-Resolution Moments Gallery
├── contact.html                # Booking & Harbour Concierge
├── 404.html                    # 404 Error Page
├── README.md                   # Documentation & Setup Guide
└── assets/
    ├── css/
    │   ├── style.css           # Design tokens, reset, typography, header, footer
    │   ├── components.css      # Buttons, cards, modals, lightbox, toasts, accordions
    │   └── responsive.css      # Grid utilities, media queries, RTL mirrors
    └── js/
        ├── main.js             # Theme/RTL toggles, sticky header, drawers, counters
        ├── boats-data.js       # Fleet & packages data repository
        ├── gallery-data.js     # Gallery items & Lightbox controller
        └── booking.js          # Booking calculations, validation & WhatsApp dispatch
```

---

## How to Customize

### 1. Changing Colors & Theme Tokens
All colors are configured in `assets/css/style.css` under `:root` and `[data-theme="dark"]`. Modify variables such as `--color-teak-ember` or `--color-lagoon-ink` to re-theme the entire website globally.

### 2. Updating Houseboats & Prices
Edit `assets/js/boats-data.js`. Each vessel object contains:
- `id`: unique ID used in booking URLs (e.g. `kb-anamudi`)
- `name`: vessel display name
- `category`: category for filter tabs
- `startingPrice`: price used in calculations
- `gallery`: array of image URLs
- `amenities` and `inclusions`: arrays of features

### 3. Updating Concierge WhatsApp Phone
In `assets/js/booking.js`, change the constant:
```javascript
const CONCIERGE_WHATSAPP_NUMBER = '919847055220'; // Country code + mobile number
```

---

## Credits & Dependencies

- **Fonts:** Cormorant Garamond & Plus Jakarta Sans via Google Fonts
- **Icons:** Bootstrap Icons (`v1.11.3`)
- **Photography:** Unsplash (High-resolution Kerala travel & nature photography)
