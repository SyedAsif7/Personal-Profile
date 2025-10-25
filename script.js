// Simple interactive features for the coding profile page
document.addEventListener('DOMContentLoaded', function() {
    
    // Create loading overlay
    createLoadingOverlay();
    
    // Handle profile image loading
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
    
    // Simple button interactions
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach((button, index) => {
        // Staggered animation on load
        button.style.animationDelay = `${index * 0.1}s`;
        
        button.addEventListener('click', function(e) {
            createSimpleRipple(this, e);
        });
    });
    
    // Simple social icon interactions
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach((icon, index) => {
        // No animations or hover effects
    });
    
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
`;
document.head.appendChild(focusStyle);