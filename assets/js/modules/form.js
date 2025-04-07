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

    // If form doesn't exist, return
    if (!form) {
        console.error('Form element not found');
        return;
    }

    console.log('Form element found:', form);

    // Add click event listener to the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            console.log('Submit button clicked');
            e.preventDefault();
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
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        // Validate phone format
        const phoneRegex = /^\(\d{3}\) \d{3} \d{4}$/;
        if (!phoneRegex.test(formValues.phone)) {
            console.log('Validation failed: Invalid phone format');
            alert('Lütfen geçerli bir telefon numarası girin.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            console.log('Validation failed: Invalid email format');
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }

        console.log('Form validation passed');

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

        // Reset form
        form.reset();
    });

    // Handle popup close button
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }
} 