// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const countDownDate = now + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");
        
        if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');
        
        // If countdown finished
        if (distance < 0) {
            clearInterval(timer);
            if (hoursElement) hoursElement.innerHTML = "00";
            if (minutesElement) minutesElement.innerHTML = "00";
            if (secondsElement) secondsElement.innerHTML = "00";
        }
    }, 1000);
}

// Smooth scroll to order section
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize countdown when page loads
updateCountdown();

// Add scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll(`
        .feature-card, 
        .testimonial-card, 
        .stat-card, 
        .objection-card,
        .step,
        .include-item
    `);

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add click handlers for all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-urgent, .cta-final');
    ctaButtons.forEach(button => {
        button.addEventListener('click', scrollToOrder);
    });

    // Add some dynamic effects
    addDynamicEffects();
});

function addDynamicEffects() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add pulse effect to urgent elements
    const urgentElements = document.querySelectorAll('.urgency-badge, .discount-badge');
    urgentElements.forEach(element => {
        setInterval(() => {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });
}

// Add urgency messaging based on time
function addUrgencyMessaging() {
    const hour = new Date().getHours();
    const urgencyMessages = document.querySelectorAll('.urgency-message');
    
    let message = '';
    if (hour >= 0 && hour < 6) {
        message = '🌙 Oferta nocturna especial - Precio más bajo del día';
    } else if (hour >= 6 && hour < 12) {
        message = '🌅 Oferta matutina - Empieza tu día vendiendo';
    } else if (hour >= 12 && hour < 18) {
        message = '☀️ Oferta de medio día - Última oportunidad';
    } else {
        message = '🌆 Oferta nocturna - No esperes hasta mañana';
    }
    
    urgencyMessages.forEach(element => {
        if (element) element.textContent = message;
    });
}

// Initialize urgency messaging
addUrgencyMessaging();

// Add exit-intent popup (optional)
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        // You can add an exit-intent popup here
        console.log('User trying to leave - show exit intent offer');
    }
});

// Track scroll depth for analytics (optional)
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        // Send analytics event here if needed
        if (maxScroll >= 25 && maxScroll < 30) {
            console.log('User scrolled 25%');
        } else if (maxScroll >= 50 && maxScroll < 55) {
            console.log('User scrolled 50%');
        } else if (maxScroll >= 75 && maxScroll < 80) {
            console.log('User scrolled 75%');
        } else if (maxScroll >= 90) {
            console.log('User scrolled 90%');
        }
    }
});