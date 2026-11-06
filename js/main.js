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
      bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'EXPLORE MORE',
      ctaLink: '#aum-showcase'
    },
    {
      id: '02',
      line1: 'INVESTING IN',
      line2: 'GLOBAL TALENT',
      line3: '& INNOVATION',
      bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'DISCOVER IMPACT',
      ctaLink: '#countries-showcase'
    },
    {
      id: '03',
      line1: 'CATALYZING',
      line2: 'CLEAN ENERGY',
      line3: 'SOLUTIONS',
      bg: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'OUR STRATEGY',
      ctaLink: '#business-platforms'
    },
    {
      id: '04',
      line1: 'GENERATING',
      line2: 'SUSTAINABLE',
      line3: 'VALUE',
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      ctaText: 'VIEW PORTFOLIO',
      ctaLink: '#business-platforms'
    }
  ];

  let currentSlideIndex = 0;
  let slideTimer = null;

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlideIndex = index;
    const slide = slides[index];

    // Update active dot
    $('.slide-dot').removeClass('active');
    $(`.slide-dot[data-slide="${slide.id}"]`).addClass('active');

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
      $('.explore-btn').text(slide.ctaText).attr('href', slide.ctaLink);
      $heroTitle.fadeTo(220, 1);
    });

    // Update background image
    $heroContainer.css(
      'background-image',
      `linear-gradient(to bottom, rgba(10, 16, 26, 0.25) 0%, rgba(120, 70, 70, 0.15) 40%, rgba(15, 20, 30, 0.5) 80%, rgba(10, 15, 24, 0.95) 100%), url('${slide.bg}')`
    );
  }

  // Handle dot clicks
  $('.slide-dot').on('click', function () {
    const targetId = $(this).data('slide');
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
      $('.aum-intro-text').text('مبادلة هي شركة استثمار سيادي تدير محفظة متنوعة من الأصول في دولة الإمارات وخارجها.');
      $('.aum-sub-caption').text('الأصول المدارة');
      $('.countries-intro-text').text('نحن نركز على الجانب التجاري، ونوظف رأس المال عبر محفظتنا في قطاعات ومناطق جغرافية واعدة.');
      $('.know-more-btn').text('اعرف المزيد');
      $('.countries-sub-caption').text('شركات واستثمارات في أكثر من 80 دولة');
      $('.platform-vertical-text').text('منصات الأعمال');
    } else {
      $(this).text('عربي');
      $('html').attr('dir', 'ltr').attr('lang', 'en');
      $('.aum-intro-text').text('Mubadala is a sovereign investor managing a diverse portfolio of assets in the UAE and abroad.');
      $('.aum-sub-caption').text('Assets under management');
      $('.countries-intro-text').text('We are commercially-focused, deploying capital across our portfolio in promising sectors and geographies.');
      $('.know-more-btn').text('KNOW MORE');
      $('.countries-sub-caption').text('Businesses and investments in more than 80 countries');
      $('.platform-vertical-text').text('BUSINESS PLATFORMS');
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

  // ------------------------------------------------------------------
  // 9. Business Platforms Accordion & Image Switcher
  // ------------------------------------------------------------------
  $('.platform-accordion-header').on('click', function () {
    const $item = $(this).closest('.platform-accordion-item');
    const $body = $item.find('.platform-accordion-body');
    const newImg = $item.data('img');

    if ($item.hasClass('active')) {
      $body.slideUp(250);
      $item.removeClass('active');
    } else {
      // Collapse currently active item
      $('.platform-accordion-item.active')
        .removeClass('active')
        .find('.platform-accordion-body')
        .slideUp(250);

      // Expand clicked item
      $item.addClass('active');
      $body.slideDown(250);

      // Smoothly crossfade image on the left
      if (newImg) {
        $('#platformArchImg').fadeTo(180, 0.4, function () {
          $(this).attr('src', newImg).fadeTo(220, 1);
        });
      }
    }
  });

});
