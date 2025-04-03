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
});