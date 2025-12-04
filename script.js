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

    // Web3Forms Contact Form (AJAX) handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const resultDiv = document.getElementById('result');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            if (resultDiv) {
                resultDiv.className = 'alert d-none';
                resultDiv.innerText = '';
                resultDiv.setAttribute('aria-hidden', 'true');
            }

            const formData = new FormData(contactForm);
            if (resultDiv) {
                resultDiv.className = 'alert alert-info';
                resultDiv.innerText = 'Sending message…';
                resultDiv.classList.remove('d-none');
                resultDiv.setAttribute('aria-hidden', 'false');
            }
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    headers: { 'Accept': 'application/json' }
                });

                // Some responses might not return JSON; attempt to parse safely
                let data = null;
                try { data = await response.json(); } catch (err) { /* ignore */ }

                if (response.ok) {
                    if (resultDiv) {
                        resultDiv.className = 'alert alert-success';
                        resultDiv.innerText = (data && data.message) ? data.message : 'Thanks! Your message was sent successfully.';
                        resultDiv.setAttribute('aria-hidden', 'false');
                        // Remove d-none if present
                        resultDiv.classList.remove('d-none');
                    } else {
                        alert('Thanks! Your message was sent successfully.');
                    }
                    // Clear form fields
                    contactForm.reset();

                    // If redirect is provided, navigate there after a short delay
                    const redirectInput = contactForm.querySelector('input[name="redirect"]');
                    if (redirectInput && redirectInput.value) {
                        setTimeout(() => { window.location.href = redirectInput.value; }, 1200);
                    }
                } else {
                    const errMsg = (data && data.message) ? data.message : 'An error occurred while sending your message. Please try again.';
                    if (resultDiv) {
                        resultDiv.className = 'alert alert-danger';
                        resultDiv.innerText = errMsg;
                        resultDiv.setAttribute('aria-hidden', 'false');
                        resultDiv.classList.remove('d-none');
                    } else {
                        alert(errMsg);
                    }
                }
            } catch (err) {
                console.error('Contact form submit error', err);
                if (resultDiv) {
                    resultDiv.className = 'alert alert-danger';
                    resultDiv.innerText = 'Connection error. Please try again later.';
                    resultDiv.classList.remove('d-none');
                    resultDiv.setAttribute('aria-hidden', 'false');
                } else {
                    alert('Connection error. Please try again later.');
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});

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
