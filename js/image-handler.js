// Image Loading Error Handler

/**
 * Initialize image error handling
 * Adds fallback placeholders for images that fail to load
 */
function initImageErrorHandling() {
  // Get all images on the page
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add error event listener
    img.addEventListener('error', handleImageError);
    
    // Add load event listener for lazy-loaded images
    img.addEventListener('load', handleImageLoad);
  });
}

/**
 * Handle image loading errors
 * @param {Event} event - Error event
 */
function handleImageError(event) {
  const img = event.target;
  
  // Prevent infinite loop if placeholder also fails
  if (img.classList.contains('error-placeholder')) {
    return;
  }
  
  // Mark as error placeholder
  img.classList.add('error-placeholder');
  
  // Create placeholder based on image type
  const altText = img.alt || '图片';
  
  // Set placeholder image or create SVG placeholder
  if (img.classList.contains('hero-avatar') || img.closest('.hero-avatar')) {
    // Avatar placeholder
    img.src = createAvatarPlaceholder();
    img.alt = '头像加载失败';
  } else if (img.classList.contains('project-image') || img.closest('.project-image')) {
    // Project image placeholder
    img.src = createProjectPlaceholder();
    img.alt = `${altText} - 图片加载失败`;
  } else {
    // Generic placeholder
    img.src = createGenericPlaceholder();
    img.alt = `${altText} - 图片加载失败`;
  }
  
  console.warn(`Image failed to load: ${event.target.src}`);
}

/**
 * Handle successful image load
 * @param {Event} event - Load event
 */
function handleImageLoad(event) {
  const img = event.target;
  img.classList.add('loaded');
}

/**
 * Create avatar placeholder as data URI
 * @returns {string} Data URI for avatar placeholder
 */
function createAvatarPlaceholder() {
  // SVG avatar placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#e2e8f0"/>
      <circle cx="100" cy="80" r="35" fill="#94a3b8"/>
      <path d="M 100 120 Q 60 120 40 160 L 160 160 Q 140 120 100 120 Z" fill="#94a3b8"/>
      <text x="100" y="190" font-family="Arial" font-size="12" fill="#64748b" text-anchor="middle">头像加载失败</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/**
 * Create project image placeholder as data URI
 * @returns {string} Data URI for project placeholder
 */
function createProjectPlaceholder() {
  // SVG project placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f1f5f9"/>
      <rect x="150" y="100" width="100" height="80" rx="5" fill="#cbd5e1"/>
      <circle cx="180" cy="130" r="8" fill="#94a3b8"/>
      <polyline points="150,180 170,160 190,170 210,150 250,180" fill="none" stroke="#94a3b8" stroke-width="3"/>
      <text x="200" y="220" font-family="Arial" font-size="14" fill="#64748b" text-anchor="middle">图片加载失败</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/**
 * Create generic placeholder as data URI
 * @returns {string} Data URI for generic placeholder
 */
function createGenericPlaceholder() {
  // SVG generic placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f8fafc"/>
      <rect x="160" y="110" width="80" height="60" rx="4" fill="#e2e8f0"/>
      <circle cx="185" cy="135" r="6" fill="#cbd5e1"/>
      <polyline points="160,170 175,155 190,165 205,150 240,170" fill="none" stroke="#cbd5e1" stroke-width="2"/>
      <text x="200" y="200" font-family="Arial" font-size="12" fill="#94a3b8" text-anchor="middle">图片加载失败</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/**
 * Observe dynamically added images
 * Uses MutationObserver to handle images added after page load
 */
function observeDynamicImages() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          // Check if the node itself is an image
          if (node.tagName === 'IMG') {
            node.addEventListener('error', handleImageError);
            node.addEventListener('load', handleImageLoad);
          }
          // Check for images within the added node
          const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
          images.forEach(img => {
            img.addEventListener('error', handleImageError);
            img.addEventListener('load', handleImageLoad);
          });
        }
      });
    });
  });
  
  // Observe the entire document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initImageErrorHandling();
    observeDynamicImages();
  });
} else {
  initImageErrorHandling();
  observeDynamicImages();
}
