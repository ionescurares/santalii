// Countdown Timer
function initCountdown() {
    // Check if elements exist
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // If elements don't exist, skip initialization
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }
    
    // Target date: June 26, 2026 at 4:00 PM (16:00) in Europe/London timezone
    const targetDate = new Date('2026-06-26T16:00:00+01:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Hero Countdown Timer (May 30, 2026, 16:00, Europe/Bucharest)
function initHeroCountdown() {
    // Check if elements exist
    const daysEl = document.getElementById('heroDays');
    const hoursEl = document.getElementById('heroHours');
    const minutesEl = document.getElementById('heroMinutes');
    const secondsEl = document.getElementById('heroSeconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error('Hero countdown elements not found');
        // Retry after a short delay in case DOM isn't ready
        setTimeout(initHeroCountdown, 100);
        return;
    }
    
    // Target date: May 30, 2026 at 4:00 PM (16:00) in Europe/Bucharest timezone
    // Europe/Bucharest is UTC+2 in summer (EEST) or UTC+3 in winter (EET)
    // May 30, 2026 should be in summer time, so UTC+3
    const targetDate = new Date('2026-05-30T16:00:00+03:00').getTime();
    
    function updateHeroCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    // Initial update
    updateHeroCountdown();
    // Update every second
    setInterval(updateHeroCountdown, 1000);
}

// Set custom validation messages in Romanian
function setupCustomValidation() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const guestsSelect = document.getElementById('guests');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    
    // Name field validation
    if (nameInput) {
        nameInput.addEventListener('invalid', function(e) {
            if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('Vă rugăm să introduceți numele complet');
            } else {
                nameInput.setCustomValidity('');
            }
        });
        
        nameInput.addEventListener('input', function() {
            nameInput.setCustomValidity('');
        });
    }
    
    // Phone field validation
    if (phoneInput) {
        phoneInput.addEventListener('invalid', function() {
            if (phoneInput.validity.valueMissing) {
                phoneInput.setCustomValidity('Vă rugăm să introduceți numărul de telefon');
            } else if (phoneInput.validity.patternMismatch || !isValidPhone(phoneInput.value)) {
                phoneInput.setCustomValidity('Vă rugăm să introduceți un număr de telefon valid');
            } else {
                phoneInput.setCustomValidity('');
            }
        });
        
        phoneInput.addEventListener('input', function() {
            phoneInput.setCustomValidity('');
        });
    }
    
    // Guests select validation
    if (guestsSelect) {
        guestsSelect.addEventListener('invalid', function(e) {
            if (guestsSelect.validity.valueMissing) {
                guestsSelect.setCustomValidity('Vă rugăm să selectați numărul de invitați');
            } else {
                guestsSelect.setCustomValidity('');
            }
        });
        
        guestsSelect.addEventListener('change', function() {
            guestsSelect.setCustomValidity('');
        });
    }
    
    // Attendance radio validation
    attendanceRadios.forEach(function(radio) {
        radio.addEventListener('invalid', function(e) {
            radio.setCustomValidity('Vă rugăm să ne spuneți dacă veți participa');
        });
        
        radio.addEventListener('change', function() {
            attendanceRadios.forEach(function(r) {
                r.setCustomValidity('');
            });
        });
    });
}

// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown
    initCountdown();
    // Initialize hero countdown
    initHeroCountdown();
    
    // Setup custom validation messages
    setupCustomValidation();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', function() {
            headerNav.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }

    // Form submission handling
    const rsvpForm = document.getElementById('rsvpForm');
    const formSuccess = document.getElementById('formSuccess');

    if (rsvpForm) {
        const submitButton = rsvpForm.querySelector('button[type="submit"]');
        const guestsGroup = document.getElementById('guestsGroup');
        const guestsSelect = document.getElementById('guests');
        const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

        function updateGuestsVisibility(attendanceValue) {
            if (!guestsGroup || !guestsSelect) return;

            if (attendanceValue === 'yes') {
                guestsGroup.style.display = 'block';
                guestsSelect.required = true;
            } else {
                guestsGroup.style.display = 'none';
                guestsSelect.required = false;
                guestsSelect.value = '';
            }
        }

        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateGuestsVisibility(radio.value);
            });
        });

        const initiallySelected = Array.from(attendanceRadios).find(radio => radio.checked);
        updateGuestsVisibility(initiallySelected ? initiallySelected.value : null);

        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate phone format before getting form data
            const phoneInput = document.getElementById('phone');
            if (phoneInput && phoneInput.value.trim()) {
                if (!isValidPhone(phoneInput.value.trim())) {
                    phoneInput.setCustomValidity('Vă rugăm să introduceți un număr de telefon valid');
                    phoneInput.reportValidity();
                    return;
                } else {
                    phoneInput.setCustomValidity('');
                }
            }

            // Get form data
            const formData = new FormData(rsvpForm);
            const attendanceValue = formData.get('attendance');
            const guestsSelection = formData.get('guests');
            const shouldCollectGuests = attendanceValue === 'yes';

            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                guests: shouldCollectGuests ? guestsSelection : '',
                attendance: attendanceValue
            };

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Se trimite...';
            }

            try {
                const submissionPayload = {
                    ...data,
                    guests: shouldCollectGuests ? guestsSelection : 'Nu participă'
                };

                const response = await fetch('/api/rsvp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submissionPayload)
                });

                if (!response.ok) {
                    const error = await response.json().catch(() => ({ error: 'A apărut o problemă la trimiterea formularului.' }));
                    throw new Error(error.error || 'A apărut o problemă la trimiterea formularului.');
                }

                // Hide form and RSVP title/subtitle
                rsvpForm.style.display = 'none';
                const rsvpTitle = document.querySelector('.rsvp-section .section-title');
                const rsvpSubtitle = document.querySelector('.rsvp-section .rsvp-subtitle');
                if (rsvpTitle) rsvpTitle.style.display = 'none';
                if (rsvpSubtitle) rsvpSubtitle.style.display = 'none';
                
                // Show success message
                formSuccess.style.display = 'block';
                formSuccess.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } catch (error) {
                console.error('RSVP submission failed:', error);
                showError(error.message || 'Nu am reușit să trimitem RSVP-ul. Încercați din nou.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Trimite RSVP';
                }
            }
        });
    }

    // Form validation
    function validateForm(data) {
        if (!data.name || data.name.trim() === '') {
            showError('Vă rugăm să introduceți numele complet');
            return false;
        }

        if (!data.phone || !isValidPhone(data.phone)) {
            showError('Vă rugăm să introduceți un număr de telefon valid');
            return false;
        }

        if (!data.attendance) {
            showError('Vă rugăm să ne spuneți dacă veți participa');
            return false;
        }

        if (data.attendance === 'yes' && !data.guests) {
            showError('Vă rugăm să selectați numărul de invitați');
            return false;
        }

        return true;
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\+?[0-9()\s-]{7,20}$/;
        return phoneRegex.test(phone);
    }

    function showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: #fee;
                color: #c33;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
                border: 2px solid #fcc;
            `;
            rsvpForm.insertBefore(errorDiv, rsvpForm.firstChild);
        }
        errorDiv.textContent = message;
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'var(--black)';
        }
        
        lastScroll = currentScroll;
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);



