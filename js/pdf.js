/**
 * PDF Generation Module
 * Handles PDF generation and download functionality
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPDF);
  } else {
    initPDF();
  }

  function initPDF() {
    const pdfButton = document.getElementById('pdfDownload');
    
    if (pdfButton) {
      pdfButton.addEventListener('click', generatePDF);
    }
  }

  /**
   * Generate and download PDF
   */
  function generatePDF() {
    // Check if html2pdf is available
    if (typeof html2pdf === 'undefined') {
      console.error('html2pdf library not loaded');
      alert('PDF生成功能暂时不可用，请刷新页面重试。');
      return;
    }

    const button = document.getElementById('pdfDownload');
    const buttonText = button.querySelector('span');
    const originalText = buttonText.textContent;

    // Show loading state
    button.disabled = true;
    button.classList.add('loading');
    buttonText.textContent = '生成中...';

    // Get the content to convert
    const element = document.getElementById('resume-content');
    
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove interactive elements that shouldn't be in PDF
    const interactiveElements = clone.querySelectorAll('.project-overlay, .project-links');
    interactiveElements.forEach(el => el.remove());

    // PDF configuration options
    const opt = {
      margin: [10, 10, 10, 10],
      filename: '个人简历.pdf',
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.section'
      }
    };

    // Generate PDF
    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        // Reset button state
        button.disabled = false;
        button.classList.remove('loading');
        buttonText.textContent = originalText;
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
        alert('PDF生成失败，请重试。');
        
        // Reset button state
        button.disabled = false;
        button.classList.remove('loading');
        buttonText.textContent = originalText;
      });
  }

  // Export for potential external use
  window.PDFGenerator = {
    generate: generatePDF
  };
})();
