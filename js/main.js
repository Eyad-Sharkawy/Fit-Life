// ============================================
// Main JavaScript File - FITlife
// ============================================

(function() {
    'use strict';

    // ============================================
    // Initialization Functions
    // ============================================

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    function toggleMobileMenu() {
        const isActive = navLinks.classList.contains('active');
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        document.body.style.overflow = !isActive ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMobileMenu);
        }
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ============================================
    // Story Carousel
    // ============================================

    let currentStoryIndex = 0;
    let isInitialized = false;

    function getCardsToShow() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 968) return 2;
        return 3;
    }

    function moveCarousel(newIndex) {
        const cards = document.querySelectorAll('.story-card');
        const wrapper = document.querySelector('.stories-wrapper');
        if (!wrapper || cards.length === 0) return;
        
        const cardsToShow = getCardsToShow();
        const maxIdx = Math.max(0, cards.length - cardsToShow);
        const clampedIndex = Math.min(Math.max(0, newIndex), maxIdx);
        
        const firstCard = cards[0];
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const computedStyle = window.getComputedStyle(wrapper);
            const gapValue = computedStyle.gap || '30px';
            const gap = parseInt(gapValue) || 30;
            const cardWidthWithGap = cardWidth + gap;
            const translateX = -(clampedIndex * cardWidthWithGap);
            
            wrapper.style.setProperty('transform', `translateX(${translateX}px)`, 'important');
            wrapper.style.setProperty('transition', 'transform 0.5s ease', 'important');
            currentStoryIndex = clampedIndex;
            wrapper.offsetHeight; // Force reflow
        }
    }

    function setupCarouselButtons() {
        const prevBtn = document.querySelector('.stories-container .arrow-btn:first-child');
        const nextBtn = document.querySelector('.stories-container .arrow-btn:last-child');
        
        if (prevBtn && !prevBtn.hasAttribute('data-carousel-bound')) {
            prevBtn.setAttribute('data-carousel-bound', 'true');
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                try {
                    const cards = document.querySelectorAll('.story-card');
                    const cardsToShow = getCardsToShow();
                    const maxIdx = Math.max(0, cards.length - cardsToShow);
                    if (currentStoryIndex > 0) {
                        moveCarousel(currentStoryIndex - 1);
                    } else {
                        moveCarousel(maxIdx);
                    }
                } catch (error) {
                    // Silent error handling
                }
                return false;
            }, { passive: false, capture: false });
        }
        
        if (nextBtn && !nextBtn.hasAttribute('data-carousel-bound')) {
            nextBtn.setAttribute('data-carousel-bound', 'true');
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                try {
                    const cards = document.querySelectorAll('.story-card');
                    const cardsToShow = getCardsToShow();
                    const maxIdx = Math.max(0, cards.length - cardsToShow);
                    if (currentStoryIndex < maxIdx) {
                        moveCarousel(currentStoryIndex + 1);
                    } else {
                        moveCarousel(0);
                    }
                } catch (error) {
                    // Silent error handling
                }
                return false;
            }, { passive: false, capture: false });
        }
    }

    function updateCarousel() {
        const storyCards = document.querySelectorAll('.story-card');
        const storiesWrapper = document.querySelector('.stories-wrapper');
        
        if (storiesWrapper && storyCards.length > 0) {
            setupCarouselButtons();
            if (!isInitialized) {
                currentStoryIndex = 0;
                isInitialized = true;
                storiesWrapper.style.transform = 'translateX(0px)';
                storiesWrapper.style.transition = 'none';
                setTimeout(() => {
                    if (storiesWrapper) {
                        storiesWrapper.style.transition = 'transform 0.5s ease';
                    }
                }, 50);
            }
        }
    }

    function initializeCarousel() {
        currentStoryIndex = 0;
        updateCarousel();
    }

    // ============================================
    // Recipe Carousel
    // ============================================

    let currentRecipeIndex = 0;
    let isRecipeCarouselInitialized = false;

    function getRecipeCardsToShow() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 968) return 2;
        return 3;
    }

    function moveRecipeCarousel(newIndex) {
        const cards = document.querySelectorAll('.recipe-card');
        const wrapper = document.querySelector('.recipes-wrapper');
        if (!wrapper || cards.length === 0) return;
        
        const cardsToShow = getRecipeCardsToShow();
        const maxIdx = Math.max(0, cards.length - cardsToShow);
        const clampedIndex = Math.min(Math.max(0, newIndex), maxIdx);
        
        const firstCard = cards[0];
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const computedStyle = window.getComputedStyle(wrapper);
            const gapValue = computedStyle.gap || '12px';
            let gap = 12;
            if (gapValue.includes('px')) {
                gap = parseInt(gapValue) || 12;
            } else if (gapValue.includes('rem')) {
                gap = parseFloat(gapValue) * 16;
            } else {
                gap = parseInt(gapValue) || 12;
            }
            const cardWidthWithGap = cardWidth + gap;
            const translateX = -(clampedIndex * cardWidthWithGap);
            
            wrapper.style.setProperty('transform', `translateX(${translateX}px)`, 'important');
            wrapper.style.setProperty('transition', 'transform 0.5s ease', 'important');
            currentRecipeIndex = clampedIndex;
            wrapper.offsetHeight;
        }
    }

    function setupRecipeCarouselButtons() {
        const prevBtn = document.querySelector('.recipes-prev');
        const nextBtn = document.querySelector('.recipes-next');
        
        if (prevBtn && !prevBtn.hasAttribute('data-recipe-carousel-bound')) {
            prevBtn.setAttribute('data-recipe-carousel-bound', 'true');
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                try {
                    const cards = document.querySelectorAll('.recipe-card');
                    const cardsToShow = getRecipeCardsToShow();
                    const maxIdx = Math.max(0, cards.length - cardsToShow);
                    if (currentRecipeIndex > 0) {
                        moveRecipeCarousel(currentRecipeIndex - 1);
                    } else {
                        moveRecipeCarousel(maxIdx);
                    }
                } catch (error) {
                    // Silent error handling
                }
                return false;
            }, { passive: false, capture: false });
        }
        
        if (nextBtn && !nextBtn.hasAttribute('data-recipe-carousel-bound')) {
            nextBtn.setAttribute('data-recipe-carousel-bound', 'true');
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                try {
                    const cards = document.querySelectorAll('.recipe-card');
                    const cardsToShow = getRecipeCardsToShow();
                    const maxIdx = Math.max(0, cards.length - cardsToShow);
                    if (currentRecipeIndex < maxIdx) {
                        moveRecipeCarousel(currentRecipeIndex + 1);
                    } else {
                        moveRecipeCarousel(0);
                    }
                } catch (error) {
                    // Silent error handling
                }
                return false;
            }, { passive: false, capture: false });
        }
    }

    function updateRecipeCarousel() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        const recipesWrapper = document.querySelector('.recipes-wrapper');
        
        if (recipesWrapper && recipeCards.length > 0) {
            setupRecipeCarouselButtons();
            if (!isRecipeCarouselInitialized) {
                currentRecipeIndex = 0;
                isRecipeCarouselInitialized = true;
                recipesWrapper.style.removeProperty('transform');
                recipesWrapper.style.setProperty('transform', 'translateX(0px)', 'important');
                recipesWrapper.style.transition = 'none';
                recipesWrapper.offsetHeight;
                setTimeout(() => {
                    if (recipesWrapper) {
                        recipesWrapper.style.setProperty('transform', 'translateX(0px)', 'important');
                        recipesWrapper.style.transition = 'transform 0.5s ease';
                    }
                }, 50);
            }
        }
    }

    function initializeRecipeCarousel() {
        const recipesWrapper = document.querySelector('.recipes-wrapper');
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        if (!recipesWrapper || recipeCards.length === 0) {
            setTimeout(initializeRecipeCarousel, 50);
            return;
        }
        
        currentRecipeIndex = 0;
        recipesWrapper.style.removeProperty('transform');
        recipesWrapper.style.cssText = recipesWrapper.style.cssText.replace(/transform[^;]*/gi, '');
        recipesWrapper.style.transition = 'none';
        recipesWrapper.style.transform = 'translateX(0px)';
        recipesWrapper.offsetHeight;
        
        const computedTransform = window.getComputedStyle(recipesWrapper).transform;
        if (computedTransform && computedTransform !== 'none' && computedTransform !== 'matrix(1, 0, 0, 1, 0, 0)') {
            recipesWrapper.style.transform = 'translateX(0px)';
            recipesWrapper.offsetHeight;
        }
        
        updateRecipeCarousel();
        
        setTimeout(() => {
            if (recipesWrapper) {
                currentRecipeIndex = 0;
                recipesWrapper.style.transition = 'none';
                recipesWrapper.style.transform = 'translateX(0px)';
                recipesWrapper.offsetHeight;
                setTimeout(() => {
                    if (recipesWrapper) {
                        recipesWrapper.style.transition = 'transform 0.5s ease';
                    }
                }, 50);
            }
        }, 150);
    }

    // ============================================
    // Scroll Animations
    // ============================================

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = [
            '.about-card', '.service-card', '.pricing-card', '.team-card', 
            '.bmi-card', '.story-card', '.recipe-card',
            '.about-container', '.about-intro', '.about-vision', '.about-mission',
            'h2.section-title', 'h2.nutrition-title', 'h2.call-to-action-title', 
            'h2.trust-subtitle', 'h3.trust-title',
            '.call-to-action-section', '.call-to-action-stat', '.call-to-action-title',
            '.nutrition-subtitle', '.nutrition-description', '.nutrition-benefits', 
            '.nutrition-buttons', '.recipes-section', '.recipes-header',
            '.services-subtitle', '.services-description', '.services-image',
            '.bmi-subtitle', '.bmi-description', '.bmi-scale', 
            '.calc-btn', '.bmi-join-btn', '.bmi-join-text',
            '.success-stories-intro', '.success-stories-outro',
            '.team-description-text', '.trust-section'
        ];

        animatedElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('scroll-animate');
                observer.observe(el);
            });
        });
    }

    // ============================================
    // Button Handlers
    // ============================================

    const bmiCalcBtn = document.querySelector('.calc-btn, .bmi-join-btn');
    if (bmiCalcBtn) {
        bmiCalcBtn.addEventListener('click', () => {
            // Future: Open BMI calculator modal
        });
    }

    document.querySelectorAll('.signup-btn, .btn-secondary, .call-to-action-btn, .footer-contact-btn').forEach(btn => {
        if (btn.textContent.includes('Contact Us') || btn.textContent.includes('Join Us')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Future: Open contact form/modal
            });
        }
    });

    // ============================================
    // Resize Handlers
    // ============================================

    let resizeTimeout;
    let recipeResizeTimeout;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const cards = document.querySelectorAll('.story-card');
            const cardsToShow = getCardsToShow();
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            if (currentStoryIndex > maxIndex) {
                currentStoryIndex = maxIndex;
                moveCarousel(currentStoryIndex);
            }
        }, 250);

        clearTimeout(recipeResizeTimeout);
        recipeResizeTimeout = setTimeout(() => {
            const cards = document.querySelectorAll('.recipe-card');
            const cardsToShow = getRecipeCardsToShow();
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            if (currentRecipeIndex > maxIndex) {
                currentRecipeIndex = maxIndex;
                moveRecipeCarousel(currentRecipeIndex);
            }
        }, 250);
    });

    // ============================================
    // DOM Ready Initialization
    // ============================================

    function init() {
        initSmoothScrolling();
        initializeCarousel();
        initializeRecipeCarousel();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
