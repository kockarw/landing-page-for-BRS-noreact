/**
 * Main JavaScript file - Imports and initializes all modules
 */

// Import modules
import { initializeLucide, setupBackToTop, setupSmoothScrolling } from './modules/ui.js';
import { initializeCalendar, setupAutoAdvancement } from './modules/booking.js';
import { setupContactForm } from './modules/form.js';
import { setupPricingButtons } from './modules/pricing.js';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    initializeLucide();
    setupBackToTop();
    setupSmoothScrolling();
    
    // Initialize booking functionality
    initializeCalendar();
    setupAutoAdvancement();
    
    // Initialize form functionality
    setupContactForm();
    
    // Initialize pricing functionality
    setupPricingButtons();
});
  