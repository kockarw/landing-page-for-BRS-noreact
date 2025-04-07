/**
 * Main JavaScript file - Imports and initializes all modules
 */

// Import modules
import { initializeLucide, setupBackToTop, setupSmoothScrolling } from './modules/ui.js';
import { initializeCalendar, setupAutoAdvancement } from './modules/booking.js';
import { setupContactForm } from './modules/form.js';
import { setupPricingButtons } from './modules/pricing.js';

// Store cleanup function
let cleanupAutoAdvancement = null;

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    initializeLucide();
    setupBackToTop();
    setupSmoothScrolling();
    
    // Initialize booking functionality
    initializeCalendar();
    cleanupAutoAdvancement = setupAutoAdvancement();
    
    // Initialize form functionality
    setupContactForm();
    
    // Initialize pricing functionality
    setupPricingButtons();

    // Add event listener for features section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If features section is visible, start auto advancement
                if (!cleanupAutoAdvancement) {
                    cleanupAutoAdvancement = setupAutoAdvancement();
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        observer.observe(featuresSection);
    }
});
  