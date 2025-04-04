/**
 * UI Module - Handles UI-related functionality
 */

// Initialize Lucide icons
export function initializeLucide() {
    const init = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        } else {
            setTimeout(init, 100);
        }
    };
    init();
}

// Back to Top Button Functionality
export function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
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
}

// Smooth scrolling for all anchor links
export function setupSmoothScrolling() {
    document.querySelectorAll(".cta-button").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
    
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
    
            if (targetElement) {
                // Remove animation class if it exists
                targetElement.classList.remove('section-animate');
                
                // Scroll to the element
                targetElement.scrollIntoView({ behavior: "smooth" });
                
                // Add animation class after a small delay
                setTimeout(() => {
                    targetElement.classList.add('section-animate');
                }, 100);
                
                // Prevent URL change
                history.replaceState(null, null, " ");
            }
        });
    });
} 