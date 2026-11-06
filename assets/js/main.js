/**
 * KETTURAM BACKWATER CRUISES - CORE INTERACTIONS & THEME CONTROLLER
 * ThemeForest Standards: Clean ES6, zero console warnings, full accessibility
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME & RTL STATE MANAGEMENT (LOCALSTORAGE PERSISTENCE)
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'ketturam_theme_pref';
  const RTL_STORAGE_KEY = 'ketturam_rtl_pref';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // Default mode is strictly Light Mode ("Morning Mist")
    const activeTheme = savedTheme === 'dark' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', activeTheme);
    updateThemeIcon(activeTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateThemeIcon(nextTheme);

    showToast(
      nextTheme === 'dark' ? 'Night Lagoon theme activated' : 'Morning Mist theme activated',
      'info'
    );
  }

  function updateThemeIcon(theme) {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun';
          btn.setAttribute('aria-label', 'Switch to Morning Light Theme');
          btn.title = 'Switch to Morning Light Theme';
        } else {
          icon.className = 'bi bi-moon-stars';
          btn.setAttribute('aria-label', 'Switch to Night Lagoon Theme');
          btn.title = 'Switch to Night Lagoon Theme';
        }
      }
    });
  }

  function initRTL() {
    const savedRTL = localStorage.getItem(RTL_STORAGE_KEY);
    if (savedRTL === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      updateRTLButton(true);
      enforceRTLPunctuation(true);
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      updateRTLButton(false);
      enforceRTLPunctuation(false);
    }
  }

  function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const nextDir = isRTL ? 'ltr' : 'rtl';

    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem(RTL_STORAGE_KEY, nextDir);
    updateRTLButton(!isRTL);
    enforceRTLPunctuation(!isRTL);

    showToast(
      nextDir === 'rtl' ? 'Switched to RTL (Arabic / Hebrew)' : 'Switched to LTR Layout',
      'info'
    );
  }

  window.enforceRTLPunctuation = enforceRTLPunctuation;

  let rtlDebounce = null;
  function scheduleRTLPunctuation() {
    if (rtlDebounce) cancelAnimationFrame(rtlDebounce);
    rtlDebounce = requestAnimationFrame(() => {
      if (document.documentElement.getAttribute('dir') === 'rtl') {
        enforceRTLPunctuation(true);
      }
    });
  }
  // Guarantees punctuation marks (. ? ! : ; ) remain on the RIGHT of text runs
  // in RTL mode by applying zero-width Left-to-Right Marks (LRM \u200E) and
  // inline directional isolation across headings, paragraphs, accordions & cards.
  // --------------------------------------------------------------------------
  function enforceRTLPunctuation(isRTL) {
    const textSelectors = [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      '.accordion-title', '.accordion-content',
      '.section-title', '.section-subtitle', '.eyebrow',
      '.hero-title', '.hero-desc',
      '.timeline-title', '.timeline-desc',
      '.boat-card-title', '.boat-card-desc',
      '.destination-card-title', '.destination-card-desc',
      '.testimonial-text', '.testimonial-quote', '.testimonial-author',
      '.package-title', '.package-desc', '.inclusion-item',
      '.footer-brand p', '.footer-desc', '.footer-heading', '.copyright-text',
      '.toast-title', '.toast-text', '.modal-title', '.modal-body p'
    ];

    const elements = document.querySelectorAll(textSelectors.join(', '));
    const punctuationRegex = /[.?!:;,)"]$/;

    elements.forEach(el => {
      let lastNode = null;
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
          lastNode = node;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          for (let i = node.childNodes.length - 1; i >= 0; i--) {
            walk(node.childNodes[i]);
            if (lastNode) break;
          }
        }
      };
      walk(el);

      if (lastNode && lastNode.textContent) {
        const text = lastNode.textContent;
        if (isRTL) {
          if (punctuationRegex.test(text.trim()) && !text.endsWith('\u200E')) {
            lastNode.textContent = text + '\u200E';
          }
        } else {
          if (text.endsWith('\u200E')) {
            lastNode.textContent = text.replace(/\u200E+$/, '');
          }
        }
      }
    });
  }

  function updateRTLButton(isRTL) {
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => {
      btn.setAttribute('aria-label', isRTL ? 'Switch to LTR Layout' : 'Switch to RTL Layout');
      btn.title = isRTL ? 'Switch to LTR Layout' : 'Switch to RTL Layout';
      btn.innerHTML = '<i class="bi bi-arrow-left-right"></i>';
      btn.classList.toggle('active', isRTL);
    });
  }

  // --------------------------------------------------------------------------
  // 2. TOAST NOTIFICATION ENGINE
  // --------------------------------------------------------------------------
  function createToastContainer() {
    let container = document.getElementById('ketturam-toasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ketturam-toasts';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (message, type = 'info', duration = 3800) {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'bi-info-circle-fill';
    let title = 'Notification';

    if (type === 'success') {
      iconClass = 'bi-check-circle-fill';
      title = 'Success';
    } else if (type === 'warning') {
      iconClass = 'bi-exclamation-triangle-fill';
      title = 'Notice';
    }

    if (document.documentElement.getAttribute('dir') === 'rtl') {
      if (/[.?!:;,)"]$/.test(message.trim()) && !message.endsWith('\u200E')) {
        message = message + '\u200E';
      }
    }

    toast.innerHTML = `
      <i class="bi ${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-text">${message}</div>
      </div>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    container.appendChild(toast);

    // Trigger reveal transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  };

  // --------------------------------------------------------------------------
  // 3. STICKY HEADER & NAVBAR SCROLL BEHAVIOR
  // --------------------------------------------------------------------------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const getScrollTop = () => {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    const handleScroll = () => {
      const top = getScrollTop();
      if (top > 15) {
        header.classList.add('scrolled');
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('is-sticky');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE SLIDE-OUT DRAWER MENU
  // --------------------------------------------------------------------------
  function initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.drawer-close');

    if (!toggleBtn || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
      toggleBtn.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      toggleBtn.classList.remove('is-active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Auto close drawer when expanding to desktop width (>= 992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close drawer when clicking internal anchor links
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback
      revealElements.forEach(el => el.classList.add('is-revealed'));
    }
  }

  // --------------------------------------------------------------------------
  // 5b. TIMELINE SCROLL PROGRESS & ACTIVE TRACKER
  // --------------------------------------------------------------------------
  function initTimelineTracker() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          } else {
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.8) {
              entry.target.classList.remove('is-active');
            }
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -15% 0px'
      });

      timelineItems.forEach(item => observer.observe(item));
    }
  }

  // --------------------------------------------------------------------------
  // 6. ANIMATED NUMBER COUNTERS
  // --------------------------------------------------------------------------
  function initCounters() {
    const counterElements = document.querySelectorAll('.counter-number');
    if (!counterElements.length) return;

    const runCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quadratic
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = target * ease;

        if (isDecimal) {
          el.textContent = current.toFixed(2);
        } else {
          el.textContent = Math.floor(current).toLocaleString();
        }

        if (frame >= totalFrames) {
          el.textContent = isDecimal ? target.toFixed(2) : target.toLocaleString();
          clearInterval(counter);
        }
      }, frameRate);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      counterElements.forEach(el => observer.observe(el));
    } else {
      counterElements.forEach(runCounter);
    }
  }

  // --------------------------------------------------------------------------
  // 7. ACCORDIONS (FAQ)
  // --------------------------------------------------------------------------
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(acc => {
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');

        if (!header || !body) return;

        // Ensure all FAQ items start in a closed state on load
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;

        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close sibling items within the same accordion
          items.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherHeader = otherItem.querySelector('.accordion-header');
              if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
              const otherBody = otherItem.querySelector('.accordion-body');
              if (otherBody) otherBody.style.maxHeight = null;
            }
          });

          // Toggle clicked item
          if (isActive) {
            item.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
            body.style.maxHeight = null;
          } else {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. TESTIMONIALS DRAG & SCROLL SLIDER (BUTTONLESS MOUSE & TOUCH DRAG, WHEEL)
  // --------------------------------------------------------------------------
  function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const track = slider.querySelector('.testimonial-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!slides.length || !track) return;

    let currentIndex = 0;
    let autoPlayInterval = null;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragDistance = 0;
    let sliderWidth = slider.offsetWidth || 800;

    // Accessibility attributes
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Guest Reviews Carousel');

    // Create pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Navigate to review ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goTo(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function isRTL() {
      return document.documentElement.getAttribute('dir') === 'rtl';
    }

    function update(animated = true) {
      sliderWidth = slider.offsetWidth || 800;
      if (animated) {
        track.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        track.style.transition = 'none';
      }

      const factor = isRTL() ? 1 : -1;
      const targetPercent = factor * (currentIndex * 100);
      track.style.transform = `translateX(${targetPercent}%)`;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function next() {
      currentIndex = (currentIndex + 1) % slides.length;
      update(true);
    }

    function prev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      update(true);
    }

    function goTo(index) {
      currentIndex = index;
      update(true);
    }

    // ------------------------------------------------------------------------
    // POINTER / MOUSE DRAG GESTURE HANDLING
    // (Dragging from right to left moves left / next review, and vice versa)
    // ------------------------------------------------------------------------
    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;

      isDragging = true;
      startX = e.clientX;
      currentX = e.clientX;
      dragDistance = 0;
      sliderWidth = slider.offsetWidth || 800;

      slider.classList.add('is-dragging');
      track.style.transition = 'none';
      stopAutoPlay();

      if (slider.setPointerCapture && e.pointerId !== undefined) {
        try {
          slider.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      currentX = e.clientX;
      dragDistance = currentX - startX;

      // In real-time, move the track with the cursor
      // In LTR: base offset is -currentIndex * sliderWidth
      // dragDistance < 0 means dragging from right to left -> track moves further left
      // dragDistance > 0 means dragging from left to right -> track moves right
      const rtl = isRTL();
      const baseOffset = (rtl ? 1 : -1) * currentIndex * sliderWidth;
      const totalOffset = baseOffset + dragDistance;

      track.style.transform = `translateX(${totalOffset}px)`;

      if (Math.abs(dragDistance) > 6 && e.cancelable) {
        e.preventDefault();
      }
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      slider.classList.remove('is-dragging');

      if (slider.releasePointerCapture && e.pointerId !== undefined) {
        try {
          slider.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      const threshold = Math.max(45, sliderWidth * 0.08);
      const rtl = isRTL();

      // If dragged from right to left (dragDistance < -threshold):
      // in LTR: move left -> next slide!
      if (dragDistance < -threshold) {
        rtl ? prev() : next();
      } else if (dragDistance > threshold) {
        // Dragged from left to right (dragDistance > threshold):
        // in LTR: move right -> prev slide!
        rtl ? next() : prev();
      } else {
        // Snap back smoothly if threshold not reached
        update(true);
      }

      startAutoPlay();
    }

    // Attach Pointer Events (Supports Mouse Drag, Pen & Touch)
    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerUp);
    slider.addEventListener('pointercancel', onPointerUp);

    // Prevent ghost drag on child elements
    slider.addEventListener('dragstart', (e) => e.preventDefault());

    // ------------------------------------------------------------------------
    // MOUSE WHEEL / TRACKPAD HORIZONTAL SCROLL HANDLING
    // (Scrolling wheel/trackpad from right to left moves left, and vice versa)
    // ------------------------------------------------------------------------
    let wheelLocked = false;
    let wheelTimeout = null;

    slider.addEventListener('wheel', (e) => {
      const deltaX = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);

      if (Math.abs(deltaX) > 25) {
        e.preventDefault();
        if (!wheelLocked) {
          wheelLocked = true;
          stopAutoPlay();
          const rtl = isRTL();

          if (deltaX > 0) {
            // Scrolling right-to-left -> move to next review
            rtl ? prev() : next();
          } else {
            // Scrolling left-to-right -> move to previous review
            rtl ? next() : prev();
          }

          clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            wheelLocked = false;
            startAutoPlay();
          }, 450);
        }
      }
    }, { passive: false });

    // Keyboard navigation (Arrow keys)
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        isRTL() ? prev() : next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        isRTL() ? next() : prev();
      }
    });

    // Handle window resize recalculation
    window.addEventListener('resize', () => {
      sliderWidth = slider.offsetWidth || 800;
      update(false);
    });

    // Auto play with pause on hover
    function startAutoPlay() {
      if (!autoPlayInterval) {
        autoPlayInterval = setInterval(next, 6000);
      }
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', () => {
      if (!isDragging) startAutoPlay();
    });

    startAutoPlay();
    update(false);
  }

  // --------------------------------------------------------------------------
  // 9. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. NEWSLETTER SUBSCRIPTION FORM (STRICT DATA TYPE ENFORCEMENT)
  // --------------------------------------------------------------------------
  function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      const input = form.querySelector('input[type="email"]');
      if (input) {
        // Disallow space bar keystrokes in email fields
        input.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
          }
        });

        // Strip whitespace on input
        input.addEventListener('input', function () {
          this.value = this.value.replace(/\s+/g, '');
        });
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!input) return;

        const email = input.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !emailRegex.test(email)) {
          showToast('Please enter a valid email address (e.g. name@domain.com)', 'warning');
          input.focus();
          input.style.borderColor = '#B94A48';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
          return;
        }

        // Save in LocalStorage
        const subscribers = JSON.parse(localStorage.getItem('ketturam_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('ketturam_subscribers', JSON.stringify(subscribers));
        }

        input.value = '';
        showToast('Thank you! You are now subscribed to Backwater Letters', 'success');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. QUICK AVAILABILITY STRIP CONTROLLER (HOME PAGES)
  // --------------------------------------------------------------------------
  function initQuickStrip() {
    const stripForms = document.querySelectorAll('#home-quick-booking-form, #quick-check-form');
    if (!stripForms.length) return;

    stripForms.forEach(stripForm => {
      // Set default check-in date to tomorrow
      const dateInput = stripForm.querySelector('input[type="date"]');
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
        dateInput.min = `${yyyy}-${mm}-${dd}`;
      }

      stripForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkin = dateInput?.value || '';
        const guests = stripForm.querySelector('[name="guests"]')?.value || '2';
        const cruise = stripForm.querySelector('[name="cruise"]')?.value || 'overnight';
        const category = stripForm.querySelector('[name="category"]')?.value || 'all';

        // Save search preference
        const searchIntent = { checkin, guests, cruise, category, timestamp: Date.now() };
        localStorage.setItem('ketturam_last_search', JSON.stringify(searchIntent));

        showToast(`Checking backwaters availability...`, 'info');

        setTimeout(() => {
          // Redirect to booking/contact page with params
          const params = new URLSearchParams({
            date: checkin,
            guests: guests,
            cruise: cruise,
            category: category
          });
          window.location.href = `contact.html?${params.toString()}`;
        }, 500);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. ACTIVE NAVIGATION LINK HIGHLIGHTING & DROPDOWNS
  // --------------------------------------------------------------------------
  function initNavDropdowns() {
    const dropdownToggles = document.querySelectorAll('.has-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const parent = toggle.closest('.has-dropdown');
        if (parent) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = parent.classList.contains('is-open');

          // Close other open dropdowns
          document.querySelectorAll('.has-dropdown.is-open').forEach(el => {
            if (el !== parent) {
              el.classList.remove('is-open');
              const t = el.querySelector('.has-dropdown-toggle');
              if (t) t.setAttribute('aria-expanded', 'false');
            }
          });

          parent.classList.toggle('is-open', !isOpen);
          toggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.is-open').forEach(el => {
          el.classList.remove('is-open');
          const toggle = el.querySelector('.has-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.has-dropdown.is-open').forEach(el => {
          el.classList.remove('is-open');
          const toggle = el.querySelector('.has-dropdown-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      }
    });
  }

  function initDrawerDropdowns() {
    document.querySelectorAll('.has-drawer-dropdown').forEach(item => {
      const toggle = item.querySelector('.drawer-dropdown-toggle');
      const row = item.querySelector('.drawer-link-row');

      const toggleHandler = (e) => {
        if (e.target.closest('.drawer-sublink')) return;
        if (e.target.closest('.drawer-dropdown-toggle') || e.target.closest('.drawer-link')) {
          e.preventDefault();
          e.stopPropagation();
          item.classList.toggle('open');
          const isOpen = item.classList.contains('open');
          if (toggle) toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      };

      if (row) row.addEventListener('click', toggleHandler);
    });
  }

  function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .drawer-link, .dropdown-item, .drawer-sublink');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.split('/').pop();
      const isMatch = linkPath === currentPath || (currentPath === '' && linkPath === 'index.html');

      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        // Highlight parent desktop dropdown trigger if applicable
        const parentDropdown = link.closest('.has-dropdown');
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector('.has-dropdown-toggle');
          if (parentToggle) parentToggle.classList.add('active');
        }

        // Highlight and auto-expand mobile drawer parent if active
        const parentDrawerItem = link.closest('.has-drawer-dropdown');
        if (parentDrawerItem) {
          parentDrawerItem.classList.add('open');
          const drawerToggle = parentDrawerItem.querySelector('.drawer-dropdown-toggle');
          if (drawerToggle) drawerToggle.setAttribute('aria-expanded', 'true');
          const parentDrawerLink = parentDrawerItem.querySelector('.drawer-link');
          if (parentDrawerLink) parentDrawerLink.classList.add('active');
        }
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12b. SOCIAL MEDIA LINKS REDIRECTION HANDLER
  // Ensures reliable external navigation across sandboxes, iframes & webviews
  // --------------------------------------------------------------------------
  function initSocialLinks() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        const targetUrl = icon.getAttribute('href');
        if (!targetUrl || targetUrl === '#' || targetUrl.startsWith('javascript:')) return;

        e.preventDefault();

        // Attempt to open in a new tab first
        let opened = false;
        try {
          const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
          if (newWindow && !newWindow.closed && typeof newWindow.closed !== 'undefined') {
            opened = true;
          }
        } catch (_) {
          opened = false;
        }

        // If popup was blocked or prevented by webview/sandbox, redirect current/top window
        if (!opened) {
          try {
            if (window.top && window.top !== window) {
              window.top.location.href = targetUrl;
            } else {
              window.location.href = targetUrl;
            }
          } catch (_) {
            window.location.href = targetUrl;
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12b. SANCTUARY FLOATING DUO 3D TILT INTERACTION (HOME PAGE 2)
  // --------------------------------------------------------------------------
  function initSanctuaryDuoTilt() {
    const cards = document.querySelectorAll('.sanctuary-duo-card');
    if (!cards.length) return;

    // Preserve native scroll performance on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    cards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.028, 1.028, 1.028)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12c. SANCTUARY HERO GENTLE PARALLAX (HOME PAGE 2)
  // --------------------------------------------------------------------------
  function initSanctuaryHeroMotion() {
    const hero = document.querySelector('.hero-sanctuary');
    if (!hero) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const content = hero.querySelector('.hero-sanctuary-content');
    if (!content) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTicking = false;

    function renderLoop() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      content.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(renderLoop);
      } else {
        isTicking = false;
      }
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = normX * -14;
      targetY = normY * -10;

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(renderLoop);
      }
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(renderLoop);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12d. 4K HERO SHOWCASE SLIDER (STABLE CROSSFADE & SCENE SWITCHER)
  // --------------------------------------------------------------------------
  function initHeroShowcase() {
    const heroBg = document.getElementById('hero-slider');
    if (!heroBg) return;

    const slides = heroBg.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator-btn');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;
    const intervalTime = 7500;

    function goToSlide(index) {
      if (index === currentIndex) return;
      slides[currentIndex].classList.remove('active');
      if (indicators[currentIndex]) {
        indicators[currentIndex].classList.remove('active');
      }

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (indicators[currentIndex]) {
        indicators[currentIndex].classList.add('active');
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, intervalTime);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Attach indicator button events
    indicators.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        startAutoPlay();
      });
    });

    // Pause on hover over hero section for reading/viewing stability
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoPlay);
      heroSection.addEventListener('mouseleave', startAutoPlay);
      heroSection.addEventListener('touchstart', stopAutoPlay, { passive: true });
      heroSection.addEventListener('touchend', startAutoPlay, { passive: true });
    }

    startAutoPlay();
  }

  // --------------------------------------------------------------------------
  // 13. GLOBAL INITIALIZER
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initHeaderScroll();
    initMobileDrawer();
    initNavDropdowns();
    initDrawerDropdowns();
    initScrollReveals();
    initTimelineTracker();
    initCounters();
    initAccordions();
    initTestimonialSlider();
    initBackToTop();
    initNewsletter();
    initQuickStrip();
    initSocialLinks();
    highlightActiveNav();
    initSanctuaryDuoTilt();
    initSanctuaryHeroMotion();
    initHeroShowcase();

    // Attach click events for theme & RTL toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleRTL);
    });

    // Auto-enforce RTL punctuation fidelity on dynamic DOM updates (filtered cards, modals, reviews)
    if ('MutationObserver' in window) {
      const dynamicRTLObserver = new MutationObserver(() => {
        if (document.documentElement.getAttribute('dir') === 'rtl') {
          scheduleRTLPunctuation();
        }
      });
      dynamicRTLObserver.observe(document.body, { childList: true, subtree: true });
    }
  });

})();
