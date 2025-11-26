// Scroll Animation Controller
class ScrollAnimationController {
    constructor() {
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateOnScroll();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
            this.animateOnScroll();
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

    animateOnScroll() {
        // Hero parallax
        this.animateHero();
        
        // Story section
        this.animateStory();
        
        // Location section
        this.animateLocation();
        
        // Group section
        this.animateGroup();
        
        // Gallery section
        this.animateGallery();
    }

    animateHero() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const heroProgress = this.scrollY / this.windowHeight;
        
        // Parallax background image
        const heroBgImage = hero.querySelector('.hero-bg-image');
        if (heroBgImage) {
            heroBgImage.style.transform = `translateY(${this.scrollY * 0.5}px) scale(${1 + heroProgress * 0.2})`;
        }

        // Hero overlay fade
        const heroOverlay = hero.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.opacity = `${1 - heroProgress * 0.5}`;
        }

        // Hero content fade and move up
        const heroContent = hero.querySelector('.hero-content-centered');
        if (heroContent) {
            heroContent.style.transform = `translateY(${this.scrollY * 0.3}px)`;
            heroContent.style.opacity = `${1 - heroProgress * 1.5}`;
        }
    }

    animateStory() {
        const story = document.getElementById('story');
        if (!story) return;

        const storyProgress = this.getElementProgress(story);
        
        // Title animation
        const title = story.querySelector('.section-title');
        if (title && this.isElementInView(story, 0.2)) {
            title.classList.add('visible');
            const titleOpacity = Math.min(1, storyProgress * 2);
            const titleTransform = (1 - Math.min(1, storyProgress * 2)) * 50;
            title.style.opacity = titleOpacity;
            title.style.transform = `translateY(${titleTransform}px)`;
        }

        // Phone animation
        const storyPhone = story.querySelector('.story-phone');
        if (storyPhone && this.isElementInView(story, 0.3)) {
            storyPhone.classList.add('visible');
            
            const phoneMockup = storyPhone.querySelector('.phone-mockup');
            if (phoneMockup) {
                const scale = 0.9 + storyProgress * 0.1;
                const rotateY = storyProgress * 15;
                phoneMockup.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
            }
        }

        // Text animation
        const storyText = story.querySelector('.story-text');
        if (storyText && this.isElementInView(story, 0.3)) {
            storyText.classList.add('visible');
        }
    }

    animateLocation() {
        const location = document.getElementById('location');
        if (!location) return;

        const locationProgress = this.getElementProgress(location);

        // Title animation
        const title = location.querySelector('.section-title');
        if (title && this.isElementInView(location, 0.2)) {
            title.classList.add('visible');
            const titleOpacity = Math.min(1, locationProgress * 2);
            const titleTransform = (1 - Math.min(1, locationProgress * 2)) * 50;
            title.style.opacity = titleOpacity;
            title.style.transform = `translateY(${titleTransform}px)`;
        }

        // Subtitle animation
        const subtitle = location.querySelector('.section-subtitle');
        if (subtitle && this.isElementInView(location, 0.2)) {
            subtitle.classList.add('visible');
        }

        // Map container animation
        const mapContainer = location.querySelector('.map-container');
        if (mapContainer && this.isElementInView(location, 0.3)) {
            mapContainer.classList.add('visible');
            const scale = 0.9 + locationProgress * 0.1;
            const opacity = Math.min(1, locationProgress * 1.5);
            mapContainer.style.transform = `scale(${scale})`;
            mapContainer.style.opacity = opacity;
        }

        // Map pins animation
        const pins = location.querySelectorAll('.map-pin-wrapper');
        pins.forEach((pin, index) => {
            const delay = parseFloat(pin.dataset.delay || 0);
            if (locationProgress > 0.3 + delay && this.isElementInView(location, 0.3)) {
                pin.classList.add('visible');
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

        // Grid animation
        const groupGrid = group.querySelector('.group-grid');
        if (groupGrid && this.isElementInView(group, 0.3)) {
            groupGrid.classList.add('visible');
        }
    }

    animateGallery() {
        const gallery = document.getElementById('gallery');
        if (!gallery) return;

        const galleryProgress = this.getElementProgress(gallery);

        // Title animation
        const title = gallery.querySelector('.section-title');
        if (title && this.isElementInView(gallery, 0.2)) {
            title.classList.add('visible');
            const titleOpacity = Math.min(1, galleryProgress * 2);
            const titleTransform = (1 - Math.min(1, galleryProgress * 2)) * 50;
            title.style.opacity = titleOpacity;
            title.style.transform = `translateY(${titleTransform}px)`;
        }

        // Subtitle animation
        const subtitle = gallery.querySelector('.section-subtitle');
        if (subtitle && this.isElementInView(gallery, 0.2)) {
            subtitle.classList.add('visible');
        }

        // Gallery items animation
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            const itemDelay = 0.1 + (index * 0.05);
            if (galleryProgress > itemDelay && this.isElementInView(gallery, 0.2)) {
                item.classList.add('visible');
                item.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }
}

// Smooth scroll for anchor links (if needed)
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

// Button interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // You can add your actual button functionality here
            // For example, redirecting to app stores
            console.log('Button clicked:', button.textContent);
        });
    });
}

// Gallery item interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // You can implement a lightbox or modal here
            console.log('Gallery item clicked');
        });
    });
}

// Group card interactions
function initGroupCardInteractions() {
    const groupCards = document.querySelectorAll('.group-card');
    
    groupCards.forEach(card => {
        card.addEventListener('click', () => {
            // You can implement navigation or modal here
            console.log('Group card clicked:', card.querySelector('.group-name').textContent);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const scrollController = new ScrollAnimationController();
    
    // Initialize interactions
    initSmoothScroll();
    initButtonInteractions();
    initGalleryInteractions();
    initGroupCardInteractions();
    
    // Initial animation check
    scrollController.animateOnScroll();
    
    console.log('Wayfarian Travel Diary - Landing Page Loaded');
});

// Optional: Add loading screen fade out
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});