/**
 * Theme Switching Logic
 * Handles light/dark mode toggle with localStorage persistence and system preference detection
 */

(function() {
  'use strict';

  // Theme constants
  const THEME_KEY = 'theme-preference';
  const DARK_MODE_CLASS = 'dark-mode';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  /**
   * Get the current theme from localStorage or system preference
   * @returns {string} 'light' or 'dark'
   */
  function getPreferredTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }

    // Default to light theme
    return THEME_LIGHT;
  }

  /**
   * Apply theme to the document
   * @param {string} theme - 'light' or 'dark'
   */
  function applyTheme(theme) {
    if (theme === THEME_DARK) {
      document.documentElement.classList.add(DARK_MODE_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_MODE_CLASS);
    }
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - 'light' or 'dark'
   */
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Get current active theme
   * @returns {string} 'light' or 'dark'
   */
  function getCurrentTheme() {
    return document.documentElement.classList.contains(DARK_MODE_CLASS) ? THEME_DARK : THEME_LIGHT;
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    applyTheme(newTheme);
    saveTheme(newTheme);
    updateThemeButton(newTheme);
  }

  /**
   * Update theme toggle button appearance
   * @param {string} theme - 'light' or 'dark'
   */
  function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    if (theme === THEME_DARK) {
      // Show moon icon in dark mode
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', '切换到浅色模式');
    } else {
      // Show sun icon in light mode
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', '切换到深色模式');
    }
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Apply saved or preferred theme immediately to prevent flash
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setupThemeToggle(preferredTheme);
      });
    } else {
      setupThemeToggle(preferredTheme);
    }
  }

  /**
   * Setup theme toggle button event listener
   * @param {string} currentTheme - Current active theme
   */
  function setupThemeToggle(currentTheme) {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
      // Update button appearance
      updateThemeButton(currentTheme);
      
      // Add click event listener
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  /**
   * Listen for system theme changes
   */
  function watchSystemTheme() {
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Modern browsers
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', function(e) {
          // Only apply system theme if user hasn't set a preference
          if (!localStorage.getItem(THEME_KEY)) {
            const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
            applyTheme(newTheme);
            updateThemeButton(newTheme);
          }
        });
      }
      // Older browsers
      else if (darkModeQuery.addListener) {
        darkModeQuery.addListener(function(e) {
          if (!localStorage.getItem(THEME_KEY)) {
            const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
            applyTheme(newTheme);
            updateThemeButton(newTheme);
          }
        });
      }
    }
  }

  // Initialize theme system
  initTheme();
  watchSystemTheme();

  // Export functions for external use if needed
  window.themeManager = {
    toggle: toggleTheme,
    set: function(theme) {
      applyTheme(theme);
      saveTheme(theme);
      updateThemeButton(theme);
    },
    get: getCurrentTheme
  };

})();
