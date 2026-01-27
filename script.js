// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 14, 26, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 14, 26, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Terminal typing animation
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.3}s`;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe tool cards
document.querySelectorAll('.tool-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe benefit tiers
document.querySelectorAll('.benefit-tier').forEach((tier, index) => {
    tier.style.opacity = '0';
    tier.style.transform = 'translateY(30px)';
    tier.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(tier);
});

// Particle effect on mouse move (subtle)
let particles = [];
const particleCount = 20;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
    }
    
    draw(ctx) {
        ctx.fillStyle = `rgba(0, 255, 136, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create canvas for particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
// --- CRITICAL FIX: Changed from '1' to '-1' ---
canvas.style.zIndex = '-1'; 
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // Only create particles occasionally
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(particle => particle.life > 0);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Glowing cursor effect on interactive elements
const glowElements = document.querySelectorAll('.btn, .tool-card, .nav-link');

glowElements.forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        this.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.4)';
    });
    
    element.addEventListener('mouseleave', function(e) {
        this.style.boxShadow = '';
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatValue(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatValue(Math.floor(current));
        }
    }, 16);
}

function formatStatValue(value) {
    const valueStr = value.toString();
    if (valueStr.includes('M')) return valueStr;
    if (valueStr.includes('+')) return valueStr;
    if (valueStr.includes('.')) return valueStr;
    return value.toLocaleString();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('$10M+')) {
                    stat.textContent = '$0';
                    setTimeout(() => {
                        let value = 0;
                        const target = 10;
                        const timer = setInterval(() => {
                            value += 0.5;
                            if (value >= target) {
                                stat.textContent = '$10M+';
                                clearInterval(timer);
                            } else {
                                stat.textContent = `$${value.toFixed(1)}M+`;
                            }
                        }, 50);
                    }, 100);
                } else if (text.includes('5000+')) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        let value = 0;
                        const timer = setInterval(() => {
                            value += 100;
                            if (value >= 5000) {
                                stat.textContent = '5000+';
                                clearInterval(timer);
                            } else {
                                stat.textContent = value.toLocaleString();
                            }
                        }, 30);
                    }, 100);
                } else if (text.includes('99.9%')) {
                    stat.textContent = '0%';
                    setTimeout(() => {
                        let value = 0;
                        const timer = setInterval(() => {
                            value += 2;
                            if (value >= 99.9) {
                                stat.textContent = '99.9%';
                                clearInterval(timer);
                            } else {
                                stat.textContent = `${value.toFixed(1)}%`;
                            }
                        }, 20);
                    }, 100);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add hover effect to tool cards
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Terminal cursor blink
setInterval(() => {
    const cursor = document.querySelector('.terminal-cursor');
    if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }
}, 500);

// Button click ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for glow orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.glow-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mobile menu toggle (if needed for responsive)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        // Add hamburger menu logic here if needed
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

console.log('🚀 SOL Decoder website loaded successfully!');

// --- FINAL FIX FOR UNCLICKABLE BUTTONS ---
// This forces all buttons to the top layer and pushes backgrounds to the bottom
document.addEventListener('DOMContentLoaded', () => {
    console.log("Applying button click fix...");
    
    const fixStyle = document.createElement('style');
    fixStyle.innerHTML = `
        /* Force background layers to the back */
        .grid-overlay, .glow-orb, canvas {
            z-index: -999 !important;
            pointer-events: none !important;
        }

        /* Force tool card overlays to allow clicks through */
        .tool-card::before {
            pointer-events: none !important;
            z-index: 0 !important;
        }

        /* Force content containers to be relative so z-index works */
        section, .nav, .footer {
            position: relative !important;
            z-index: 10 !important;
        }

        /* Force buttons/links to be absolutely clickable on top */
        .btn, .tool-btn, .nav-cta, a {
            position: relative !important;
            z-index: 9999 !important; /* Maximum priority */
            cursor: pointer !important;
            pointer-events: auto !important;
        }
    `;
    document.head.appendChild(fixStyle);
});