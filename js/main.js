/**
 * Mubadala Website Interaction Scripts
 * Powered by jQuery 3.7.1
 */

$(document).ready(function () {
  'use strict';

  // ------------------------------------------------------------------
  // 1. Hero Carousel Slide Configuration
  // ------------------------------------------------------------------
  const slides = [
    {
      id: '01',
      line1: 'BOLD MOVES',
      line2: 'THAT SHAPE',
      line3: 'THE FUTURE',
      bg: 'assert/banner/banner3.webp'
    },
    {
      id: '02',
      line1: 'INVESTING IN',
      line2: 'GLOBAL TALENT',
      line3: '& INNOVATION',
      bg: 'assert/banner/aza_banner.jpg'
    },
    {
      id: '03',
      line1: 'GENERATING',
      line2: 'SUSTAINABLE',
      line3: 'VALUE',
      bg: 'assert/banner/aza_banner_image2.webp'
    }
  ];

  let currentSlideIndex = 0;
  let slideTimer = null;

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlideIndex = index;
    const slide = slides[index];

    // Update active dot
    $('.slide-dot').removeClass('active').removeAttr('aria-current');
    $(`.slide-dot[data-slide="${slide.id}"]`).addClass('active').attr('aria-current', 'true');

    // Update slide number indicator
    $('#slideIndex').text(slide.id);

    // Update progress line inner width
    const progressPercent = ((index + 1) / slides.length) * 100;
    $('.progress-bar-inner').css('width', `${progressPercent}%`);

    // Fade transition for titles and background
    const $heroContainer = $('.hero-container');
    const $heroTitle = $('.hero-title');

    $heroTitle.stop(true, true).fadeTo(180, 0.2, function () {
      $('.line-1').text(slide.line1);
      $('.line-2').text(slide.line2);
      $('.line-3').text(slide.line3);
      $heroTitle.fadeTo(220, 1);
    });

    // Update background image
    const imageUrl = new URL(slide.bg, document.baseURI);
    $heroContainer.css('--hero-image', `url("${imageUrl.href}")`);
  }

  // Handle dot clicks
  $('.slide-dot').on('click', function () {
    const targetId = $(this).attr('data-slide');
    const index = slides.findIndex((s) => s.id === targetId);
    if (index !== -1) {
      goToSlide(index);
      resetAutoSlide();
    }
  });

  // Auto-advance slides every 7 seconds
  function startAutoSlide() {
    slideTimer = setInterval(function () {
      let nextIndex = (currentSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 7000);
  }

  function resetAutoSlide() {
    clearInterval(slideTimer);
    startAutoSlide();
  }

  startAutoSlide();

  // ------------------------------------------------------------------
  // 2. Fullscreen Menu Overlay Toggle
  // ------------------------------------------------------------------
  $('#hamburgerBtn').on('click', function (e) {
    e.preventDefault();
    $('#menuOverlay').css('display', 'flex').hide().fadeIn(250);
    $('body').css('overflow', 'hidden');
  });

  $('#closeMenuBtn, .menu-nav-links a').on('click', function () {
    $('#menuOverlay').fadeOut(200, function () {
      $('body').css('overflow', 'auto');
    });
  });

  // ------------------------------------------------------------------
  // 3. Search Bar Overlay Toggle
  // ------------------------------------------------------------------
  $('#searchBtn').on('click', function (e) {
    e.preventDefault();
    $('#searchOverlay').fadeIn(200);
    $('#searchInput').focus();
    $('body').css('overflow', 'hidden');
  });

  $('#closeSearchBtn').on('click', function () {
    $('#searchOverlay').fadeOut(150, function () {
      $('body').css('overflow', 'auto');
    });
  });

  // ------------------------------------------------------------------
  // 4. Keyboard Shortcuts (Escape Key)
  // ------------------------------------------------------------------
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#searchOverlay').fadeOut(150);
      $('#menuOverlay').fadeOut(200);
      $('body').css('overflow', 'auto');
    }
  });

  // ------------------------------------------------------------------
  // 5. Arabic / English Language Switcher Demo
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
  // 6. Accessibility Floating Button Notification
  // ------------------------------------------------------------------
  $('#accessibilityBtn').on('click', function () {
    const isEnlarged = $('body').hasClass('high-contrast-mode');
    if (!isEnlarged) {
      $('body').addClass('high-contrast-mode');
      alert('Accessibility mode enabled: Higher contrast fonts active.');
    } else {
      $('body').removeClass('high-contrast-mode');
      alert('Standard mode restored.');
    }
  });

  // ------------------------------------------------------------------
  // 7. Smooth Scrolling for Navigation Anchors
  // ------------------------------------------------------------------
  $('a[href^="#"]').on('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      return;
    }
    const target = $(href);
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate(
        {
          scrollTop: target.offset().top - 40
        },
        700
      );
    }
  });

  // Newsletter delivery needs a subscription service before it can accept signups.
  $('#footerSubscribe').on('submit', function (e) {
    e.preventDefault();
    $('#footerSubscribeStatus').text('Newsletter signup is currently unavailable. Please try again later.');
  });

});
