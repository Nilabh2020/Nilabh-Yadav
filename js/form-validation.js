/**
 * Form Validation JavaScript File
 * Handles form validation, submission, and interactive form effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initFormAnimations();
    initFormResponse();
});

/**
 * Initialize form validation functionality
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm(contactForm)) {
            simulateFormSubmission(contactForm);
        }
    });

    // Live validation on input fields
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', function() {
            validateField(input);
        });

        // Clear error state on input
        input.addEventListener('input', function() {
            if (input.classList.contains('error')) {
                input.classList.remove('error');

                // Remove error message if exists
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
}

/**
 * Validate the entire form
 *
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Remove all previous error messages first
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());

    // Validate each input
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate a single form field
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    let isValid = true;
    let errorMessage = '';

    // Remove existing error message if any
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Minimum length validation
    else if (field.hasAttribute('minlength') && field.value.trim()) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (field.value.trim().length < minLength) {
            isValid = false;
            errorMessage = `Please enter at least ${minLength} characters`;
        }
    }

    // Display error state and message if invalid
    if (!isValid) {
        field.classList.add('error');

        // Create and insert error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;

        // Add error message after the field
        field.parentElement.appendChild(errorElement);

        // Add error shake animation
        field.classList.add('shake');
        setTimeout(() => {
            field.classList.remove('shake');
        }, 500);
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

/**
 * Simulate form submission with loading state and success/error handling
 *
 * @param {HTMLFormElement} form - The form being submitted
 */
function simulateFormSubmission(form) {
    // Get submit button
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    // Simulate network request
    setTimeout(() => {
        // Simulate successful submission
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo

        if (isSuccess) {
            showFormResponse(true, 'Message Sent!', 'Thank you for your message. I\'ll get back to you as soon as possible.');
            form.reset();
        } else {
            showFormResponse(false, 'Sending Failed', 'Sorry, something went wrong. Please try again or contact directly via email.');
        }

        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
    }, 1500);
}

/**
 * Initialize form animations and interactive effects
 */
function initFormAnimations() {
    const formFields = document.querySelectorAll('.form-field');

    if (formFields.length === 0) return;

    formFields.forEach(field => {
        const input = field.querySelector('.form-control');
        const label = field.querySelector('label');

        // Float label on focus and when content exists
        input.addEventListener('focus', () => {
            field.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            field.classList.remove('focused');

            // Keep label floated if input has content
            if (input.value.trim()) {
                field.classList.add('has-content');
            } else {
                field.classList.remove('has-content');
            }
        });

        // Check initial state (for browser autofill)
        if (input.value.trim()) {
            field.classList.add('has-content');
        }

        // GSAP animations if available
        if (typeof gsap !== 'undefined') {
            // Subtle hover animations
            field.addEventListener('mouseenter', () => {
                if (!field.classList.contains('focused')) {
                    gsap.to(input, {
                        boxShadow: '0 0 0 3px rgba(94, 53, 177, 0.1)',
                        duration: 0.3
                    });
                }
            });

            field.addEventListener('mouseleave', () => {
                if (!field.classList.contains('focused')) {
                    gsap.to(input, {
                        boxShadow: 'none',
                        duration: 0.3
                    });
                }
            });

            // Focus animation
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    y: -2,
                    boxShadow: '0 0 0 3px rgba(94, 53, 177, 0.1)',
                    borderColor: 'var(--color-primary)',
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(field.querySelector('.form-field-icon'), {
                    color: 'var(--color-primary)',
                    duration: 0.3
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    y: 0,
                    boxShadow: 'none',
                    borderColor: input.classList.contains('error') ? 'var(--color-error)' : 'var(--color-border)',
                    duration: 0.3
                });

                if (!input.classList.contains('error')) {
                    gsap.to(field.querySelector('.form-field-icon'), {
                        color: 'var(--color-text-light)',
                        duration: 0.3
                    });
                }
            });
        }
    });

    // Submit button hover effect
    const submitButton = document.querySelector('.form-submit button');

    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            const buttonText = submitButton.querySelector('span');
            const buttonIcon = submitButton.querySelector('i');

            if (buttonText && buttonIcon && !submitButton.disabled) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(buttonText, { x: -10, duration: 0.3 });
                    gsap.to(buttonIcon, {
                        opacity: 1,
                        x: 10,
                        duration: 0.3
                    });
                } else {
                    buttonText.style.transform = 'translateX(-10px)';
                    buttonIcon.style.opacity = '1';
                    buttonIcon.style.transform = 'translateX(10px)';
                }
            }
        });

        submitButton.addEventListener('mouseleave', () => {
            const buttonText = submitButton.querySelector('span');
            const buttonIcon = submitButton.querySelector('i');

            if (buttonText && buttonIcon && !submitButton.disabled) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(buttonText, { x: 0, duration: 0.3 });
                    gsap.to(buttonIcon, {
                        opacity: 0,
                        x: 20,
                        duration: 0.3
                    });
                } else {
                    buttonText.style.transform = 'translateX(0)';
                    buttonIcon.style.opacity = '0';
                    buttonIcon.style.transform = 'translateX(20px)';
                }
            }
        });
    }
}

/**
 * Initialize form response modal functionality
 */
function initFormResponse() {
    const formResponse = document.getElementById('form-response');

    if (!formResponse) return;

    // Close response when close button is clicked
    const closeButton = formResponse.querySelector('.close-response');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            formResponse.classList.remove('show');
        });
    }

    // Close response when clicking outside the modal
    formResponse.addEventListener('click', (e) => {
        if (e.target === formResponse) {
            formResponse.classList.remove('show');
        }
    });

    // Close response when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && formResponse.classList.contains('show')) {
            formResponse.classList.remove('show');
        }
    });
}

/**
 * Show form response modal with custom message
 *
 * @param {boolean} success - Whether the submission was successful
 * @param {string} title - The title of the response message
 * @param {string} message - The detailed message
 */
function showFormResponse(success, title, message) {
    const formResponse = document.getElementById('form-response');

    if (!formResponse) return;

    // Update response content
    const responseIcon = formResponse.querySelector('.response-icon');
    const responseTitle = formResponse.querySelector('.response-title');
    const responseMessage = formResponse.querySelector('.response-message');

    if (responseIcon) {
        responseIcon.className = success ? 'response-icon success' : 'response-icon error';
        responseIcon.innerHTML = success ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';
    }

    if (responseTitle) {
        responseTitle.textContent = title;
    }

    if (responseMessage) {
        responseMessage.textContent = message;
    }

    // Show the response modal
    formResponse.classList.add('show');

    // Set focus to close button for accessibility
    const closeButton = formResponse.querySelector('.close-response');
    if (closeButton) {
        setTimeout(() => {
            closeButton.focus();
        }, 100);
    }

    // Auto-hide after some time if successful
    if (success) {
        setTimeout(() => {
            formResponse.classList.remove('show');
        }, 5000);
    }
}

/**
 * Add custom error styles for form validation
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add error styles to CSS if they don't exist
    if (!document.getElementById('form-error-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'form-error-styles';
        styleSheet.textContent = `
            .form-field .form-control.error {
                border-color: var(--color-error);
            }

            .error-message {
                color: var(--color-error);
                font-size: 12px;
                margin-top: 4px;
                padding-left: 50px;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }

            .shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `;
        document.head.appendChild(styleSheet);
    }
});