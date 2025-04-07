/**
 * Form Module - Handles form-related functionality
 */

// Initialize form functionality
export function setupContactForm() {
    console.log('Setting up contact form...');
    
    // Get form elements
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('closePopup');
    const packageName = document.getElementById('packageName');
    const packagePrice = document.getElementById('packagePrice');
    const popupMessage = document.querySelector('.success-popup p');
    const backToTopButton = document.getElementById('backToTop');
    const warningPopup = document.getElementById('warningPopup');
    const warningMessage = document.getElementById('warningMessage');
    const closeWarningBtn = document.getElementById('closeWarningPopup');

    // If form doesn't exist, return
    if (!form) {
        console.error('Form element not found');
        return;
    }

    console.log('Form element found:', form);

    // Function to show warning popup
    function showWarning(message) {
        if (warningPopup && warningMessage) {
            warningMessage.textContent = message;
            warningPopup.style.display = 'flex';
            warningPopup.classList.add('show');
            
            // Hide warning popup after 5 seconds
            setTimeout(() => {
                warningPopup.classList.remove('show');
                setTimeout(() => {
                    warningPopup.style.display = 'none';
                }, 300);
            }, 5000);
        }
    }

    // Add click event listener to the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            console.log('Submit button clicked');
            e.preventDefault();
            
            // Check if a package is selected first
            if (packageName.textContent === '-' || packagePrice.textContent === '-') {
                console.log('Validation failed: No package selected');
                showWarning('Lütfen bir paket seçin.');
                return;
            }
            
            form.dispatchEvent(new Event('submit'));
        });
    }

    // Format phone number as user types
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substring(0, 10);
            
            if (value.length >= 6) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            }
            
            this.value = value;
        });
    }

    // Format email on blur
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            let value = this.value.toLowerCase().trim();
            if (value && !value.includes('@')) {
                value += '@';
            }
            this.value = value;
        });
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        console.log('Form submit event triggered');
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        console.log('Form values:', formValues);

        // Validate form
        if (!formValues.businessName || !formValues.phone || !formValues.email) {
            console.log('Validation failed: Empty fields');
            showWarning('Lütfen tüm alanları doldurun.');
            return;
        }

        // Validate phone format
        const phoneRegex = /^\(\d{3}\) \d{3} \d{4}$/;
        if (!phoneRegex.test(formValues.phone)) {
            console.log('Validation failed: Invalid phone format');
            showWarning('Lütfen geçerli bir telefon numarası girin.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            console.log('Validation failed: Invalid email format');
            showWarning('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }

        console.log('Form validation passed');

        // Update popup message with selected package
        if (popupMessage && packageName) {
            popupMessage.innerHTML = `<strong>${packageName.textContent}</strong> ile ilgili talebiniz alındı, en kısa sürede iletişime geçeceğiz.`;
        }

        // Show success popup
        if (popup) {
            console.log('Showing success popup');
            popup.style.display = 'flex';
            popup.classList.add('show');
            
            // Hide popup after 5 seconds
            setTimeout(() => {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            }, 5000);
        }

        // Reset form and package selection
        form.reset();
        if (packageName) packageName.textContent = '-';
        if (packagePrice) packagePrice.textContent = '-';
        
        // Hide selected package section
        const selectedPackage = document.querySelector('.selected-package');
        if (selectedPackage) {
            selectedPackage.style.display = 'none';
        }

        // Trigger back to top button click
        if (backToTopButton) {
            console.log('Triggering back to top button click');
            backToTopButton.click();
        }
    });

    // Handle popup close buttons
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }

    if (closeWarningBtn && warningPopup) {
        closeWarningBtn.addEventListener('click', function() {
            warningPopup.classList.remove('show');
            setTimeout(() => {
                warningPopup.style.display = 'none';
            }, 300);
        });
    }
} 