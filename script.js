// Professional JavaScript for A4 Aluminium Website

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Enhanced contact form handling with stricter validation and realtime sanitization
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        // Realtime sanitization: remove disallowed characters as user types
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                const sanitized = e.target.value.replace(/[^A-Za-z\s]/g, '');
                if (sanitized !== e.target.value) e.target.value = sanitized;
            });
            nameInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text') || '';
                e.target.value = text.replace(/[^A-Za-z\s]/g, '').slice(0, 100);
            });
        }

        if (emailInput) {
            // allow typical email characters only while typing
            emailInput.addEventListener('input', (e) => {
                const sanitized = e.target.value.replace(/[^A-Za-z0-9@._%+\-]/g, '');
                if (sanitized !== e.target.value) e.target.value = sanitized;
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                // allow only + and digits, ensure single leading +
                let v = e.target.value.replace(/[^0-9+]/g, '');
                // move any + to start and keep only first +
                const plus = v.indexOf('+') !== -1;
                v = v.replace(/\+/g, '');
                if (plus) v = '+' + v;
                e.target.value = v;
            });
            phoneInput.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text') || '';
                let v = text.replace(/[^0-9+]/g, '');
                const plus = v.indexOf('+') !== -1;
                v = v.replace(/\+/g, '');
                if (plus) v = '+' + v;
                e.target.value = v.slice(0, 16);
            });
        }

        if (messageInput) {
            messageInput.setAttribute('maxlength', '1000');
            messageInput.addEventListener('input', (e) => {
                // keep within limit
                if (e.target.value.length > 1000) e.target.value = e.target.value.slice(0, 1000);
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Basic required validation
            if (!name || !email || !phone || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Name: only letters and spaces, 2-100 chars
            const nameRegex = /^[A-Za-z\s]{2,100}$/;
            if (!nameRegex.test(name)) {
                showNotification('Name must contain only letters and spaces (2-100 chars).', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Phone validation
            if (!isValidPhone(phone)) {
                showNotification('Please enter a valid phone number (only + and digits).', 'error');
                return;
            }

            // Message length
            if (message.length < 5 || message.length > 1000) {
                showNotification('Message must be between 5 and 1000 characters.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
            }

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification(`Thank you! We will call you at ${phone} shortly.`, 'success');
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1200);
        });
    }

    // Smooth scrolling for navigation links with offset for fixed navbar
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effects to cards
    document.querySelectorAll('.card, .partner-card, .product-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Floating callback CTA behavior
    const floatingCallback = document.getElementById('floatingCallback');
    if (floatingCallback) {
        floatingCallback.addEventListener('click', function (e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                setTimeout(() => {
                    const phoneInput = document.getElementById('phone');
                    if (phoneInput) phoneInput.focus();
                }, 700);
            }
        });
    }

    // Lightbox modal for products and works
    const lightboxModal = document.getElementById('lightboxModal');
    const lbImage = document.getElementById('lbImage');
    const lbCaption = document.getElementById('lbCaption');
    const lbClose = lightboxModal ? lightboxModal.querySelector('.lb-close') : null;

    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const large = trigger.getAttribute('data-large') || trigger.querySelector('img')?.src;
            const caption = trigger.getAttribute('data-caption') || trigger.querySelector('img')?.alt || '';
            if (lightboxModal && lbImage) {
                lbImage.src = large;
                lbImage.alt = caption;
                lbCaption.textContent = caption;
                lightboxModal.classList.add('active');
                lightboxModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            lbImage.src = '';
            lbCaption.textContent = '';
        }
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lightboxModal) lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Reveal animations for .reveal elements with stagger
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // Add click tracking for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize tooltips for better UX
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add counter animation for statistics
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.innerText.replace(/[^\d]/g, ''));
                animateCounter(target, 0, count, 2000);
                counterObserver.unobserve(target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation: allow leading + and digits; ensure 7-15 digits
    if (!phone) return false;
    // plus only allowed at start
    if ((phone.match(/\+/g) || []).length > 1) return false;
    if (phone.indexOf('+') > 0) return false;
    const digits = phone.replace(/[^0-9]/g, '');
    return digits.length >= 7 && digits.length <= 15;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
    `;

    // Add to page
    document.body.appendChild(notification);

    // Position at top
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    notification.style.border = 'none';

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        element.innerText = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes slideOut {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;
document.head.appendChild(style);

// Ensure correct active nav-link based on current page
document.addEventListener('DOMContentLoaded', function() {
    try {
        const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const hrefFile = href.split('/').pop().toLowerCase();
            if (hrefFile === path || (hrefFile === 'index.html' && (path === '' || path === 'index.html'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } catch (e) {
        // fail silently
        console.warn('Nav active script error', e);
    }
});
