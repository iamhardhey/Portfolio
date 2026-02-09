// ========================================
// iamhardhey Portfolio - JavaScript
// Professional Portfolio Management System
// ========================================

// Portfolio Manager - Main application object
const PortfolioManager = (() => {
    // Configuration
    const config = {
        scrollThreshold: 300,
        animationDuration: 300,
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    };

    // Initialize all modules on DOM ready
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeModules);
        } else {
            initializeModules();
        }
    };

    const initializeModules = () => {
        MobileMenu.init();
        NavigationManager.init();
        ScrollManager.init();
        FormManager.init();
        PerformanceOptimizer.init();
        AccessibilityManager.init();
        UIEnhancements.init();
        
        console.log('✓ iamhardhey Portfolio initialized successfully');
    };

    return { init, config };
})();

// ========================================
// MODULE 1: MOBILE MENU MANAGEMENT
// ========================================
const MobileMenu = (() => {
    const init = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('change', () => {
            nav.classList.toggle('active', menuToggle.checked);
        });

        // Close menu on link click
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.checked = false;
                nav.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && menuToggle.checked) {
                menuToggle.checked = false;
                nav.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuToggle.checked) {
                menuToggle.checked = false;
                nav.classList.remove('active');
            }
        });
    };

    return { init };
})();

// ========================================
// MODULE 2: NAVIGATION MANAGER
// ========================================
const NavigationManager = (() => {
    const init = () => {
        highlightActivePage();
        addSmoothScrolling();
        window.addEventListener('hashchange', highlightActivePage);
    };

    const highlightActivePage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav a').forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === currentPage || (currentPage === '' && href === 'index.html');
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    };

    const addSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    target.focus();
                }
            });
        });
    };

    return { init };
})();

// ========================================
// MODULE 3: SCROLL MANAGER
// ========================================
const ScrollManager = (() => {
    let scrollToTopBtn = null;
    let ticking = false;

    const init = () => {
        createScrollToTopButton();
        setupScrollListener();
    };

    const createScrollToTopButton = () => {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑ Top';
        scrollToTopBtn.setAttribute('title', 'Back to top');

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollToTopBtn);
    };

    const setupScrollListener = () => {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        });
    };

    const updateScrollButton = () => {
        if (!scrollToTopBtn) return;
        const threshold = PortfolioManager.config.scrollThreshold;
        scrollToTopBtn.classList.toggle('visible', window.scrollY > threshold);
        ticking = false;
    };

    return { init };
})();

// ========================================
// MODULE 4: FORM MANAGER
// ========================================
const FormManager = (() => {
    const init = () => {
        setupFormValidation();
    };

    const setupFormValidation = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', handleSubmit);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        if (!validateForm(form)) {
            return;
        }

        // Show success state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    };

    const validateForm = (form) => {
        const email = form.querySelector('input[type="email"]');
        const textarea = form.querySelector('textarea');

        if (!email || !email.value.trim()) {
            showError(email, 'Email is required');
            return false;
        }

        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return false;
        }

        if (!textarea || !textarea.value.trim()) {
            showError(textarea, 'Message is required');
            return false;
        }

        clearErrors(form);
        return true;
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const showError = (element, message) => {
        if (!element) return;
        element.classList.add('error');
        element.setAttribute('aria-invalid', 'true');
        
        let errorEl = element.parentElement.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            element.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    };

    const clearErrors = (form) => {
        form.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
            el.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    };

    return { init };
})();

// ========================================
// MODULE 5: PERFORMANCE OPTIMIZER
// ========================================
const PerformanceOptimizer = (() => {
    const init = () => {
        lazyLoadImages();
        observeElementsForAnimation();
    };

    const lazyLoadImages = () => {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };

    const observeElementsForAnimation = () => {
        if (!('IntersectionObserver' in window)) return;

        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.card, .project-card, .feature').forEach(el => {
            elementObserver.observe(el);
        });
    };

    return { init };
})();

// ========================================
// MODULE 6: ACCESSIBILITY MANAGER
// ========================================
const AccessibilityManager = (() => {
    const init = () => {
        improveKeyboardNavigation();
        ensureProperAriaLabels();
    };

    const improveKeyboardNavigation = () => {
        // Make clickable elements keyboard accessible
        document.querySelectorAll('[role="button"]').forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
            }
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    };

    const ensureProperAriaLabels = () => {
        // Add aria-labels to icon buttons
        document.querySelectorAll('.button-cta, .scroll-to-top').forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.getAttribute('title') || 'Button');
            }
        });
    };

    return { init };
})();

// ========================================
// MODULE 7: UI ENHANCEMENTS
// ========================================
const UIEnhancements = (() => {
    const init = () => {
        addCardHoverEffects();
        addPageLoadAnimation();
    };

    const addCardHoverEffects = () => {
        const cards = document.querySelectorAll('.card, .project-card, .service-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = 'auto';
            });
        });
    };

    const addPageLoadAnimation = () => {
        document.querySelector('body').style.opacity = '1';
        document.querySelectorAll('h2, h3, p').forEach((el, index) => {
            if (el.closest('.hero')) {
                el.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
            }
        });
    };

    return { init };
})();

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Debounce function for form input
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// ========================================
// INITIALIZATION
// ========================================
PortfolioManager.init();
