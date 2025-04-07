/**
 * Booking Module - Handles booking-related functionality
 */

// Booking data
export const bookingData = {
    currentStep: 0,
    selectedService: null,
    selectedBarber: null,
    selectedDate: null,
    selectedTime: null,
    steps: ['serviceStep', 'barberStep', 'dateStep', 'timeStep', 'contactStep'],
    services: ['Saç Kesimi', 'Sakal Kesimi', 'Saç Boyama'],
    barbers: ['Sefa', 'Ömer', 'Mustafa'],
    times: ['08:00', '09:00 ', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
};

// Initialize calendar
export function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        dayElement.dataset.day = i - 1;
        calendarGrid.appendChild(dayElement);
    }
}

// Update step visibility
export function updateStepVisibility() {
    const stepIcons = document.querySelectorAll('.step-icon');
    
    // Update all steps
    document.querySelectorAll('.booking-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index === bookingData.currentStep) {
            // Ensure the new step is visible before adding the active class
            setTimeout(() => {
                step.classList.add('active');
                
                // If we're on the contact step, auto-click inputs and submit button
                if (index === 4) { // contactStep is index 4
                    // Click on name input first
                    setTimeout(() => {
                        const nameInput = document.getElementById('name');
                        if (nameInput) {
                            nameInput.focus();
                            nameInput.classList.add('input-focused');
                            setTimeout(() => {
                                nameInput.classList.remove('input-focused');
                            }, 300);
                        }
                    }, 1000);
                    
                    // Click on phone input second
                    setTimeout(() => {
                        const phoneInput = document.getElementById('phone');
                        if (phoneInput) {
                            phoneInput.focus();
                            phoneInput.classList.add('input-focused');
                            setTimeout(() => {
                                phoneInput.classList.remove('input-focused');
                            }, 300);
                        }
                    }, 2000);
                    
                    // Click on submit button last
                    setTimeout(autoClickSubmitButton, 3000);
                }
            }, 50);
        }
    });
    
    // Update step indicators
    stepIcons.forEach((icon, index) => {
        icon.classList.toggle('active', index === bookingData.currentStep);
    });
}

// Auto-click submit button
function autoClickSubmitButton() {
    const submitButton = document.querySelector('.booking-submit-button');
    if (submitButton) {
        // Add click animation class
        submitButton.classList.add('button-clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            submitButton.classList.remove('button-clicked');
        }, 300);
    }
}

// Update booking summary
export function updateBookingSummary() {
    document.getElementById('selectedService').textContent = bookingData.selectedService !== null ? bookingData.services[bookingData.selectedService] : '-';
    document.getElementById('selectedBarber').textContent = bookingData.selectedBarber !== null ? bookingData.barbers[bookingData.selectedBarber] : '-';
    document.getElementById('selectedDate').textContent = bookingData.selectedDate !== null ? `Nisan ${bookingData.selectedDate + 1}, 2024` : '-';
    document.getElementById('selectedTime').textContent = bookingData.selectedTime !== null ? bookingData.times[bookingData.selectedTime] : '-';
}

// Auto select option
export function autoSelectOption() {
    const options = {
        0: { selector: '.service-option', max: 3, variable: 'selectedService' },
        1: { selector: '#barberStep .service-option', max: 3, variable: 'selectedBarber' },
        2: { selector: '.calendar-day', max: 30, variable: 'selectedDate' },
        3: { selector: '.time-slot', max: 6, variable: 'selectedTime' }
    };

    const currentOptions = options[bookingData.currentStep];
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
            bookingData[currentOptions.variable] = randomIndex;

            // Update booking summary
            updateBookingSummary();
        }
    }
}

// Setup auto advancement
export function setupAutoAdvancement() {
    // Auto advance steps
    const stepInterval = setInterval(() => {
        bookingData.currentStep = (bookingData.currentStep + 1) % 5;
        updateStepVisibility();
    }, 6000);

    // Auto select options
    const optionInterval = setInterval(autoSelectOption, 2000);

    // Initial setup
    updateStepVisibility();
    autoSelectOption();

    // Return cleanup function
    return () => {
        clearInterval(stepInterval);
        clearInterval(optionInterval);
    };
}

// Reset steps to the first step
export function resetSteps() {
    // Reset current step to 0
    bookingData.currentStep = 0;
    
    // Reset all selections
    bookingData.selectedService = null;
    bookingData.selectedBarber = null;
    bookingData.selectedDate = null;
    bookingData.selectedTime = null;
    
    // Clear all selections in the UI
    document.querySelectorAll('.service-option.selected, .calendar-day.selected, .time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Update the UI
    updateStepVisibility();
    updateBookingSummary();
} 