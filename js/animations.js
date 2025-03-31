/**
 * Animations JavaScript File
 * Handles advanced animation effects and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initGSAPLibrary();
    initScrollAnimations();
    initHeroAnimations();
    initTextAnimations();
    initParallaxEffects();
    initRevealAnimations();
});

/**
 * Initialize GSAP and its plugins if available
 */
function initGSAPLibrary() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not found. Some animations might not work.');
        return;
    }

    // Register plugins if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (typeof TextPlugin !== 'undefined') {
        gsap.registerPlugin(TextPlugin);
    }
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Exit if GSAP or ScrollTrigger is not available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    // Create scroll-based animations

    // Header parallax effect
    gsap.to('.hero__background', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        // Create timeline for each section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        // Animate section header
        const header = section.querySelector('.section-header');
        if (header) {
            tl.fromTo(header.querySelector('.section-subtitle'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }, 0);

            tl.fromTo(header.querySelector('.section-title'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }, 0.2);

            tl.fromTo(header.querySelector('.title-underline'),
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.4);
        }
    });

    // Animate skill bars
    gsap.utils.toArray('.skill-progress').forEach(skill => {
        const progress = skill.querySelector('.progress');
        const width = progress.getAttribute('data-width');

        ScrollTrigger.create({
            trigger: skill,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(progress, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });

    // Project cards staggered animation
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length > 0) {
        ScrollTrigger.batch(projectCards, {
            interval: 0.1,
            batchMax: 3,
            onEnter: batch => {
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'back.out(1.2)'
                });
            },
            start: 'top 90%'
        });
    }

    // Testimonial animation
    const testimonials = document.querySelector('.testimonial-slider');

    if (testimonials) {
        const testimonialTl = gsap.timeline({
            scrollTrigger: {
                trigger: testimonials,
                start: 'top 80%'
            }
        });

        testimonialTl
            .fromTo('.testimonial-content',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' })
            .fromTo('.quote-icon',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4');
    }

    // Contact section elements animation
    const contactSection = document.querySelector('.contact');

    if (contactSection) {
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 80%'
            }
        });

        // Contact info items
        contactTl.fromTo('.contact-item',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, 0.3);

        // Social links
        contactTl.fromTo('.contact__info .social-link',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, 0.6);

        // Form fields
        contactTl.fromTo('.form-field',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.3);
    }
}

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
    // Exit if GSAP is not available
    if (typeof gsap === 'undefined') {
        return;
    }

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    // Initial animation for hero elements
    heroTimeline
        .fromTo('.hero__background',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 }, 0)

        .fromTo('.hero__text',
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }, 0.5)

        .fromTo('.greeting',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 }, 0.8)

        .fromTo('.name',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 }, 1)

        .fromTo('.hero__subtitle',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 }, 1.2)

        .fromTo('.hero__subtitle::after',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 1.4)

        .fromTo('.hero__description',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 }, 1.4)

        .fromTo('.hero__cta .btn',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 }, 1.6)

        .fromTo('.hero__image',
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.2)' }, 1.2)

        .fromTo('.scroll-indicator',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 0.8, duration: 0.5 }, 2);

    // Add hover effect to buttons
    const heroButtons = document.querySelectorAll('.hero__cta .btn');

    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { y: -3, duration: 0.3, ease: 'power2.out' });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Mouse move parallax effect on hero
    heroSection.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        gsap.to('.hero__background', {
            x: moveX,
            y: moveY,
            duration: 1.5,
            ease: 'power1.out'
        });
    });
}

/**
 * Initialize text animations
 */
function initTextAnimations() {
    // Exit if GSAP is not available
    if (typeof gsap === 'undefined') {
        return;
    }

    // Find all elements with .animated-text class
    const animatedTextElements = document.querySelectorAll('.animated-text');

    animatedTextElements.forEach(element => {
        // Get the text content
        const text = element.textContent;
        element.textContent = '';

        // Split text into characters
        const characters = text.split('');

        // Create spans for each character
        characters.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
            element.appendChild(span);
        });

        // Create scroll trigger animation
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                element.classList.add('revealed');
            }
        });
    });

    // Typwriter effect for specific elements if needed
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';

        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 100);
            },
            once: true
        });
    });
}

/**
 * Initialize parallax scrolling effects
 */
function initParallaxEffects() {
    // Exit if GSAP or Scroll Trigger is not available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    // Find elements with parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach(element => {
        const depth = element.getAttribute('data-parallax-depth') || 0.2;

        gsap.to(element, {
            y: `${depth * 100}%`,
            ease: 'none',
            scrollTrigger: {
                trigger: element.closest('section') || element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Parallax for background images
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    parallaxBgs.forEach(bg => {
        const depth = bg.getAttribute('data-parallax-depth') || 0.3;

        gsap.fromTo(bg,
            { backgroundPositionY: '0%' },
            {
                backgroundPositionY: `${depth * 100}%`,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });
}

/**
 * Initialize reveal animations for elements
 */
function initRevealAnimations() {
    if (typeof gsap === 'undefined') {
        return;
    }

    // Create observer for elements with .reveal-element class
    const revealElements = document.querySelectorAll('.reveal-element');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '-50px 0px'
        });

        revealElements.forEach(element => {
            gsap.set(element, { opacity: 0, y: 30 });
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    // Special animations for specific sections

    // About section image reveal
    const aboutImage = document.querySelector('.about__image');
    if (aboutImage) {
        ScrollTrigger.create({
            trigger: aboutImage,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(aboutImage,
                    { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
                    {
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        duration: 1.2,
                        ease: 'power4.inOut'
                    }
                );
            },
            once: true
        });
    }

    // Staggered animation for highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    if (highlightItems.length > 0) {
        ScrollTrigger.create({
            trigger: highlightItems[0].closest('.about__highlights'),
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(highlightItems,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.6,
                        ease: 'back.out(1.2)'
                    }
                );
            },
            once: true
        });
    }
}