/**
 * Flip Cards JavaScript File
 * Handles the interactive flip card functionality for project cards
 */

document.addEventListener('DOMContentLoaded', () => {
    initFlipCards();
});

/**
 * Initialize flip cards functionality
 */
function initFlipCards() {
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length === 0) return;

    projectCards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        const frontCard = card.querySelector('.card-front');
        const backCard = card.querySelector('.card-back');
        const flipHint = card.querySelector('.flip-hint');
        const flipBack = card.querySelector('.flip-back');

        // Flag to track if card is flipping
        let isFlipping = false;

        // Add click event to front card only
        frontCard.addEventListener('click', function(e) {
            // Don't flip if clicked on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            if (isFlipping) return;
            isFlipping = true;

            // Flip to back
            cardInner.classList.add('flipped');

            setTimeout(() => {
                isFlipping = false;
            }, 800);
        });

        // Add click event to back card
        backCard.addEventListener('click', function(e) {
            // Don't flip if clicked on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            if (isFlipping) return;
            isFlipping = true;

            // Flip to front
            cardInner.classList.remove('flipped');

            setTimeout(() => {
                isFlipping = false;
            }, 800);
        });

        // Specifically for the "flip back" button
        if (flipBack) {
            flipBack.addEventListener('click', function(e) {
                e.stopPropagation();

                if (isFlipping) return;
                isFlipping = true;

                // Flip to front
                cardInner.classList.remove('flipped');

                setTimeout(() => {
                    isFlipping = false;
                }, 800);
            });
        }

        // Create 3D hover effect for desktop
        if (!isMobileDevice()) {
            // Track mouse movement to create 3D effect
            frontCard.addEventListener('mousemove', function(e) {
                // Skip 3D effect if card is flipped
                if (cardInner.classList.contains('flipped')) return;

                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Calculate the rotation based on mouse position
                const rotateY = (mouseX - cardCenterX) * 0.05; // Reduced intensity for subtlety
                const rotateX = (cardCenterY - mouseY) * 0.05;

                // Apply the 3D rotation
                cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

                // Add a slight move effect to card elements for depth
                const projectImage = frontCard.querySelector('.project-image');
                if (projectImage) {
                    projectImage.style.transform = `translateZ(10px)`;
                }

                const projectInfo = frontCard.querySelector('.project-info');
                if (projectInfo) {
                    projectInfo.style.transform = `translateZ(20px)`;
                }

                // Show flip hint on hover
                if (flipHint) {
                    flipHint.style.opacity = '0.8';
                }
            });

            // Reset card on mouse leave
            frontCard.addEventListener('mouseleave', function() {
                // Skip if card is flipped
                if (cardInner.classList.contains('flipped')) return;

                cardInner.style.transform = 'rotateY(0) rotateX(0)';

                const projectImage = frontCard.querySelector('.project-image');
                if (projectImage) {
                    projectImage.style.transform = 'translateZ(0)';
                }

                const projectInfo = frontCard.querySelector('.project-info');
                if (projectInfo) {
                    projectInfo.style.transform = 'translateZ(0)';
                }

                // Hide hint when not hovering
                if (flipHint) {
                    flipHint.style.opacity = '0';
                }
            });
        }
    });

    // Handle all links to prevent propagation
    const cardLinks = document.querySelectorAll('.card-back a, .card-front a');
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

/**
 * Check if the current device is a mobile device
 *
 * @returns {boolean} True if the device is a mobile device
 */
function isMobileDevice() {
    return (window.innerWidth <= 768) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0);
}