// ========== Animation Control Logic ==========

/**
 * Throttle function for performance optimization
 * Limits the rate at which a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Throttled function
 */
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

/**
 * Initialize all animations on page load
 */
function initAnimations() {
  // Trigger hero section animations on page load
  initHeroAnimations();
  
  // Initialize scroll-triggered animations
  initScrollAnimations();
}

/**
 * Hero Section Load Animations
 * Triggers sequential animations for hero section elements
 */
function initHeroAnimations() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerHeroAnimations);
  } else {
    triggerHeroAnimations();
  }
}

function triggerHeroAnimations() {
  // Get all hero section elements
  const heroAvatar = document.querySelector('.hero-avatar');
  const heroName = document.querySelector('.hero-name');
  const heroTitle = document.querySelector('.hero-title');
  const heroIntro = document.querySelector('.hero-intro');
  const heroContacts = document.querySelector('.hero-contacts');
  
  // Trigger animations sequentially
  const elements = [heroAvatar, heroName, heroTitle, heroIntro, heroContacts];
  
  elements.forEach(element => {
    if (element) {
      // Small delay to ensure styles are loaded
      setTimeout(() => {
        element.classList.add('animate');
      }, 100);
    }
  });
}

/**
 * Scroll-Triggered Animations
 * Uses Intersection Observer API to trigger animations when elements enter viewport
 */
function initScrollAnimations() {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately for browsers without support
    showAllAnimatedElements();
    return;
  }
  
  // Observer options
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters viewport
  };
  
  // Create observer instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animate class when element enters viewport
        entry.target.classList.add('animate');
        
        // Optional: Unobserve after animation is triggered to improve performance
        // Uncomment the line below if you want one-time animations only
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Store observer globally for dynamic content
  window.animationObserver = observer;
  
  // Observe all elements with .animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
  
  // Observe all education cards for slide-in animations
  document.querySelectorAll('.education-card').forEach(element => {
    observer.observe(element);
  });
  
  // Observe all skill categories for pop-in animations
  document.querySelectorAll('.skill-category').forEach(element => {
    observer.observe(element);
  });
  
  // Observe all project cards for staggered fade-in animations
  document.querySelectorAll('.project-card').forEach((element, index) => {
    // Add staggered delay for sequential animation
    element.style.transitionDelay = `${index * 150}ms`;
    observer.observe(element);
  });
  
  // Observe about section content for fade-in and paragraph animations
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    observer.observe(aboutContent);
  }
}

/**
 * Fallback function for browsers without Intersection Observer support
 * Shows all animated elements immediately
 */
function showAllAnimatedElements() {
  const animatedSelectors = [
    '.animate-on-scroll',
    '.education-card',
    '.skill-category',
    '.project-card',
    '.about-content'
  ];
  
  animatedSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('animate');
    });
  });
}

/**
 * Stagger Animation Helper
 * Adds staggered animation delays to child elements
 * @param {string} parentSelector - CSS selector for parent element
 * @param {string} childSelector - CSS selector for child elements
 * @param {number} delayIncrement - Delay increment in milliseconds
 */
function staggerAnimation(parentSelector, childSelector, delayIncrement = 100) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  
  const children = parent.querySelectorAll(childSelector);
  children.forEach((child, index) => {
    child.style.animationDelay = `${index * delayIncrement}ms`;
  });
}

// Initialize animations when script loads
initAnimations();
