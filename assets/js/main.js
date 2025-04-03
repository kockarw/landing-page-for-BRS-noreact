document.addEventListener('DOMContentLoaded', () => {
    // Wait for Lucide to be available
    const initializeLucide = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        } else {
            setTimeout(initializeLucide, 100);
        }
    };
    initializeLucide();

    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show button when page is scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    let currentStep = 0;
    let selectedService = null;
    let selectedBarber = null;
    let selectedDate = null;
    let selectedTime = null;

    const steps = ['serviceStep', 'barberStep', 'dateStep', 'timeStep', 'contactStep'];
    const stepIcons = document.querySelectorAll('.step-icon');

    const services = ['Saç Kesimi', 'Sakal Kesimi', 'Saç Boyama'];
    const barbers = ['Sefa', 'Ömer', 'Mustafa'];
    const times = ['08:00', '09:00 ', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    // Initialize calendar
    const calendarGrid = document.getElementById('calendarGrid');
    for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        dayElement.dataset.day = i - 1;
        calendarGrid.appendChild(dayElement);
    }

    function updateStepVisibility() {
        // Update all steps
        document.querySelectorAll('.booking-step').forEach((step, index) => {
            step.classList.remove('active');
            if (index === currentStep) {
                // Ensure the new step is visible before adding the active class
                setTimeout(() => {
                    step.classList.add('active');
                }, 50);
            }
        });
        
        // Update step indicators
        stepIcons.forEach((icon, index) => {
            icon.classList.toggle('active', index === currentStep);
        });
    }

    function updateBookingSummary() {
        document.getElementById('selectedService').textContent = selectedService !== null ? services[selectedService] : '-';
        document.getElementById('selectedBarber').textContent = selectedBarber !== null ? barbers[selectedBarber] : '-';
        document.getElementById('selectedDate').textContent = selectedDate !== null ? `March ${selectedDate + 1}, 2024` : '-';
        document.getElementById('selectedTime').textContent = selectedTime !== null ? times[selectedTime] : '-';
    }

    function autoSelectOption() {
        const options = {
            0: { selector: '.service-option', max: 3, variable: selectedService },
            1: { selector: '#barberStep .service-option', max: 3, variable: selectedBarber },
            2: { selector: '.calendar-day', max: 30, variable: selectedDate },
            3: { selector: '.time-slot', max: 6, variable: selectedTime }
        };

        const currentOptions = options[currentStep];
        if (currentOptions) {
            // Clear previous selection
            document.querySelectorAll(currentOptions.selector).forEach(el => {
                el.classList.remove('selected');
            });

            // Make new random selection
            const randomIndex = Math.floor(Math.random() * currentOptions.max);
            const selectedElement = document.querySelector(`${currentOptions.selector}[data-id="${randomIndex}"]`) ||
                                  document.querySelector(`${currentOptions.selector}[data-day="${randomIndex}"]`);
            
            if (selectedElement) {
                selectedElement.classList.add('selected');
                
                // Update selected values
                if (currentStep === 0) selectedService = randomIndex;
                if (currentStep === 1) selectedBarber = randomIndex;
                if (currentStep === 2) selectedDate = randomIndex;
                if (currentStep === 3) selectedTime = randomIndex;

                // Update booking summary
                updateBookingSummary();
            }
        }
    }

    // Auto advance steps
    setInterval(() => {
        currentStep = (currentStep + 1) % 5;
        updateStepVisibility();
    }, 6000);

    // Auto select options
    setInterval(autoSelectOption, 2000);

    // Initial setup
    updateStepVisibility();
    autoSelectOption();

    // Phone number formatting - SIMPLIFIED VERSION
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        // Only allow numbers
        input.addEventListener('keypress', function(e) {
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });
        
        // Format as user types
        input.addEventListener('input', function() {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            // Format as (XXX) XXX XXXX
            if (value.length >= 6) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            }
            
            this.value = value;
        });
    });

    // Email formatting
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            let value = this.value.toLowerCase();
            if (value && !value.includes('@')) {
                value += '@';
            }
            this.value = value;
        });
    });

    // Package information
    const packages = {
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

    // Contact form submission
    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                contactForm.reset();
            });
        }
        
        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Smooth scrolling for all anchor links
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".cta-button").forEach((button) => {
          button.addEventListener("click", function (e) {
            e.preventDefault(); // Sayfanın varsayılan atlamasını engelle
    
            const targetId = this.getAttribute("href"); // Hedef ID'yi al (#contact, #features vb.)
            const targetElement = document.querySelector(targetId);
    
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
    
              // URL'nin değişmesini engelle
              history.replaceState(null, null, " ");
            }
          });
        });
    });
});
  