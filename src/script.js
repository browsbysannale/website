// JavaScript functionality for Brows By Sanna Le website

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Set current year in footer
function setCurrentYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Google Reviews API integration
async function loadGoogleReviews() {
    // Check for API key in various locations
    const apiKey = window.__GOOGLE_MAPS_API_KEY__ || 
                  (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : undefined);
    
    if (!apiKey) {
        console.log('Google Maps API key not found, using static testimonials');
        return;
    }

    try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.displayName,places.id,places.rating,places.userRatingCount,places.reviews",
            },
            body: JSON.stringify({ textQuery: "Brows by SannaLe, Leander, TX" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const place = data?.places?.[0];
        if (!place) {
            console.log('No place found in Google Places API response');
            return;
        }

        updateRatingDisplay(place);
        updateTestimonials(place.reviews);

    } catch (error) {
        console.log('Google Reviews API error:', error.message);
        console.log('Using static testimonials as fallback');
    }
}

// Update rating display with Google data
function updateRatingDisplay(place) {
    const ratingContainer = document.getElementById('google-rating');
    const ratingValue = document.getElementById('rating-value');
    const reviewCount = document.getElementById('review-count');
    
    if (ratingContainer && ratingValue && reviewCount) {
        if (place.rating) {
            ratingValue.textContent = Number(place.rating).toFixed(1);
        }
        if (place.userRatingCount) {
            reviewCount.textContent = `(${place.userRatingCount} reviews)`;
        }
        ratingContainer.style.display = 'inline-flex';
    }
}

// Update testimonials with real reviews
function updateTestimonials(reviews) {
    const reviewsArray = Array.isArray(reviews) ? reviews.slice(0, 6) : [];
    
    if (reviewsArray.length > 0) {
        const testimonialsContainer = document.getElementById('testimonials-container');
        if (testimonialsContainer) {
            testimonialsContainer.innerHTML = reviewsArray.map(review => `
                <blockquote class="testimonial-card">
                    <div class="flex items-center gap-2 star-rating text-sm">
                        ${'★'.repeat(Math.max(0, Math.min(5, Math.round(review.rating || 5))))}
                    </div>
                    <p class="mt-2 text-gray-700">${review.text?.text || review.text || ""}</p>
                    <footer class="mt-3 text-sm text-gray-500">
                        — ${review.authorAttribution?.displayName || "Google reviewer"}
                    </footer>
                </blockquote>
            `).join('');
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states to buttons
function initializeButtonLoadingStates() {
    const bookingButtons = document.querySelectorAll('a[href*="docs.google.com"]');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('loading');
            this.textContent = 'Loading...';
            
            // Reset after a short delay (in case the form doesn't load)
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = this.getAttribute('data-original-text') || 'Book Now';
            }, 3000);
        });
        
        // Store original text for reset
        button.setAttribute('data-original-text', button.textContent);
    });
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .card');
    animateElements.forEach(el => observer.observe(el));
}

// Form validation for contact form (if added later)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    
    if (email && !isValidEmail(email.value)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (phone && !isValidPhone(phone.value)) {
        showError('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Analytics tracking (if needed)
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Track booking button clicks
function initializeAnalytics() {
    const bookingButtons = document.querySelectorAll('a[href*="docs.google.com"]');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('booking_click', {
                button_text: this.textContent,
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    setCurrentYear();
    initializeSmoothScrolling();
    initializeButtonLoadingStates();
    initializeScrollAnimations();
    initializeAnalytics();
    initializePerformanceMonitoring();
    
    // Load Google reviews if API key is available
    if (typeof window !== 'undefined') {
        loadGoogleReviews();
    }
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMobileMenu,
        loadGoogleReviews,
        validateContactForm,
        trackEvent
    };
}
