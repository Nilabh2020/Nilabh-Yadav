/**
 * Main JavaScript File
 * Handles core functionality, initializes components, and manages event listeners
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initPreloader();
    initHeaderScroll();
    initSmoothScrolling();
    initMobileNavigation();
    initRevealElements();
    initSkillProgress();
    initProjectFilters();
    initTestimonialSlider();
    initContactForm();
    initGoogleMap();
    initCopyrightYear();

    // Remove preloader after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('hidden');
        }, 500);
    });

    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
});

/**
 * Initialize preloader functionality
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    if (!preloader) return;

    // Show preloader
    preloader.style.display = 'flex';

    // Add event listener to hide preloader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    });
}

/**
 * Initialize header scroll effects
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    // Update header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Trigger the scroll event once to set initial state
    window.dispatchEvent(new Event('scroll'));
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Update navigation active state
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');

                // Scroll to target
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile navigation if open
                const mobileNav = document.querySelector('.nav-mobile');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.querySelector('.mobile-nav-toggle').classList.remove('active');
                }
            }
        });
    });
}

/**
 * Initialize mobile navigation menu
 */
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');

    if (!mobileToggle) return;

    // Create mobile navigation container if it doesn't exist
    let mobileNav = document.querySelector('.nav-mobile');
    if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'nav-mobile';

        // Clone navigation links into mobile nav
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        mobileNav.appendChild(navLinks);

        // Insert after header
        const header = document.querySelector('.header');
        header.parentNode.insertBefore(mobileNav, header.nextSibling);
    }

    // Toggle mobile navigation
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // Transform hamburger to X or back
        if (mobileToggle.classList.contains('active')) {
            mobileToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
            mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
            mobileToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            mobileToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(0) translate(0)';
            mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            mobileToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(0) translate(0)';
        }
    });
}

/**
 * Initialize reveal animations for elements as they enter the viewport
 */
function initRevealElements() {
    const revealElements = document.querySelectorAll('.reveal-element');

    if (revealElements.length === 0) return;

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Element is considered in viewport if its top is below 20% of the viewport
        // and its bottom is above the bottom of the viewport
        return (
            rect.top <= windowHeight * 0.8 &&
            rect.bottom >= 0
        );
    };

    // Function to reveal elements in viewport
    const revealInViewport = () => {
        revealElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('revealed')) {
                element.classList.add('revealed');

                // Add delay to child elements if needed
                const animatedChildren = element.querySelectorAll('.animated-text span');
                if (animatedChildren.length > 0) {
                    animatedChildren.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    };

    // Reveal elements on scroll
    window.addEventListener('scroll', revealInViewport);

    // Reveal elements already in viewport on load
    window.addEventListener('load', revealInViewport);

    // Initial check
    revealInViewport();
}

/**
 * Initialize skill progress bars animation
 */
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress');

    if (progressBars.length === 0) return;

    const animateProgress = () => {
        progressBars.forEach(bar => {
            const progressElement = bar.closest('.skill-progress');

            if (isElementInViewport(progressElement) && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    };

    // Check if element is in viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };

    // Animate on scroll
    window.addEventListener('scroll', animateProgress);

    // Animate on load
    window.addEventListener('load', animateProgress);

    // Initial animation
    setTimeout(animateProgress, 500);
}

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    // Filter projects based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Show/hide projects based on filter
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';

                    // Reset animation
                    card.classList.remove('revealed');
                    setTimeout(() => {
                        card.classList.add('revealed');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0 || dots.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    // Function to show slide by index
    const showSlide = (index) => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    };

    // Set up dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Clear auto-transition
            showSlide(index);
            startAutoSlide(); // Restart auto-transition
        });
    });

    // Auto-transition slides
    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000);
    };

    // Start slider
    showSlide(0);
    startAutoSlide();
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (!contactForm || !formResponse) return;

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea');

        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');

                // Add error animation
                input.classList.add('shake');
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 500);
            } else {
                input.classList.remove('error');
            }

            // Special validation for email field
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');

                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 500);
                }
            }
        });

        if (isValid) {
            // Simulate form submission (in a real project, this would be an API call)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                // Show success message
                formResponse.classList.add('show');

                // Reset form
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            }, 1500);

            // Close response modal
            const closeButton = formResponse.querySelector('.close-response');
            closeButton.addEventListener('click', () => {
                formResponse.classList.remove('show');
            });
        }
    });

    // Add input animations
    const formFields = contactForm.querySelectorAll('.form-field');

    formFields.forEach(field => {
        const input = field.querySelector('.form-control');

        input.addEventListener('focus', () => {
            field.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            field.classList.remove('focused');
        });
    });
}

/**
 * Initialize Google Maps
 */
function initGoogleMap() {
    const mapElement = document.getElementById('map');

    if (!mapElement) return;

    // In a real project, you would include the Google Maps API and initialize a map
    // Here we'll simulate it with an iframe for demonstration
    mapElement.innerHTML = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968236!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1635521045501!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy">
        </iframe>
    `;
}

/**
 * Initialize current year for copyright text
 */
function initCopyrightYear() {
    const yearElement = document.getElementById('current-year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize GSAP animations
 */
function initGSAPAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .fromTo('.hero__background', { scale: 1.2 }, { scale: 1, duration: 1.5, ease: "power2.out" })
        .fromTo('.hero__text .greeting', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=1')
        .fromTo('.hero__text .name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero__text .hero__subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero__text .hero__description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero__text .hero__cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero__image', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.7')
        .fromTo('.scroll-indicator', { opacity: 0, y: 20 }, { opacity: 0.8, y: 0, duration: 0.7 }, '-=0.3');

    // Setup scroll trigger animations
    if (typeof ScrollTrigger !== 'undefined') {
        // Header animation
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'scrolled', targets: '.header' }
        });

        // Parallax effect on about image
        gsap.to('.about__image img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about__image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Animate skills icons
        const skillIcons = document.querySelectorAll('.skill-icon');

        skillIcons.forEach((icon, index) => {
            ScrollTrigger.create({
                trigger: icon,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(icon, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'back.out(1.7)'
                    });
                },
                once: true
            });
        });

        // Timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(item, {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });

                    const marker = item.querySelector('.timeline-marker');
                    gsap.to(marker, {
                        scale: 1,
                        duration: 0.3,
                        delay: index * 0.2 + 0.3,
                        ease: 'back.out(1.7)'
                    });
                },
                once: true
            });
        });
    }
}