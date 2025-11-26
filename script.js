// Cinematic Scroll Animation Controller
class CinematicScrollController {
    constructor() {
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParticles();
        this.initMapParticles();
        this.animateOnScroll();
    }

    setupEventListeners() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.animateOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
    }

    getElementProgress(element) {
        if (!element) return 0;
        const rect = element.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2;
        const progress = 1 - (elementMiddle / this.windowHeight);
        return Math.max(0, Math.min(1, progress));
    }

    isElementInView(element, threshold = 0.1) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height;
        const visibleHeight = Math.min(rect.bottom, this.windowHeight) - Math.max(rect.top, 0);
        return visibleHeight / elementHeight >= threshold;
    }

    // Floating background particles
    initParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: radial-gradient(circle, rgba(212, 167, 90, 0.6), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }

    // Canvas particles for map section
    initMapParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 167, 90, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(212, 167, 90, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    animateOnScroll() {
        this.animateHero();
        this.animateAppPreview();
        this.animateLocation();
        this.animateGroup();
        this.animateGallery();
    }

    animateHero() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const heroProgress = this.scrollY / this.windowHeight;
        
        // Parallax background with zoom
        const heroBgImage = hero.querySelector('.hero-bg-image');
        if (heroBgImage) {
            const translateY = this.scrollY * 0.5;
            const scale = 1 + heroProgress * 0.3;
            heroBgImage.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }

        // Overlay fade
        const heroOverlay = hero.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.opacity = `${1 - heroProgress * 0.6}`;
        }

        // Fog layer movement
        const fogLayer = hero.querySelector('.fog-layer');
        if (fogLayer) {
            fogLayer.style.transform = `translateY(${this.scrollY * 0.2}px)`;
            fogLayer.style.opacity = `${0.6 - heroProgress * 0.4}`;
        }

        // Content fade and move
        const heroContent = hero.querySelector('.hero-content-centered');
        if (heroContent) {
            heroContent.style.transform = `translateY(${this.scrollY * 0.3}px)`;
            heroContent.style.opacity = `${1 - heroProgress * 1.8}`;
        }
    }

    animateAppPreview() {
        const section = document.getElementById('app-preview');
        if (!section) return;

        const sectionProgress = this.getElementProgress(section);
        
        // Phone mockup float and rotation
        const phoneMockup = section.querySelector('.phone-mockup');
        if (phoneMockup && this.isElementInView(section, 0.3)) {
            const scale = 0.95 + sectionProgress * 0.05;
            const rotateY = sectionProgress * 8;
            phoneMockup.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        }

        // Text animation
        const appPreviewRight = section.querySelector('.app-preview-right');
        if (appPreviewRight && this.isElementInView(section, 0.3)) {
            appPreviewRight.classList.add('visible');
        }

        // Feature blocks stagger
        const featureBlocks = section.querySelectorAll('.feature-block');
        featureBlocks.forEach((block, index) => {
            if (this.isElementInView(section, 0.4)) {
                setTimeout(() => {
                    block.style.opacity = '1';
                    block.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }

    animateLocation() {
        const location = document.getElementById('location');
        if (!location) return;

        const locationProgress = this.getElementProgress(location);

        // Title animation
        const title = location.querySelector('.section-title');
        if (title && this.isElementInView(location, 0.2)) {
            title.classList.add('visible');
        }

        // Subtitle animation
        const subtitle = location.querySelector('.section-subtitle');
        if (subtitle && this.isElementInView(location, 0.2)) {
            subtitle.classList.add('visible');
        }

        // Map container
        const mapContainer = location.querySelector('.map-container');
        if (mapContainer && this.isElementInView(location, 0.3)) {
            mapContainer.classList.add('visible');
        }

        // Map pins with stagger
        const pins = location.querySelectorAll('.map-pin-wrapper');
        pins.forEach((pin, index) => {
            const delay = parseFloat(pin.dataset.delay || 0);
            if (locationProgress > 0.3 + delay && this.isElementInView(location, 0.3)) {
                pin.classList.add('visible');
            }
        });

        // Feature pointers parallax
        const pointers = location.querySelectorAll('.pointer-item');
        pointers.forEach((pointer, index) => {
            if (this.isElementInView(location, 0.5)) {
                const offset = (index % 2 === 0 ? 1 : -1) * locationProgress * 10;
                pointer.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    animateGroup() {
        const group = document.getElementById('group');
        if (!group) return;

        // Text animation
        const groupText = group.querySelector('.group-text');
        if (groupText && this.isElementInView(group, 0.3)) {
            groupText.classList.add('visible');
        }

        // Cards wrapper animation
        const cardsWrapper = group.querySelector('.group-cards-wrapper');
        if (cardsWrapper && this.isElementInView(group, 0.3)) {
            cardsWrapper.classList.add('visible');
        }

        // Individual memory cards parallax
        const memoryCards = group.querySelectorAll('.memory-card');
        memoryCards.forEach((card, index) => {
            if (this.isElementInView(group, 0.4)) {
                const delay = index * 0.15;
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay * 1000);
            }
        });
    }

    animateGallery() {
        const gallery = document.getElementById('gallery');
        if (!gallery) return;

        const galleryProgress = this.getElementProgress(gallery);

        // Title animation
        const title = gallery.querySelector('.section-title');
        if (title && this.isElementInView(gallery, 0.2)) {
            title.classList.add('visible');
        }

        // Subtitle animation
        const subtitle = gallery.querySelector('.section-subtitle');
        if (subtitle && this.isElementInView(gallery, 0.2)) {
            subtitle.classList.add('visible');
        }

        // Gallery items with rotation and stagger
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            const itemDelay = 0.1 + (index * 0.08);
            if (galleryProgress > itemDelay && this.isElementInView(gallery, 0.2)) {
                item.classList.add('visible');
                
                // Apply rotation from data attribute
                const rotation = item.dataset.rotation || 0;
                item.style.setProperty('--rotation', `${rotation}deg`);
            }
        });

        // Parallax effect for gallery items
        if (this.isElementInView(gallery, 0.3)) {
            items.forEach((item, index) => {
                const parallaxSpeed = (index % 3) * 0.02;
                const translateY = galleryProgress * 50 * parallaxSpeed;
                item.style.transform = `scale(1) rotate(${item.dataset.rotation || 0}deg) translateY(${translateY}px)`;
            });
        }
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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
}

// Enhanced button interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', (e) => {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            }, 100);

            console.log('Button clicked:', button.textContent.trim());
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Gallery item interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Gallery item clicked');
            // Add your lightbox or modal logic here
        });

        // 3D tilt effect on hover
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            item.style.transform = `
                scale(1.05) 
                rotate(0deg) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });

        item.addEventListener('mouseleave', () => {
            const rotation = item.dataset.rotation || 0;
            item.style.transform = `scale(1) rotate(${rotation}deg)`;
        });
    });
}

// Memory card interactions
function initMemoryCardInteractions() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Memory card clicked');
        });

        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `
                translateY(-10px) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Feature block hover effects
function initFeatureBlockInteractions() {
    const featureBlocks = document.querySelectorAll('.feature-block');
    
    featureBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-30px)';
        block.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const scrollController = new CinematicScrollController();
    
    // Initialize interactions
    initSmoothScroll();
    initButtonInteractions();
    initGalleryInteractions();
    initMemoryCardInteractions();
    initFeatureBlockInteractions();
    
    // Initial animation check
    scrollController.animateOnScroll();
    
    console.log('✨ Wayfarian Travel Diary - Cinematic Experience Loaded');
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor glow effect (optional enhancement)
function initCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(212, 167, 90, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// Uncomment to enable cursor glow
// initCursorGlow();