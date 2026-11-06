/**
 * KETTURAM BACKWATER CRUISES - BOOKING & ENQUIRY ENGINE
 * Handles URL parameter pre-filling, dynamic cost calculator,
 * client-side form validation, LocalStorage persistence,
 * and WhatsApp concierge message generation.
 */

(function () {
  'use strict';

  const BOOKINGS_STORAGE_KEY = 'ketturam_confirmed_bookings';
  const CONCIERGE_WHATSAPP_NUMBER = '919876598765'; // Alleppey Concierge Desk

  // --------------------------------------------------------------------------
  // 1. POPULATE SELECT DROPDOWNS FROM DATA
  // --------------------------------------------------------------------------
  function populateFormDropdowns() {
    const boatSelect = document.getElementById('booking-boat');
    const pkgSelect = document.getElementById('booking-package');

    if (boatSelect && typeof HOUSEBOATS_DATA !== 'undefined') {
      boatSelect.innerHTML = '<option value="">-- Choose Your Kettuvallam --</option>';
      HOUSEBOATS_DATA.forEach(boat => {
        const opt = document.createElement('option');
        opt.value = boat.id;
        opt.textContent = `${boat.name} (${boat.bedrooms} Bed · ${boat.capacity}) - From ₹${boat.startingPrice.toLocaleString()}`;
        opt.dataset.price = boat.startingPrice;
        boatSelect.appendChild(opt);
      });
    }

    if (pkgSelect && typeof PACKAGES_DATA !== 'undefined') {
      pkgSelect.innerHTML = '<option value="">-- Choose Cruise Package --</option>';
      PACKAGES_DATA.forEach(pkg => {
        const opt = document.createElement('option');
        opt.value = pkg.id;
        opt.textContent = `${pkg.title} (${pkg.duration}) - ${pkg.price}`;
        pkgSelect.appendChild(opt);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 2. PARSE URL PARAMETERS & PREFILL FORM
  // --------------------------------------------------------------------------
  function prefillFromURL() {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const guestsParam = params.get('guests');
    const cruiseParam = params.get('cruise');
    const boatParam = params.get('boat');
    const pkgParam = params.get('package');

    const checkinInput = document.getElementById('booking-checkin');
    const checkoutInput = document.getElementById('booking-checkout');
    const adultsInput = document.getElementById('booking-adults');
    const cruiseSelect = document.getElementById('booking-cruise-type');
    const boatSelect = document.getElementById('booking-boat');
    const pkgSelect = document.getElementById('booking-package');

    // Dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const defaultCheckin = dateParam || tomorrow.toISOString().split('T')[0];
    if (checkinInput) {
      checkinInput.value = defaultCheckin;
      checkinInput.min = today.toISOString().split('T')[0];
    }

    if (checkoutInput) {
      const dayAfter = new Date(defaultCheckin);
      dayAfter.setDate(dayAfter.getDate() + 1);
      checkoutInput.value = dayAfter.toISOString().split('T')[0];
      checkoutInput.min = defaultCheckin;
    }

    // Guests
    if (adultsInput && guestsParam) {
      adultsInput.value = guestsParam;
    }

    // Cruise Type
    if (cruiseSelect && cruiseParam) {
      cruiseSelect.value = cruiseParam;
    }

    // Boat
    if (boatSelect && boatParam) {
      boatSelect.value = boatParam;
    }

    // Package
    if (pkgSelect && pkgParam) {
      pkgSelect.value = pkgParam;
    }

    calculateEstimatedTotal();
  }

  // --------------------------------------------------------------------------
  // 3. DYNAMIC PRICE ESTIMATE CALCULATOR
  // --------------------------------------------------------------------------
  function calculateEstimatedTotal() {
    const boatSelect = document.getElementById('booking-boat');
    const checkinInput = document.getElementById('booking-checkin');
    const checkoutInput = document.getElementById('booking-checkout');
    const adultsInput = document.getElementById('booking-adults');
    const totalDisplay = document.getElementById('booking-est-total');
    const breakdownDisplay = document.getElementById('booking-est-breakdown');

    if (!totalDisplay || !boatSelect) return;

    const selectedBoatId = boatSelect.value;
    const boat = typeof HOUSEBOATS_DATA !== 'undefined'
      ? HOUSEBOATS_DATA.find(b => b.id === selectedBoatId)
      : null;

    if (!boat) {
      totalDisplay.textContent = 'Select a boat to see estimate';
      if (breakdownDisplay) breakdownDisplay.textContent = 'Rates include all 4 onboard meals & crew';
      return;
    }

    let nights = 1;
    if (checkinInput && checkoutInput && checkinInput.value && checkoutInput.value) {
      const d1 = new Date(checkinInput.value);
      const d2 = new Date(checkoutInput.value);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nights = diffDays;
    }

    const baseCost = boat.startingPrice * nights;
    const taxes = Math.round(baseCost * 0.05); // 5% GST
    const estimatedTotal = baseCost + taxes;

    totalDisplay.textContent = `₹${estimatedTotal.toLocaleString()} INR`;
    if (breakdownDisplay) {
      breakdownDisplay.textContent = `${boat.name} · ${nights} Night(s) @ ₹${boat.startingPrice.toLocaleString()} + 5% GST (All 4 meals & crew included)`;
    }
  }

  // --------------------------------------------------------------------------
  // 4. BOOKING FORM SUBMISSION & STRICT DATA TYPE ENFORCEMENT
  // --------------------------------------------------------------------------
  function initBookingForm() {
    const form = document.getElementById('ketturam-booking-form');
    if (!form) return;

    // Form field elements
    const name = document.getElementById('booking-name');
    const email = document.getElementById('booking-email');
    const phone = document.getElementById('booking-phone');
    const checkin = document.getElementById('booking-checkin');
    const checkout = document.getElementById('booking-checkout');
    const boat = document.getElementById('booking-boat');
    const pkg = document.getElementById('booking-package');
    const adults = document.getElementById('booking-adults');
    const children = document.getElementById('booking-children');
    const mealPref = document.getElementById('booking-meal-pref');
    const requests = document.getElementById('booking-requests');

    // Validation helper: toggles visual state classes
    const validateField = (field, condition) => {
      if (!field) return true;
      if (!condition) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        return false;
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        return true;
      }
    };

    // ------------------------------------------------------------------------
    // DATA TYPE 1: FULL NAME (Alphabetic letters & spaces only)
    // ------------------------------------------------------------------------
    if (name) {
      // Disallow non-letter keys (numbers, math, special symbols)
      name.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key)) {
          return;
        }
        // Only accept alphabet letters, space, hyphen, apostrophe, and period
        if (!/^[a-zA-Z\s.'-]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      // Filter paste and autocomplete input strictly
      name.addEventListener('input', function () {
        const clean = this.value.replace(/[^a-zA-Z\s.'-]/g, '');
        if (this.value !== clean) this.value = clean;
        const val = this.value.trim();
        validateField(this, val.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(val));
      });

      name.addEventListener('blur', function () {
        const val = this.value.trim();
        validateField(this, val.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(val));
      });
    }

    // ------------------------------------------------------------------------
    // DATA TYPE 2: EMAIL ADDRESS (Strict RFC standard email format)
    // ------------------------------------------------------------------------
    if (email) {
      // Disallow whitespace typing
      email.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
        }
      });

      email.addEventListener('input', function () {
        this.value = this.value.replace(/\s+/g, '');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        validateField(this, emailRegex.test(this.value.trim()));
      });

      email.addEventListener('blur', function () {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        validateField(this, emailRegex.test(this.value.trim()));
      });
    }

    // ------------------------------------------------------------------------
    // DATA TYPE 3: PHONE / WHATSAPP NUMBER (Numeric digits with standard formatting)
    // ------------------------------------------------------------------------
    if (phone) {
      // Disallow alphabet letters and invalid symbols
      phone.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key)) {
          return;
        }
        // Accept only digits 0-9, +, space, hyphen, and parentheses
        if (!/^[0-9+\s()-]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      phone.addEventListener('input', function () {
        const clean = this.value.replace(/[^0-9+\s()-]/g, '');
        if (this.value !== clean) this.value = clean;
        const digits = this.value.replace(/\D/g, '');
        validateField(this, digits.length >= 10 && digits.length <= 15);
      });

      phone.addEventListener('blur', function () {
        const digits = this.value.replace(/\D/g, '');
        validateField(this, digits.length >= 10 && digits.length <= 15);
      });
    }

    // ------------------------------------------------------------------------
    // DATA TYPE 4: CALENDAR DATES (Present or future dates; checkout >= checkin)
    // ------------------------------------------------------------------------
    const todayStr = new Date().toISOString().split('T')[0];
    if (checkin) {
      checkin.min = todayStr;
      checkin.addEventListener('change', function () {
        const isValid = this.value && this.value >= todayStr;
        validateField(this, isValid);
        if (checkout) {
          checkout.min = this.value || todayStr;
          if (checkout.value && checkout.value < this.value) {
            checkout.value = this.value;
          }
          if (checkout.value) {
            validateField(checkout, checkout.value >= this.value);
          }
        }
      });
    }

    if (checkout) {
      checkout.min = (checkin && checkin.value) ? checkin.value : todayStr;
      checkout.addEventListener('change', function () {
        if (checkin && checkin.value) {
          validateField(this, this.value >= checkin.value);
        } else {
          validateField(this, this.value >= todayStr);
        }
      });
    }

    // ------------------------------------------------------------------------
    // DATA TYPE 5: SELECT DROPDOWNS
    // ------------------------------------------------------------------------
    if (boat) {
      boat.addEventListener('change', function () {
        validateField(this, this.value.trim() !== '');
      });
    }

    // ------------------------------------------------------------------------
    // DATA TYPE 6: SPECIAL REQUESTS TEXTAREA (Sanitize script injection)
    // ------------------------------------------------------------------------
    if (requests) {
      requests.addEventListener('input', function () {
        this.value = this.value.replace(/[<>]/g, '');
      });
    }

    // Listen to changes for dynamic cost calculation
    const watchInputs = ['booking-boat', 'booking-package', 'booking-checkin', 'booking-checkout', 'booking-adults', 'booking-cruise-type'];
    watchInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', calculateEstimatedTotal);
      }
    });

    // ------------------------------------------------------------------------
    // FORM SUBMISSION: STRICT VALIDATION OF ALL DATA TYPES
    // ------------------------------------------------------------------------
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameVal = name ? name.value.trim() : '';
      const emailVal = email ? email.value.trim() : '';
      const phoneVal = phone ? phone.value.trim() : '';
      const phoneDigits = phoneVal.replace(/\D/g, '');
      const checkinVal = checkin ? checkin.value : '';
      const checkoutVal = checkout ? checkout.value : '';
      const boatVal = boat ? boat.value : '';

      // Evaluate data type validity
      const isNameValid = validateField(name, nameVal.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(nameVal));
      const isEmailValid = validateField(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal));
      const isPhoneValid = validateField(phone, phoneDigits.length >= 10 && phoneDigits.length <= 15);
      const isCheckinValid = validateField(checkin, checkinVal !== '' && checkinVal >= todayStr);
      const isCheckoutValid = validateField(checkout, !checkoutVal || (checkoutVal >= checkinVal));
      const isBoatValid = validateField(boat, boatVal !== '');

      // Descriptive data type rejection notifications
      if (!isNameValid) {
        window.showToast('Full Name must contain only alphabetic letters (minimum 2 characters).', 'warning');
        name.focus();
        return;
      }

      if (!isEmailValid) {
        window.showToast('Please enter a valid email address format (e.g. name@domain.com).', 'warning');
        email.focus();
        return;
      }

      if (!isPhoneValid) {
        window.showToast('Phone number must contain at least 10 digits (numbers only).', 'warning');
        phone.focus();
        return;
      }

      if (!isCheckinValid) {
        window.showToast('Please select a valid present or future check-in date.', 'warning');
        checkin.focus();
        return;
      }

      if (!isCheckoutValid) {
        window.showToast('Check-out date must be on or after check-in date.', 'warning');
        checkout.focus();
        return;
      }

      if (!isBoatValid) {
        window.showToast('Please select a kettuvallam houseboat from our fleet.', 'warning');
        boat.focus();
        return;
      }

      // Generate Reference Number
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const referenceId = `KTR-2026-${randomNum}`;

      // Selected boat details
      const selectedBoatObj = typeof HOUSEBOATS_DATA !== 'undefined'
        ? HOUSEBOATS_DATA.find(b => b.id === boatVal)
        : null;
      const boatName = selectedBoatObj ? selectedBoatObj.name : 'Selected Houseboat';

      // Selected package details
      const selectedPkgObj = typeof PACKAGES_DATA !== 'undefined'
        ? PACKAGES_DATA.find(p => p.id === (pkg ? pkg.value : ''))
        : null;
      const pkgName = selectedPkgObj ? selectedPkgObj.title : 'Custom Backwater Cruise';

      // Booking Record Object
      const bookingRecord = {
        referenceId,
        guestName: nameVal,
        email: emailVal,
        phone: phoneVal,
        checkin: checkinVal,
        checkout: checkoutVal || checkinVal,
        boatId: boatVal,
        boatName,
        packageId: pkg ? pkg.value : '',
        packageName: pkgName,
        adults: adults ? adults.value : '2',
        children: children ? children.value : '0',
        mealPref: mealPref ? mealPref.value : 'Authentic Kerala Cuisine',
        requests: requests ? requests.value.trim() : 'None',
        createdAt: new Date().toISOString()
      };

      // Persist to LocalStorage
      const savedBookings = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]');
      savedBookings.unshift(bookingRecord);
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(savedBookings));

      // Show Confirmation Modal
      showConfirmationModal(bookingRecord);

      // Toast notification
      window.showToast(`Enquiry confirmed! Reference ID: ${referenceId}`, 'success');

      // Reset form & clear validation classes
      form.reset();
      [name, email, phone, checkin, checkout, boat].forEach(f => {
        if (f) {
          f.classList.remove('is-valid');
          f.classList.remove('is-invalid');
        }
      });
      prefillFromURL();
    });
  }

  // --------------------------------------------------------------------------
  // 5. BOOKING CONFIRMATION MODAL & WHATSAPP EXPORT
  // --------------------------------------------------------------------------
  function showConfirmationModal(booking) {
    let modal = document.getElementById('booking-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'booking-confirmation-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    // Construct WhatsApp message URL
    const waText = encodeURIComponent(
      `*New Houseboat Booking Enquiry - Ketturam Cruises*\n` +
      `──────────────────────\n` +
      `*Reference ID:* ${booking.referenceId}\n` +
      `*Guest Name:* ${booking.guestName}\n` +
      `*Contact:* ${booking.phone} (${booking.email})\n` +
      `*Vessel:* ${booking.boatName}\n` +
      `*Package:* ${booking.packageName}\n` +
      `*Dates:* ${booking.checkin} to ${booking.checkout}\n` +
      `*Guests:* ${booking.adults} Adults, ${booking.children} Children\n` +
      `*Meal Preference:* ${booking.mealPref}\n` +
      `*Special Requests:* ${booking.requests || 'None'}\n` +
      `──────────────────────\n` +
      `Kindly confirm my backwater cruise availability and send boarding jetty directions.`
    );
    const waUrl = `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${waText}`;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 620px;">
        <button class="modal-close-btn" id="confirm-modal-close" aria-label="Close Confirmation">&times;</button>
        <div class="modal-body" style="text-align: center; padding: clamp(1.4rem, 4vw, 2.8rem) clamp(1rem, 3vw, 2.2rem);">
          <div style="width: 64px; height: 64px; border-radius: 50%; background-color: rgba(60, 131, 96, 0.15); color: #3C8360; display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1.2rem;">
            <i class="bi bi-check2-circle"></i>
          </div>

          <h3 style="font-size: clamp(1.4rem, 3vw, 1.9rem); margin-bottom: 0.4rem;">Booking Enquiry Received</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.8rem;">
            Your kettle-boat voyage enquiry has been securely logged. Our Alleppey harbour master is reserving your preferred vessel.
          </p>

          <div style="background-color: var(--bg-card); border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); padding: clamp(0.9rem, 2vw, 1.2rem); margin-bottom: 2rem; text-align: start;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.8rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.6rem;">
              <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.1em;">Booking Reference</span>
              <strong style="color: var(--accent-primary); font-family: monospace; font-size: 1.1rem; word-break: break-all;">${booking.referenceId}</strong>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2" style="font-size: 0.9rem; color: var(--text-heading); gap: 0.6rem;">
              <div><strong>Vessel:</strong> ${booking.boatName}</div>
              <div><strong>Package:</strong> ${booking.packageName}</div>
              <div><strong>Check-in:</strong> ${booking.checkin}</div>
              <div><strong>Check-out:</strong> ${booking.checkout}</div>
              <div><strong>Guests:</strong> ${booking.adults} Adults, ${booking.children} Kids</div>
              <div><strong>Meals:</strong> ${booking.mealPref}</div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background-color: #25D366; border-color: #25D366; color: #FFFFFF;">
              <i class="bi bi-whatsapp"></i> Instant Confirmation via WhatsApp Concierge
            </a>
            <button class="btn btn-outline" id="confirm-modal-ok">
              Done & Return to Website
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.getElementById('confirm-modal-close')?.addEventListener('click', close);
    document.getElementById('confirm-modal-ok')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  // --------------------------------------------------------------------------
  // 6. INITIALIZER
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    populateFormDropdowns();
    prefillFromURL();
    initBookingForm();
  });

})();
