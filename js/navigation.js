// Navigation Bar Functionality

(function() {
  'use strict';

  // DOM Elements
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  // ========== Mobile Menu Toggle ==========
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  // Close mobile menu when clicking outside
  function closeMobileMenu(event) {
    if (window.innerWidth <= 767) {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  }

  // Close mobile menu when clicking on a nav link
  function handleNavLinkClick() {
    if (window.innerWidth <= 767) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // ========== Smooth Scrolling ==========
  function smoothScroll(event) {
    event.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active link
      updateActiveLink(targetId);
      
      // Close mobile menu if open
      handleNavLinkClick();
    }
  }

  // ========== Active Link Highlighting ==========
  function updateActiveLink(targetId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  // Scroll spy - highlight active section on scroll
  function handleScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        updateActiveLink(`#${sectionId}`);
      }
    });
  }

  // Throttle function for scroll performance
  function throttle(func, wait) {
    let timeout;
    let lastRan;
    
    return function executedFunction(...args) {
      const context = this;
      
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if ((Date.now() - lastRan) >= wait) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, wait - (Date.now() - lastRan));
      }
    };
  }

  // ========== Event Listeners ==========
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', closeMobileMenu);

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Scroll spy with throttling for performance
  const throttledScrollSpy = throttle(handleScrollSpy, 100);
  window.addEventListener('scroll', throttledScrollSpy);

  // Update on page load
  window.addEventListener('load', handleScrollSpy);

  // Handle window resize - close mobile menu if resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

})();
