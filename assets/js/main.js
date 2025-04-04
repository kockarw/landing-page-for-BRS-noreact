/**
 * Main JavaScript file - Imports and initializes all modules
 */

// Import modules
import { initializeLucide, setupBackToTop, setupSmoothScrolling } from './modules/ui.js';
import { initializeCalendar, setupAutoAdvancement } from './modules/booking.js';
import { setupPhoneFormatting, setupEmailFormatting, setupContactForm } from './modules/form.js';
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
    setupPhoneFormatting();
    setupEmailFormatting();
    setupContactForm();
    
    // Initialize pricing functionality
    setupPricingButtons();
});
  