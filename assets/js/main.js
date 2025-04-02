document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Teşekkürler! En kısa sürede size ulaşacağız.');
            contactForm.reset();
        });
    }

    // Booking steps animation
    const steps = document.querySelectorAll('.booking-step');
    let currentStep = 0;
    const animationDuration = 3000; // 3 seconds per step

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (step) {
                step.style.transform = `translateX(${(index - stepIndex) * 100}%)`;
                step.style.opacity = index === stepIndex ? '1' : '0';
            }
        });
    }

    function animateBookingProcess() {
        showStep(currentStep);
        
        // Remove previous selections
        document.querySelectorAll('.selected').forEach(el => {
            if (el) {
                el.classList.remove('selected');
            }
        });

        // Add new selection based on step
        const currentStepElement = steps[currentStep];
        if (currentStepElement) {
            setTimeout(() => {
                switch(currentStep) {
                    case 0: // Service
                        const serviceOption = currentStepElement.querySelector('.service-option');
                        if (serviceOption) {
                            serviceOption.classList.add('selected');
                        }
                        break;
                    case 1: // Barber
                        const barberOption = currentStepElement.querySelector('.barber-option');
                        if (barberOption) {
                            barberOption.classList.add('selected');
                        }
                        break;
                    case 2: // Date
                        const calendarDay = currentStepElement.querySelector('.calendar-day');
                        if (calendarDay) {
                            calendarDay.classList.add('selected');
                        }
                        break;
                    case 3: // Time
                        const timeSlot = currentStepElement.querySelector('.time-slot');
                        if (timeSlot) {
                            timeSlot.classList.add('selected');
                        }
                        break;
                    case 4: // Personal Info
                        // Form fills automatically
                        break;
                }
            }, 500);
        }

        currentStep = (currentStep + 1) % steps.length;
    }

    // Only start animation if we have booking steps
    if (steps.length > 0) {
        animateBookingProcess();
        setInterval(animateBookingProcess, animationDuration);
    }

    // Add scroll animation for benefits
    const benefitCards = document.querySelectorAll('.benefit-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    benefitCards.forEach(card => {
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.querySelector(".calendar-grid");
    const calendarHeader = document.querySelector(".calendar-header span");

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    const monthNames = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    function renderCalendar() {
        calendarGrid.innerHTML = "";
        calendarHeader.textContent = `${monthNames[month]} ${year}`;

        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();

        firstDay = firstDay === 0 ? 7 : firstDay; // Pazarı en sona almak için

        for (let i = 1; i < firstDay; i++) {
            let emptyCell = document.createElement("div");
            calendarGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDate; day++) {
            let dateCell = document.createElement("div");
            dateCell.textContent = day;
            dateCell.className = "calendar-day";

            dateCell.addEventListener("click", function () {
                document.querySelectorAll(".calendar-day").forEach(el => el.classList.remove("selected"));
                this.classList.add("selected");
            });

            calendarGrid.appendChild(dateCell);
        }
    }

    renderCalendar();
});
