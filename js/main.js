/* ==========================================================
   GoDrive Taxi — Luxury Executive Landing Page
   JavaScript — Interactions & Animations
   ========================================================== */

(function () {
  'use strict';

  // ==================== NAVBAR ====================

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('a');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ==================== INTERSECTION OBSERVER (Scroll Reveal) ====================

  const animateElements = document.querySelectorAll('.animate-in, .animate-in-left, .animate-in-right');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animateElements.forEach((el) => observer.observe(el));
  }

  // ==================== HERO FORM INTERACTION ====================

  const cotizarBtn = document.querySelector('.btn-primary');
  const origenInput = document.getElementById('origen');
  const destinoInput = document.getElementById('destino');

  cotizarBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    const origen = origenInput?.value.trim();
    const destino = destinoInput?.value.trim();

    if (!origen || !destino) {
      // Shake animation on empty fields
      const form = document.querySelector('.glass-form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 500);

      // Highlight empty fields
      if (!origen) origenInput?.focus();
      return;
    }

    // Build WhatsApp message
    const message =
      `Hola GoDrive! Quisiera cotizar un viaje:%0A%0A` +
      `📍 Origen: ${origen}%0A` +
      `📍 Destino: ${destino}`;

    window.open(`https://wa.me/584161234567?text=${message}`, '_blank');
  });

  // Enter key submits form
  document.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') cotizarBtn?.click();
    });
  });

  // Add shake styles dynamically
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
    .shake {
      animation: shake 0.5s var(--ease-smooth);
    }
  `;
  document.head.appendChild(shakeStyle);

  // ==================== BENTO CARD CLICKS ====================

  // WhatsApp card navigates
  document.querySelector('.bento-whatsapp')?.addEventListener('click', () => {
    window.open('https://wa.me/584161234567', '_blank');
  });

  // Instagram card navigates
  document.querySelector('.bento-instagram')?.addEventListener('click', () => {
    window.open('https://instagram.com/godrive.taxi', '_blank');
  });

  // TikTok card navigates
  document.querySelector('.bento-tiktok')?.addEventListener('click', () => {
    window.open('https://tiktok.com/@godrive.taxi', '_blank');
  });

  // ==================== TRUST COUNTER (Optional Enhancement) ====================

  // Simple counter animation for credibility
  // Only triggers once when visible
  const trustSection = document.querySelector('.trust-section');
  if (trustSection) {
    const trustObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trustObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    trustObserver.observe(trustSection);
  }

  // ==================== SMOOTH SCROLL FOR NAV LINKS ====================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==================== RIPPLE EFFECT ON BUTTONS ====================

  document.querySelectorAll('.btn-primary, .btn-whatsapp').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Ripple CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .btn-primary, .btn-whatsapp, .btn-nav {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    }
    @keyframes rippleAnim {
      to {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ==================== LOGO LOAD HANDLER ====================

  const logo = document.querySelector('.nav-logo img');
  if (logo) {
    logo.addEventListener('load', () => {
      logo.style.opacity = '1';
    });
    // Ensure visibility even if already loaded
    if (logo.complete) logo.style.opacity = '1';
  }

})();
