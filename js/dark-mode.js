/**
 * Dark Mode JavaScript File
 * Handles theme toggling and persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');

    // Check if user has set a system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', toggleDarkMode);

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });

    // Set initial state of the toggle button
    updateToggleState();
}

/**
 * Toggle dark mode and save preference
 */
function toggleDarkMode() {
    // Check if we're currently using dark mode
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Add animation class for transition
    document.body.classList.add('theme-transition');

    if (isDarkMode) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }

    // Update toggle button state
    updateToggleState();

    // Add more dramatic transition effects if GSAP is available
    if (typeof gsap !== 'undefined') {
        animateThemeTransition(!isDarkMode);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

/**
 * Update the toggle button state based on current theme
 */
function updateToggleState() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Update the toggle icon
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');

        if (isDarkMode) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

/**
 * Add animation effects during theme transition
 *
 * @param {boolean} toDark - Whether transitioning to dark mode
 */
function animateThemeTransition(toDark) {
    // Create a full-screen overlay for transition effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = toDark ? '#121212' : '#ffffff';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';

    document.body.appendChild(overlay);

    // Animate the overlay
    gsap.to(overlay, {
        opacity: 0.3,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    overlay.remove();
                }
            });
        }
    });

    // Animate other elements if desired
    const cards = document.querySelectorAll('.card-front, .card-back, .testimonial-content, .form-field');
    gsap.fromTo(cards,
        { scale: 0.98, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.3, stagger: 0.03, ease: 'back.out(1.2)' }
    );
}

/**
 * Apply theme-specific styling for elements that need different treatment in dark mode
 */
function applyThemeSpecificStyles() {
    // Add any custom dynamic styling here that can't be handled in CSS
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Example: Change header background opacity based on theme
    const header = document.querySelector('.header.scrolled');
    if (header) {
        header.style.backgroundColor = isDarkMode
            ? 'rgba(18, 18, 18, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
    }

    // Example: Adjust box shadows for cards
    const cards = document.querySelectorAll('.card-front, .card-back');
    cards.forEach(card => {
        card.style.boxShadow = isDarkMode
            ? '0 8px 30px rgba(0, 0, 0, 0.5)'
            : '0 8px 30px rgba(0, 0, 0, 0.1)';
    });
}

// Listen for theme changes and apply specific styles
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' &&
                (mutation.target.classList.contains('dark-mode') ||
                mutation.target.classList.contains('light-mode'))) {
                applyThemeSpecificStyles();
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    // Initial application
    applyThemeSpecificStyles();
});