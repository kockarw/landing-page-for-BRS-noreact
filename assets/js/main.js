document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    let currentStep = 0;
    let selectedService = null;
    let selectedBarber = null;
    let selectedDate = null;
    let selectedTime = null;

    const steps = ['serviceStep', 'barberStep', 'dateStep', 'timeStep'];
    const stepIcons = document.querySelectorAll('.step-icon');

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
        // Hide all steps
        document.querySelectorAll('.booking-step').forEach(step => {
            step.classList.add('hidden');
        });
        
        // Show current step
        document.getElementById(steps[currentStep]).classList.remove('hidden');

        // Update step indicators
        stepIcons.forEach((icon, index) => {
            icon.classList.toggle('active', index === currentStep);
        });
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
            }
        }
    }

    // Auto advance steps
    setInterval(() => {
        currentStep = (currentStep + 1) % 4;
        updateStepVisibility();
    }, 6000);

    // Auto select options
    setInterval(autoSelectOption, 2000);

    // Initial setup
    updateStepVisibility();
    autoSelectOption();
});