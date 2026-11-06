/**
 * KETTURAM BACKWATER CRUISES - GALLERY & LIGHTBOX ENGINE
 * High-Resolution Photography Dataset and Accessible Lightbox Controller
 */

const GALLERY_DATA = [
  {
    id: "g-1",
    title: "Morning Mist on Punnamada Lake",
    category: "houseboats",
    caption: "A traditional kettuvallam glides silently through the early morning fog of Vembanad backwaters.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=3840&q=90",
    alt: "Traditional Kerala kettuvallam houseboat gliding on calm misty water with palm trees"
  },
  {
    id: "g-2",
    title: "Master Suite with Lake Panorama",
    category: "interiors",
    caption: "Wake up to endless water horizons through expansive floor-to-ceiling panoramic glass windows.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=3840&q=90",
    alt: "Luxury houseboat master bedroom suite with view of serene backwaters"
  },
  {
    id: "g-3",
    title: "Upper Deck Sundown Lounge",
    category: "houseboats",
    caption: "Handmade teak and rattan lounging chairs on the upper observation deck at dusk.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=3840&q=90",
    alt: "Upper deck wooden terrace lounge of luxury houseboat overlooking calm lake"
  },
  {
    id: "g-4",
    title: "Karimeen Pollichathu & Traditional Sadya",
    category: "food",
    caption: "Fresh pearl spot fish marinated in shallots and crushed Malabar black pepper, steamed in a banana leaf.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=3840&q=90",
    alt: "Authentic Kerala cuisine lunch served fresh on a banana leaf aboard a houseboat"
  },
  {
    id: "g-5",
    title: "Golden Hour Over Kuttanad Paddy Fields",
    category: "sunsets",
    caption: "The setting sun bathes the emerald waterways and coconut palms in rich amber light.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=90",
    alt: "Golden sunset over calm Kerala backwater river with palm trees reflection"
  },
  {
    id: "g-6",
    title: "Village Life by Narrow Canals",
    category: "experiences",
    caption: "A local villager paddles a slender wooden canoe past flowering lotus clusters in Kainakary.",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=3840&q=90",
    alt: "Traditional wooden canoe drifting through narrow Kerala backwater village canal"
  },
  {
    id: "g-7",
    title: "The Double-Decker Imperial Vessel",
    category: "houseboats",
    caption: "Crafted entirely with natural coir and wild jackfruit wood, anchored in a tranquil lagoon.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=3840&q=90",
    alt: "Spectacular double-decker kettuvallam cruising smoothly along coconut grove waterways"
  },
  {
    id: "g-8",
    title: "En-suite Jacuzzi with Water Vista",
    category: "interiors",
    caption: "Indulge in a warm herbal soak while watching egrets and fishing canoes glide past.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=3840&q=90",
    alt: "Luxury bathroom with sunken bathtub and tranquil panoramic view of tropical nature"
  },
  {
    id: "g-9",
    title: "Fresh Banana Fritters & Cardamom Chai",
    category: "food",
    caption: "Crisp Pazham Pori made with ripe Nendran bananas, served at 4:30 PM alongside freshly brewed Malabar tea.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=3840&q=90",
    alt: "Freshly prepared South Indian delicacies and spiced tea served in brass ware"
  },
  {
    id: "g-10",
    title: "Twilight Anchorage on Still Water",
    category: "sunsets",
    caption: "Boats are safely moored for the night along quiet rural banks, allowing the water to turn to glass.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=3840&q=90",
    alt: "Quiet evening twilight on still backwater with silhouette of coconut palms"
  },
  {
    id: "g-11",
    title: "Traditional Coir Craftsmanship",
    category: "experiences",
    caption: "Hand-braided coconut coir ropes binding the ancient curved hull timbers without nails.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=3840&q=90",
    alt: "Sunlight filtering through handcrafted bamboo and coir roof slats of Kerala houseboat"
  },
  {
    id: "g-12",
    title: "Teak Dining Salon",
    category: "interiors",
    caption: "Natural airflow, polished solid wood tables, and panoramic river breezes create an unforgettable dining ambiance.",
    image: "assets/images/gallery/teak_dining_salon_4k.jpg",
    alt: "Airy dining salon with teak wood finishes and large open viewing deck"
  },
  {
    id: "g-13",
    title: "The Living Veins of Kuttanad (Aerial Perspective)",
    category: "experiences",
    caption: "A breathtaking high-altitude aerial perspective of traditional kettuvallam houseboats gliding in quiet harmony between emerald paddy fields and wild coconut lagoons.",
    image: "assets/images/gallery/kerala_backwaters_aerial_4k.jpg",
    alt: "Aerial drone photograph of traditional Kerala houseboats sailing on a river between emerald rice fields and palm trees"
  },
  {
    id: "g-14",
    title: "Vembanad Royal Sundeck Cruiser",
    category: "houseboats",
    caption: "Our flagship royal double-decker kettuvallam cruising past coconut corridors with full panoramic observation deck.",
    image: "assets/images/gallery/vembanad_royal_sundeck_4k.jpg",
    alt: "Panoramic double-decker luxury Kerala houseboat sailing on tranquil water"
  },
  {
    id: "g-15",
    title: "Candlelit Twilight on the Lake",
    category: "sunsets",
    caption: "Private romantic dinner set on the open wooden bow as twilight paints Vembanad Lake in gold and indigo.",
    image: "assets/images/gallery/sunset_candlelit_deck_4k.jpg",
    alt: "Candlelit romantic dining on the bow of a houseboat during tranquil sunset"
  },
  {
    id: "g-16",
    title: "Upper Deck Backwater Feast",
    category: "food",
    caption: "Freshly prepared authentic Kerala delicacies served on banana leaves amidst cool evening river breezes.",
    image: "assets/images/gallery/deck_culinary_feast_4k.jpg",
    alt: "Traditional Kerala culinary feast served on banana leaves on the upper deck"
  }
];

class LightboxViewer {
  constructor() {
    this.currentIndex = 0;
    this.items = GALLERY_DATA;
    this.filteredItems = [...GALLERY_DATA];
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.initDOM();
    this.attachEvents();
  }

  initDOM() {
    if (document.getElementById('ketturam-lightbox')) return;

    const lightboxEl = document.createElement('div');
    lightboxEl.id = 'ketturam-lightbox';
    lightboxEl.className = 'lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-modal', 'true');
    lightboxEl.setAttribute('aria-label', 'Image Gallery Viewer');

    lightboxEl.innerHTML = `
      <div class="lightbox-header">
        <span class="lightbox-counter" id="lightbox-counter">1 / 12</span>
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close Lightbox">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="lightbox-stage" id="lightbox-stage">
        <button class="lightbox-btn lightbox-prev" id="lightbox-prev-btn" aria-label="Previous Image">
          <i class="bi bi-chevron-left"></i>
        </button>
        <img src="" alt="" class="lightbox-img" id="lightbox-img">
        <button class="lightbox-btn lightbox-next" id="lightbox-next-btn" aria-label="Next Image">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <div class="lightbox-footer">
        <h4 class="lightbox-caption" id="lightbox-caption"></h4>
        <p class="lightbox-subtext" id="lightbox-subtext" style="font-size: 0.88rem; max-width: 600px; margin: 0 auto 0.8rem;"></p>
        <a href="contact.html" class="btn btn-primary btn-sm" id="lightbox-book-btn">
          <i class="bi bi-calendar2-check"></i> Book This Cruise Experience
        </a>
      </div>
    `;

    document.body.appendChild(lightboxEl);

    this.lightbox = lightboxEl;
    this.imgEl = document.getElementById('lightbox-img');
    this.captionEl = document.getElementById('lightbox-caption');
    this.subtextEl = document.getElementById('lightbox-subtext');
    this.counterEl = document.getElementById('lightbox-counter');
    this.closeBtn = document.getElementById('lightbox-close-btn');
    this.prevBtn = document.getElementById('lightbox-prev-btn');
    this.nextBtn = document.getElementById('lightbox-next-btn');
    this.stage = document.getElementById('lightbox-stage');
  }

  attachEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Close on background backdrop click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.stage || e.target === this.lightbox) {
        this.close();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe support
    this.stage.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.stage.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleGesture();
    }, { passive: true });
  }

  handleGesture() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 45) {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (diff > 0) {
        isRTL ? this.next() : this.prev();
      } else {
        isRTL ? this.prev() : this.next();
      }
    }
  }

  open(index = 0, currentList = null) {
    if (currentList && currentList.length) {
      this.filteredItems = currentList;
    } else {
      this.filteredItems = this.items;
    }

    this.currentIndex = Math.max(0, Math.min(index, this.filteredItems.length - 1));
    this.render();
    this.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close() {
    this.lightbox.classList.remove('open');
    document.body.style.overflow = '';
    this.isOpen = false;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
    this.render();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
    this.render();
  }

  render() {
    const item = this.filteredItems[this.currentIndex];
    if (!item) return;

    this.imgEl.style.opacity = '0';
    this.imgEl.decoding = 'async';
    this.imgEl.onerror = () => {
      this.imgEl.onerror = null;
      this.imgEl.src = 'assets/images/gallery/teak_dining_salon_4k.jpg';
      this.imgEl.style.opacity = '1';
    };
    this.imgEl.src = item.image;
    this.imgEl.alt = item.alt;

    this.imgEl.onload = () => {
      this.imgEl.style.opacity = '1';
    };

    this.captionEl.textContent = item.title;
    this.subtextEl.textContent = item.caption;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
  }
}

// Global instance for convenience
let globalLightbox = null;
document.addEventListener('DOMContentLoaded', () => {
  globalLightbox = new LightboxViewer();
});
