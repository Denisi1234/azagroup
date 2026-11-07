/**
 * Aza Group - Corporate Calmness & Subtle Interactions
 * Engineered for clean, deliberate brand poise (like Tata / luxury industrial conglomerates)
 */

$(document).ready(function () {
  'use strict';

  // ------------------------------------------------------------------
  // 1. Hero Carousel Slide Configuration (Deliberate & Smooth)
  // ------------------------------------------------------------------
  const slides = [
    {
      id: '01',
      line1: 'CLOSING',
      line2: 'THE DIGITAL',
      line3: 'DIVIDE',
      subtitle: 'Engineering sovereign digital infrastructure, fintech, and enterprise software for Tanzania.',
      linkText: 'Explore our products',
      linkHref: '#products',
      bg: 'assert/banner/banner3.webp'
    },
    {
      id: '02',
      line1: 'ACCOUNTING',
      line2: 'MADE',
      line3: 'EASIER',
      subtitle: 'Modern business accounting and financial workflows tailored for Tanzanian enterprises.',
      linkText: 'Visit Aza Akaunting',
      linkHref: 'https://www.azakaunting.com',
      bg: 'assert/banner/aza_banner_akaunting.jpg'
    },
    {
      id: '03',
      line1: 'FIND YOUR',
      line2: 'NEXT STAY',
      line3: 'IN TANZANIA',
      subtitle: 'Seamless digital accommodation discovery and booking throughout East Africa.',
      linkText: 'Visit Fastnetstays',
      linkHref: 'https://www.fastnetstays.com',
      bg: 'assert/banner/aza_banner_image2.webp'
    }
  ];

  let currentSlideIndex = 0;
  let slideTimer = null;

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlideIndex = index;
    const slide = slides[index];

    // Update active dot with calm visual feedback
    $('.slide-dot').removeClass('active').removeAttr('aria-current');
    $(`.slide-dot[data-slide="${slide.id}"]`).addClass('active').attr('aria-current', 'true');

    // Update slide number indicator
    $('#slideIndex').text(slide.id);

    // Update progress line smoothly
    const progressPercent = ((index + 1) / slides.length) * 100;
    $('.progress-bar-inner').css('width', `${progressPercent}%`);

    // Calm fade transition without snappy visual jumps
    const $heroContainer = $('.hero-container');
    const $heroTitle = $('.hero-title');
    const $heroSub = $('.hero-subtitle');
    const $exploreBtn = $('.explore-btn');

    $heroTitle.add($heroSub).add($exploreBtn).stop(true, true).fadeTo(350, 0.15, function () {
      $('.line-1').text(slide.line1);
      $('.line-2').text(slide.line2);
      $('.line-3').text(slide.line3);
      $heroSub.text(slide.subtitle);
      $exploreBtn.attr('href', slide.linkHref).text(slide.linkText);
      $heroTitle.add($heroSub).add($exploreBtn).fadeTo(450, 1);
    });

    // Update background image smoothly
    if (slide.bg) {
      const bgUrl = `url("${new URL(slide.bg, document.baseURI).href}")`;
      $heroContainer.css('--hero-image', bgUrl);
    }
  }

  // Handle dot clicks
  $('.slide-dot').on('click', function () {
    const targetId = $(this).attr('data-slide');
    const index = slides.findIndex((s) => s.id === targetId);
    if (index !== -1 && index !== currentSlideIndex) {
      goToSlide(index);
      resetAutoSlide();
    }
  });

  // Auto-advance slides every 8 seconds (deliberate, steady pacing)
  function startAutoSlide() {
    slideTimer = setInterval(function () {
      let nextIndex = (currentSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 8000);
  }

  function resetAutoSlide() {
    clearInterval(slideTimer);
    startAutoSlide();
  }

  if ($('.hero-container').length) startAutoSlide();

  // ------------------------------------------------------------------
  // 2. Fullscreen Menu Overlay Toggle
  // ------------------------------------------------------------------
  const menu = document.getElementById('menuOverlay');
  const menuButton = document.getElementById('hamburgerBtn');

  if (menu && menuButton) {
    menuButton.addEventListener('click', function () {
      menu.showModal();
      menuButton.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    });

    $('#closeMenuBtn').on('click', function () {
      menu.close();
    });

    // Smooth navigation click handling from within overlay
    $('#menuOverlay .menu-nav-links a').on('click', function (e) {
      const href = this.getAttribute('href');
      menu.close();
      document.body.classList.remove('menu-open');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target.length) {
          setTimeout(function () {
            $('html, body').stop().animate(
              { scrollTop: target.offset().top - 30 },
              700,
              'swing'
            );
          }, 150);
        }
      }
    });

    menu.addEventListener('close', function () {
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  }

  // ------------------------------------------------------------------
  // 3. Search Bar Overlay Toggle
  // ------------------------------------------------------------------
  $('#searchBtn').on('click', function (e) {
    e.preventDefault();
    $('#searchOverlay').fadeIn(250);
    $('#searchInput').focus();
    $('body').css('overflow', 'hidden');
  });

  $('#closeSearchBtn').on('click', function () {
    $('#searchOverlay').fadeOut(200, function () {
      $('body').css('overflow', 'auto');
    });
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('#searchOverlay').is(':visible')) {
      $('#searchOverlay').fadeOut(200);
      $('body').css('overflow', 'auto');
    }
  });

  // ------------------------------------------------------------------
  // 4. Arabic / English Switcher
  // ------------------------------------------------------------------
  $('#langSwitch').on('click', function (e) {
    e.preventDefault();
    const currentText = $(this).text().trim();
    if (currentText === 'عربي') {
      $(this).text('EN');
      $('html').attr('dir', 'rtl').attr('lang', 'ar');
    } else {
      $(this).text('عربي');
      $('html').attr('dir', 'ltr').attr('lang', 'en');
    }
  });

  // ------------------------------------------------------------------
  // 5. Subtle Accessibility Mode (Polished In-Page Notice, No Alert Box)
  // ------------------------------------------------------------------
  $('#accessibilityBtn').on('click', function () {
    $('body').toggleClass('high-contrast-mode');
    const isEnlarged = $('body').hasClass('high-contrast-mode');
    this.setAttribute('aria-pressed', isEnlarged ? 'true' : 'false');
  });

  // ------------------------------------------------------------------
  // 6. Smooth Native Anchor Scrolling (Calm Easing)
  // ------------------------------------------------------------------
  $('a[href^="#"]:not([href="#"])').on('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = $(href);
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate(
        { scrollTop: target.offset().top - 30 },
        800,
        'swing'
      );
    }
  });

});
