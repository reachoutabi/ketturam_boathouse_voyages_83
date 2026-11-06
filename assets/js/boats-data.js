/**
 * KETTURAM BACKWATER CRUISES - DATA REPOSITORY
 * Houseboat Fleet & Cruise Packages Dataset
 */

const HOUSEBOATS_DATA = [
  {
    id: "kb-anamudi",
    name: "The Anamudi Grand Suite",
    category: "honeymoon",
    bedrooms: 1,
    capacity: "2 Guests",
    acType: "24/7 Full Climate Control",
    hullMaterial: "Handcrafted Anjili & Teak Wood with Coir Thatch",
    length: "82 ft Kettuvallam",
    crewCount: "3 (Private Chef, Captain & Deckhand)",
    badge: "Honeymoon Special",
    badgeClass: "badge-lotus",
    rating: 4.98,
    reviewsCount: 84,
    startingPrice: 19500,
    dayCruisePrice: 13500,
    primaryImage: "assets/images/boats/anamudi_grand_suite_4k.jpg",
    gallery: [
      "assets/images/boats/anamudi_grand_suite_4k.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "Ultra-private sanctuary designed for couples, featuring glass-paneled water views and sunset jacuzzi.",
    description: "The Anamudi is our flagship single-bedroom luxury kettuvallam. Handcrafted by master boat-builders using indigenous wild jackfruit wood (Anjili) tied entirely with coir ropes without a single iron nail. Features an open front viewing deck with rattan sunloungers, a climate-controlled glass bedroom with 180° backwater panoramas, and a personal chef serving candlelit backwater delicacies under the stars.",
    amenities: [
      { icon: "bi-water", label: "Private Jacuzzi" },
      { icon: "bi-cup-hot", label: "Dedicated Master Chef" },
      { icon: "bi-snow", label: "24/7 Glass AC Suite" },
      { icon: "bi-wifi", label: "High-Speed Starlink WiFi" },
      { icon: "bi-music-note-beamed", label: "Bose Sound System" },
      { icon: "bi-shield-check", label: "Life Jackets & Fire Safety" }
    ],
    inclusions: [
      "Fresh tender coconut welcome drink & cold towels",
      "Traditional Kerala lunch with Pearl Spot (Karimeen Pollichathu)",
      "Sunset tea & freshly made hot banana fritters (Pazham Pori)",
      "Candlelit 4-course dinner served on the open bow deck",
      "Traditional South Indian or Continental breakfast",
      "Exclusive private cruise through narrow village canals"
    ]
  },
  {
    id: "kb-vembanad",
    name: "Vembanad Royal Cruiser",
    category: "luxury",
    bedrooms: 2,
    capacity: "4 to 6 Guests",
    acType: "24/7 Full Climate Control",
    hullMaterial: "Teak & Bamboo Ribs with Brass Trims",
    length: "98 ft Double-Decker",
    crewCount: "4 (Captain, Chef, Engine Driver & Steward)",
    badge: "Most Popular",
    badgeClass: "badge-teak",
    rating: 4.95,
    reviewsCount: 112,
    startingPrice: 28000,
    dayCruisePrice: 18500,
    primaryImage: "assets/images/boats/vembanad_royal_cruiser_4k.jpg",
    gallery: [
      "assets/images/boats/vembanad_royal_cruiser_4k.jpg",
      "assets/images/gallery/teak_dining_salon_4k.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "Panoramic double-decker cruise vessel with upper lounge deck, two master suites, and bespoke dining.",
    description: "The Vembanad Royal Cruiser brings royal Kerala hospitality to the open lake. Boasting two opulent bedrooms with private marble-tiled ensuite bathrooms, an expansive upper sundeck with 360-degree views, and a dedicated dining lounge. Perfect for two couples or discerning families seeking the finest backwater experience.",
    amenities: [
      { icon: "bi-building-up", label: "Upper Sun Lounge Deck" },
      { icon: "bi-cup-hot", label: "Gourmet Live Kitchen" },
      { icon: "bi-snow", label: "Independent Room AC" },
      { icon: "bi-tv", label: "Satellite Smart TV" },
      { icon: "bi-wifi", label: "Complimentary WiFi" },
      { icon: "bi-tsunami", label: "Fishing Tackle & Bait" }
    ],
    inclusions: [
      "Welcome platter of seasonal tropical fruits and fresh coconut",
      "Grand Kerala Sadya feast with tiger prawns or vegetarian delicacies",
      "Afternoon tea with traditional savory snacks",
      "Five-course deck dinner with fresh catch of the day",
      "Early morning bird-watching cruise across Kumarakom sanctuary border",
      "Breakfast with hot Appams, stew, and freshly brewed Malabar coffee"
    ]
  },
  {
    id: "kb-malabar",
    name: "Malabar Heritage",
    category: "family",
    bedrooms: 3,
    capacity: "6 to 9 Guests",
    acType: "24/7 Full Climate Control",
    hullMaterial: "Traditional Seasoned Jackfruit Wood & Natural Coir",
    length: "115 ft Heritage Cruiser",
    crewCount: "4 Crew Members",
    badge: "Family Favorite",
    badgeClass: "badge-brass",
    rating: 4.92,
    reviewsCount: 76,
    startingPrice: 38500,
    dayCruisePrice: 24000,
    primaryImage: "assets/images/boats/malabar_heritage_4k.jpg",
    gallery: [
      "assets/images/boats/malabar_heritage_4k.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "Generously proportioned three-suite family cruiser with family games, wide dining hall, and safe kid decks.",
    description: "Designed specifically for multi-generational families and travel groups. The Malabar Heritage features three expansive air-conditioned bedrooms with attached private bathrooms, a wide open-air dining hall, child-safe railings, board games, and an interactive galley kitchen where children and guests can watch our chef prepare authentic Kerala breads and curries.",
    amenities: [
      { icon: "bi-people", label: "Seats up to 12 Dining" },
      { icon: "bi-controller", label: "Family Board Games & Library" },
      { icon: "bi-snow", label: "24-hr Air Conditioning" },
      { icon: "bi-wifi", label: "Lake-Wide WiFi" },
      { icon: "bi-shield-check", label: "Child-Safe Deck Guardrails" },
      { icon: "bi-cup-hot", label: "Customizable Family Menus" }
    ],
    inclusions: [
      "Welcome fruit punch and traditional wet towels",
      "Custom lunch banquet catering to both adult and child tastes",
      "Traditional country canoe ride through narrow village canals",
      "Sunset high tea with steamed Kerala banana snacks",
      "Family barbecue dinner on the deck at twilight anchorage",
      "Full Kerala country breakfast with fresh fruits"
    ]
  },
  {
    id: "kb-kuttanad",
    name: "Kuttanad Premium Cruiser",
    category: "premium",
    bedrooms: 2,
    capacity: "4 Guests",
    acType: "24/7 Full Climate Control",
    hullMaterial: "Teak Planks & Eco-Varnish with Bamboo Interior",
    length: "90 ft Classic Kettuvallam",
    crewCount: "3 Crew Members",
    badge: "Eco Luxury",
    badgeClass: "badge-mist",
    rating: 4.89,
    reviewsCount: 58,
    startingPrice: 23500,
    dayCruisePrice: 15500,
    primaryImage: "assets/images/boats/kuttanad_premium_cruiser_4k.jpg",
    gallery: [
      "assets/images/boats/kuttanad_premium_cruiser_4k.jpg",
      "assets/images/gallery/teak_dining_salon_4k.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "Eco-conscious kettuvallam with hybrid solar silent propulsion, organic dining, and open sundeck.",
    description: "Built for true nature lovers who appreciate silence on the water. The Kuttanad incorporates solar-assisted power to ensure quiet cruising through bird-nesting sanctuaries. Featuring two tasteful bamboo-paneled suites, open-air salon, and an emphasis on organic local ingredients sourced directly from backwater farmers.",
    amenities: [
      { icon: "bi-sun", label: "Solar Silent Cruising" },
      { icon: "bi-egg-fried", label: "100% Organic Farm Dining" },
      { icon: "bi-snow", label: "Full AC in Bedrooms" },
      { icon: "bi-compass", label: "Guided Bird Watching Guide" },
      { icon: "bi-binoculars", label: "Nikon Binoculars Provided" },
      { icon: "bi-recycle", label: "Zero-Single-Use-Plastic" }
    ],
    inclusions: [
      "Organic tender coconut water from local groves",
      "Clay-pot cooked traditional rice and freshwater fish or vegan curries",
      "Evening herbal tea and roasted plantain snacks",
      "Starlight riverside dinner with organic spices",
      "Morning guided birding expedition in Vembanad Wetlands",
      "Farm-fresh breakfast with organic honey and fresh preserves"
    ]
  },
  {
    id: "kb-ashtamudi",
    name: "The Ashtamudi Deluxe",
    category: "deluxe",
    bedrooms: 1,
    capacity: "2 Guests",
    acType: "Night AC (9:00 PM – 6:00 AM) & Daytime Breeze",
    hullMaterial: "Classic Kettuvallam Anjili Hull",
    length: "74 ft Traditional",
    crewCount: "3 Crew Members",
    badge: "Classic Value",
    badgeClass: "badge-teak",
    rating: 4.86,
    reviewsCount: 64,
    startingPrice: 15500,
    dayCruisePrice: 10500,
    primaryImage: "assets/images/boats/ashtamudi_deluxe_4k.jpg",
    gallery: [
      "assets/images/boats/ashtamudi_deluxe_4k.jpg",
      "assets/images/gallery/teak_dining_salon_4k.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "Authentic, time-honored kettuvallam cruise offering rich heritage charm, delicious meals, and great value.",
    description: "Our authentic deluxe houseboat brings you the timeless simplicity of Kerala backwater life. Ideal for couples seeking a tranquil getaway without unnecessary pomp. Enjoy the gentle natural lake breezes during day cruising, and restful air-conditioned comfort throughout the night.",
    amenities: [
      { icon: "bi-moon-stars", label: "Night AC in Bedroom" },
      { icon: "bi-cup-hot", label: "Dedicated Onboard Cook" },
      { icon: "bi-flower1", label: "Fresh Flower Welcome" },
      { icon: "bi-speaker", label: "Bluetooth Music Dock" },
      { icon: "bi-life-preserver", label: "Standard Coastguard Safety" }
    ],
    inclusions: [
      "Welcome cold tender coconut juice",
      "Authentic Alleppey fish curry lunch or vegetarian spread",
      "Evening hot tea with Kerala banana fritters",
      "Dinner cooked fresh on board at harbor anchorage",
      "Morning breakfast with Idiyappam and vegetable stew"
    ]
  },
  {
    id: "kb-crown",
    name: "The Imperial Travancore",
    category: "luxury",
    bedrooms: 4,
    capacity: "8 to 14 Guests",
    acType: "24/7 Full Climate Control",
    hullMaterial: "Teak & Copper Cladding with Glass Enclosure",
    length: "130 ft Presidential Vessel",
    crewCount: "5 (Butler, Master Chef, Captain, 2 Crew)",
    badge: "Presidential Fleet",
    badgeClass: "badge-brass",
    rating: 4.99,
    reviewsCount: 42,
    startingPrice: 56000,
    dayCruisePrice: 35000,
    primaryImage: "assets/images/boats/imperial_travancore_4k.jpg",
    gallery: [
      "assets/images/boats/imperial_travancore_4k.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=3840&q=90",
      "assets/images/gallery/teak_dining_salon_4k.jpg",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=3840&q=90"
    ],
    tagline: "The pinnacle of backwater opulence. Four royal suites, dedicated butler service, and private conference lounge.",
    description: "The largest and most luxurious kettuvallam in the Alleppey backwaters. Featuring four master suites with king-size teak beds, glass walls, private butler service, and an upper deck capable of hosting private celebrations, executive retreats, or lavish family reunions in unmatched grandeur.",
    amenities: [
      { icon: "bi-person-badge", label: "Dedicated White-Glove Butler" },
      { icon: "bi-building-up", label: "Upper Deck Party Lounge" },
      { icon: "bi-snow", label: "24/7 Central Climate Control" },
      { icon: "bi-projector", label: "Projector & Sound System" },
      { icon: "bi-wifi", label: "Satellite High-Speed WiFi" },
      { icon: "bi-cup-hot", label: "Two Private Chefs Onboard" }
    ],
    inclusions: [
      "Royal welcome with live traditional instrumental music & garlands",
      "Custom multi-course menu designed in advance with the Master Chef",
      "Fresh seafood barbecue with Jumbo King Prawns and lobster on demand",
      "Sunset champagne / mocktail service on the top sun deck",
      "Private guided village heritage trail and coir-making demonstration",
      "Deluxe breakfast buffet served on the water"
    ]
  }
];

const PACKAGES_DATA = [
  {
    id: "pkg-day",
    title: "Classic Day Cruise",
    duration: "11:30 AM – 5:30 PM (6 Hours)",
    price: "₹12,500",
    priceNote: "for 2 guests, all inclusive",
    featured: false,
    tag: "Day Voyage",
    image: "assets/images/packages/kuttanad_premium_cruiser_4k.jpg",
    desc: "Experience the magic of Kerala backwaters in a single serene afternoon. Cruise through palm-shaded canals and enjoy a lavish lunch.",
    inclusions: [
      "Welcome tender coconut on arrival",
      "6 hours scenic backwater cruising",
      "Authentic Kerala lunch with fresh Karimeen fish fry",
      "Afternoon tea/coffee with hot banana fritters",
      "Use of living area, front deck, and powder room",
      "Dedicated boat captain and personal cook"
    ]
  },
  {
    id: "pkg-overnight",
    title: "Serene Overnight Stay",
    duration: "12:00 PM – 9:00 AM Next Day (21 Hours)",
    price: "₹18,500",
    priceNote: "for 2 guests, all inclusive",
    featured: true,
    tag: "Most Popular",
    image: "assets/images/packages/serene_overnight_4k.jpg",
    desc: "Our quintessential backwater journey. Drift by day, dock at sunset along peaceful riverbanks, and sleep soundly on still water.",
    inclusions: [
      "Welcome drink & cold refreshing towels",
      "Afternoon cruise through narrow village canals",
      "Traditional Kerala Sadya lunch with fish/veg dishes",
      "Sunset tea & savory snacks over Vembanad Lake",
      "Candlelit 4-course dinner prepared fresh onboard",
      "Private air-conditioned bedroom night stay",
      "Traditional breakfast before morning checkout"
    ]
  },
  {
    id: "pkg-twonight",
    title: "2-Night Deep Water Odyssey",
    duration: "2 Nights / 48 Hours Complete Immersion",
    price: "₹34,000",
    priceNote: "for 2 guests, all inclusive",
    featured: false,
    tag: "Slow Living",
    image: "assets/images/packages/deep_water_odyssey_4k.jpg",
    desc: "Leave the busy world far behind. Explore deep, untouched backwater villages, Kuttanad paddy fields below sea level, and bird sanctuaries.",
    inclusions: [
      "All meals: 2 Lunches, 2 Dinners, 2 Breakfasts & High Teas",
      "Extended route covering Alleppey, Kumarakom & Kuttanad",
      "Guided canoe excursion into narrow, hidden canals",
      "Village walk: meet local coir weavers and toddy tappers",
      "Fishing rods, bait, and chef preparation of your catch",
      "24/7 dedicated crew, chef, and concierge"
    ]
  },
  {
    id: "pkg-honeymoon",
    title: "Honeymoon Bliss on Water",
    duration: "Overnight Cruise with Romantic Touch",
    price: "₹22,500",
    priceNote: "for 2 guests, all inclusive",
    featured: false,
    tag: "For Couples",
    image: "assets/images/packages/honeymoon_bliss_4k.jpg",
    desc: "An unforgettable romantic escape. Intimate candlelit deck dinner under twinkling stars, floral bed decoration, and private boat privacy.",
    inclusions: [
      "Exquisite floral bedroom bed decoration upon arrival",
      "Decadent honeymoon celebration cake & sparkling wine/cider",
      "Private candlelit deck dinner with soothing backwater sounds",
      "100% private boat guarantee (no other guests on board)",
      "Choice of romantic music playlist on sound system",
      "Breakfast served in bed with fresh lake views"
    ]
  },
  {
    id: "pkg-family",
    title: "Family Heritage Gathering",
    duration: "Overnight Cruise for Up to 8 Guests",
    price: "₹42,000",
    priceNote: "for 2 guests, all inclusive",
    featured: false,
    tag: "Family Special",
    image: "assets/images/packages/family_heritage_4k.jpg",
    desc: "Gather your loved ones for a memorable reunion on a spacious 3-bedroom kettuvallam with kid-friendly meals, games, and cultural stops.",
    inclusions: [
      "Spacious 3-bedroom air-conditioned family cruiser",
      "Full board: Welcome drinks, lunch feast, tea & grand dinner",
      "Kid-friendly customized menu options (mild spice)",
      "Fun family canoe tour through heritage temple canals",
      "Interactive cooking session with the boat chef",
      "Board games, music system, and life jackets for all ages"
    ]
  },
  {
    id: "pkg-corporate",
    title: "Corporate & Sunset Retreat",
    duration: "Full Day / Sunset Cruise (Up to 15 Guests)",
    price: "₹36,000",
    priceNote: "for 2 guests, all inclusive",
    featured: false,
    tag: "Groups & Teams",
    image: "assets/images/packages/corporate_retreat_4k.jpg",
    desc: "Host an executive brainstorming session or team celebration amidst the calm backwaters, with upper deck presentation space and catering.",
    inclusions: [
      "Double-decker luxury boat with wide upper meeting deck",
      "Continuous tea, coffee, fresh juices, and artisanal snacks",
      "Lavish buffet lunch with coastal delicacies",
      "Audio-visual presentation equipment & Starlink WiFi",
      "Sunset cocktail / mocktail hour on Vembanad Lake",
      "Safety briefing and seasoned crew support"
    ]
  }
];
