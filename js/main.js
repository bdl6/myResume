// Main JavaScript file - Data loading and rendering

/**
 * Main Application Initialization
 * Integrates all modules: navigation, animations, theme, PDF
 */
(function() {
  'use strict';

  /**
   * Initialize all application modules
   */
  function initApp() {
    console.log('Initializing Personal Resume Website...');
    
    // Load resume data
    loadResumeData();
    
    // Initialize animations (already auto-initialized in animations.js)
    if (typeof initAnimations === 'function') {
      console.log('✓ Animations module loaded');
    }
    
    // Navigation module (already auto-initialized in navigation.js)
    console.log('✓ Navigation module loaded');
    
    // Theme module (already auto-initialized in theme.js)
    if (window.themeManager) {
      console.log('✓ Theme module loaded');
    }
    
    // PDF module (already auto-initialized in pdf.js)
    if (window.PDFGenerator) {
      console.log('✓ PDF module loaded');
    }
    
    console.log('Application initialized successfully!');
  }

  // Initialize app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Export app initialization for external use
  window.ResumeApp = {
    init: initApp,
    loadData: loadResumeData
  };
})();

/**
 * Load resume data from JSON file and render to page
 */
async function loadResumeData() {
  try {
    const response = await fetch('data/resume.json');
    if (!response.ok) {
      throw new Error('Failed to load resume data');
    }
    const data = await response.json();
    renderResume(data);
  } catch (error) {
    console.error('Error loading resume data:', error);
    // If data loading fails, the hardcoded HTML content will be displayed
  }
}

/**
 * Render resume data to the page
 */
function renderResume(data) {
  // Render personal information
  if (data.personal) {
    renderPersonalInfo(data.personal);
  }

  // Render education background
  if (data.education && data.education.length > 0) {
    renderEducation(data.education);
  }

  // Render skills
  if (data.skills && Object.keys(data.skills).length > 0) {
    renderSkills(data.skills);
  }

  // Render projects
  if (data.projects && data.projects.length > 0) {
    renderProjects(data.projects);
  }

  // Render about section
  if (data.about && data.about.length > 0) {
    renderAbout(data.about);
  }
}

/**
 * Render personal information section
 */
function renderPersonalInfo(personal) {
  // Update avatar
  const avatarImg = document.querySelector('.hero-avatar img');
  if (avatarImg && personal.avatar) {
    avatarImg.src = personal.avatar;
    avatarImg.alt = `${personal.name}的头像`;
  }

  // Update name
  const nameElement = document.querySelector('.hero-name');
  if (nameElement && personal.name) {
    nameElement.textContent = personal.name;
  }

  // Update title
  const titleElement = document.querySelector('.hero-title');
  if (titleElement && personal.title) {
    titleElement.textContent = personal.title;
  }

  // Update intro
  const introElement = document.querySelector('.hero-intro');
  if (introElement && personal.intro) {
    introElement.textContent = personal.intro;
  }

  // Update contacts
  if (personal.contacts) {
    const emailLink = document.querySelector('.hero-contacts a[href^="mailto"]');
    if (emailLink && personal.contacts.email) {
      emailLink.href = `mailto:${personal.contacts.email}`;
    }

    const githubLink = document.querySelector('.hero-contacts a[href*="github"]');
    if (githubLink && personal.contacts.github) {
      githubLink.href = personal.contacts.github;
    }

    const linkedinLink = document.querySelector('.hero-contacts a[href*="linkedin"]');
    if (linkedinLink && personal.contacts.linkedin) {
      linkedinLink.href = personal.contacts.linkedin;
    }
  }
}

/**
 * Render education section
 */
function renderEducation(education) {
  const educationList = document.querySelector('.education-list');
  if (!educationList) return;

  educationList.innerHTML = '';

  education.forEach(edu => {
    const card = document.createElement('article');
    card.className = 'education-card animate-on-scroll';

    const timeRange = formatDateRange(edu.startDate, edu.endDate);
    const degreeText = edu.degree ? `${edu.major} - ${edu.degree}` : edu.major;

    card.innerHTML = `
      <div class="education-header">
        <div class="education-school">
          <h3 class="school-name">${edu.school}</h3>
          <p class="education-degree">${degreeText}</p>
        </div>
        <div class="education-time">${timeRange}</div>
      </div>
      ${edu.honors && edu.honors.length > 0 ? `
        <div class="education-honors">
          ${edu.honors.map(honor => `<span class="honor-badge">${honor}</span>`).join('')}
        </div>
      ` : ''}
    `;

    educationList.appendChild(card);
  });

  // Re-observe new elements for animations
  if (window.animationObserver) {
    document.querySelectorAll('.education-card.animate-on-scroll').forEach(el => {
      window.animationObserver.observe(el);
    });
  }
}

/**
 * Render skills section
 */
function renderSkills(skills) {
  const skillsGrid = document.querySelector('.skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = '';

  Object.entries(skills).forEach(([category, skillList]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category animate-on-scroll';

    categoryDiv.innerHTML = `
      <h3 class="skill-category-title">${category}</h3>
      <div class="skill-tags">
        ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    `;

    skillsGrid.appendChild(categoryDiv);
  });

  // Re-observe new elements for animations
  if (window.animationObserver) {
    document.querySelectorAll('.skill-category.animate-on-scroll').forEach(el => {
      window.animationObserver.observe(el);
    });
  }
}

/**
 * Render projects section
 */
function renderProjects(projects) {
  const projectsGrid = document.querySelector('.projects-grid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card animate-on-scroll';

    const timeRange = formatDateRange(project.startDate, project.endDate);

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.name}" loading="lazy">
        <div class="project-overlay">
          <div class="project-links">
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="查看演示">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>演示</span>
              </a>
            ` : ''}
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="查看代码">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>代码</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-meta">
          <span class="project-time">${timeRange}</span>
        </div>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    projectsGrid.appendChild(card);
  });

  // Re-observe new elements for animations
  if (window.animationObserver) {
    document.querySelectorAll('.project-card.animate-on-scroll').forEach(el => {
      window.animationObserver.observe(el);
    });
  }
}

/**
 * Render about section
 */
function renderAbout(aboutParagraphs) {
  const aboutParagraphsContainer = document.querySelector('.about-paragraphs');
  if (!aboutParagraphsContainer) return;

  aboutParagraphsContainer.innerHTML = '';

  aboutParagraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.className = 'about-paragraph';
    p.textContent = paragraph;
    aboutParagraphsContainer.appendChild(p);
  });
}

/**
 * Format date range for display
 */
function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : dateStr;
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : '至今';
  
  return `${start} - ${end}`;
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadResumeData);
} else {
  loadResumeData();
}
