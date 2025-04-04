/**
 * Pricing Module - Handles pricing-related functionality
 */

// Package information
export const packages = {
    'ekonomik': {
        name: 'Ekonomik Paket',
        price: '₺699/ay'
    },
    'orta': {
        name: 'Orta Paket',
        price: '₺1.299/ay'
    },
    'premium': {
        name: 'Premium Paket',
        price: '₺1.799/ay'
    },
    'premium-plus': {
        name: 'Premium Plus Paket',
        price: '₺2.899/ay'
    }
};

// Setup pricing buttons
export function setupPricingButtons() {
    // Get all price card buttons
    const priceCardButtons = document.querySelectorAll('.price-card .cta-button');

    // Add click event to each button
    priceCardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the package type from the data attribute
            const packageType = this.getAttribute('data-package');
            
            // Get the package info elements
            const packageNameElement = document.getElementById('packageName');
            const packagePriceElement = document.getElementById('packagePrice');
            const selectedPackageElement = document.querySelector('.selected-package');
            
            // Update the package info
            if (packageType && packages[packageType]) {
                // First hide the package info
                selectedPackageElement.style.display = 'none';
                selectedPackageElement.classList.remove('fade-in');
                
                // Update the content
                packageNameElement.textContent = packages[packageType].name;
                packagePriceElement.textContent = packages[packageType].price;
                
                // Scroll to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Show the package info with animation after a short delay
                setTimeout(() => {
                    selectedPackageElement.style.display = 'block';
                    
                    // Add a small delay before adding the fade-in class for better animation
                    setTimeout(() => {
                        selectedPackageElement.classList.add('fade-in');
                    }, 100);
                }, 500);
            }
        });
    });
} 