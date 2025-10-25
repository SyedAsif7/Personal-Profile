// Enhanced interactive features for the coding profile page with mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize mobile optimizations
    initializeMobileOptimizations();
    
    // Create loading overlay
    createLoadingOverlay();
    
    // Handle profile image loading with better error handling
    const profileImg = document.getElementById('profile-img');
    const placeholder = document.querySelector('.profile-placeholder');
    
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.classList.add('loaded');
            if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    placeholder.style.display = 'none';
                }, 300);
            }
        });
        
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
        
        // Check if image is already loaded
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
            profileImg.classList.add('loaded');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }
    }
    
    // Enhanced button interactions with touch support
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach((button, index) => {
        // Staggered animation on load
        button.style.animationDelay = `${index * 0.1}s`;
        
        // Touch events for mobile
        button.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
            e.preventDefault();
        }, { passive: false });
        
        button.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
            createTouchRipple(this, e);
        });
        
        button.addEventListener('click', function(e) {
            createSimpleRipple(this, e);
        });
    });
    
    // Enhanced social icon interactions with touch support
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach((icon, index) => {
        // Touch events for mobile
        icon.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
            e.preventDefault();
        }, { passive: false });
        
        icon.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
            createIconRipple(this, e);
        });
        
        icon.addEventListener('click', function(e) {
            createIconRipple(this, e);
        });
    });
    
    // Initialize basic features
    initializeBasicFeatures();
    
    // Remove loading overlay after everything is loaded
    setTimeout(() => {
        removeLoadingOverlay();
    }, 1500);
});

// Loading overlay functions
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
}

function removeLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
}

// Icon ripple effect for social buttons
function createIconRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = rect.width;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(88, 166, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: iconRippleExpand 0.4s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 400);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes iconRippleExpand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
let animationFrameId;
function optimizeAnimations() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
        // Optimize animations
        const elements = document.querySelectorAll('.profile-card, .link-button, .social-icons a');
        elements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Mobile optimization functions
function initializeMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        document.body.classList.add('mobile-device');
        
        // Optimize for mobile performance
        optimizeForMobile();
        
        // Add mobile-specific event listeners
        addMobileEventListeners();
    }
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function optimizeForMobile() {
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-device .profile-card {
            animation-duration: 0.6s;
        }
        
        .mobile-device .profile-picture::before {
            animation-duration: 6s;
        }
        
        .mobile-device .profile-name {
            animation-duration: 8s;
        }
        
        .mobile-device .touch-active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .mobile-device .link-button.touch-active {
            background: rgba(13, 17, 23, 0.9);
            border-color: rgba(88, 166, 255, 0.4);
        }
        
        .mobile-device .social-icons a.touch-active {
            transform: scale(0.95);
            background: rgba(13, 17, 23, 0.9);
        }
    `;
    document.head.appendChild(style);
}

function addMobileEventListeners() {
    // Prevent context menu on long press
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
    
    // Handle viewport changes
    window.addEventListener('resize', debounce(function() {
        // Optimize layout for new viewport size
        optimizeLayoutForViewport();
    }, 250));
}

function optimizeLayoutForViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Adjust animations based on viewport size
    if (vh < 500) {
        document.body.classList.add('short-viewport');
    } else {
        document.body.classList.remove('short-viewport');
    }
    
    if (vw < 400) {
        document.body.classList.add('narrow-viewport');
    } else {
        document.body.classList.remove('narrow-viewport');
    }
}

// Touch ripple effect for mobile
function createTouchRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.changedTouches ? event.changedTouches[0].clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = event.changedTouches ? event.changedTouches[0].clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(88, 166, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: touchRippleExpand 0.4s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 400);
}

// Basic Features
function initializeBasicFeatures() {
    // Check if app is running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        document.body.classList.add('pwa-mode');
        console.log('Running as PWA');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation .link-button:focus,
    .keyboard-navigation .social-icons a:focus {
        outline: 3px solid rgba(88, 166, 255, 0.8);
        outline-offset: 3px;
        transform: scale(1.02);
    }
    
    @keyframes touchRippleExpand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .short-viewport .profile-card {
        padding: 20px 25px;
    }
    
    .short-viewport .profile-section {
        margin-bottom: 15px;
    }
    
    .short-viewport .main-links {
        margin-bottom: 15px;
    }
    
    .short-viewport .social-icons {
        margin-bottom: 15px;
    }
    
    .narrow-viewport .profile-name {
        font-size: 24px;
    }
    
    .narrow-viewport .profile-bio {
        font-size: 14px;
    }
`;
document.head.appendChild(focusStyle);