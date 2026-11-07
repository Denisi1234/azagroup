/**
 * Aza Group Website Interaction Scripts
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
      line1: 'CLOSING',
      line2: 'THE DIGITAL',
      line3: 'DIVIDE',
      linkText: 'Explore our products',
      linkHref: '#products',
      bg: 'assert/banner/banner3.webp'
    },
    {
      id: '02',
      line1: 'ACCOUNTING',
      line2: 'MADE',
      line3: 'EASIER',
      linkText: 'Visit Aza Akaunting',
      linkHref: 'https://www.azakaunting.com'
    },
    {
      id: '03',
      line1: 'FIND YOUR',
      line2: 'NEXT STAY',
      line3: 'IN TANZANIA',
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
      $('.explore-btn').attr('href', slide.linkHref).text(slide.linkText);
      $heroTitle.fadeTo(220, 1);
    });

    // Update background image
    const backgroundImage = slide.bg
      ? `url("${new URL(slide.bg, document.baseURI).href}")`
      : 'none';
    $heroContainer.css('--hero-image', backgroundImage);
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

    $('#closeMenuBtn, #menuOverlay .menu-nav-links a').on('click', function () {
      menu.close();
      document.body.classList.remove('menu-open');
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
    if (e.key === 'Escape' && $('#searchOverlay').is(':visible')) {
      $('#searchOverlay').fadeOut(150);
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
    if (!href.startsWith('#')) return;
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

});
