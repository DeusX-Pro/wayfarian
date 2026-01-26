gsap.registerPlugin(ScrollTrigger);

// 1. Text reveal on load
gsap.from(".reveal-text", {
    y: 150,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
});

// 2. Parallax Hero Image
gsap.to(".hero-img", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    scale: 1.2,
    y: 100
});

// 3. Reveal feature list items one by one
gsap.from(".feature-list li", {
    scrollTrigger: {
        trigger: ".feature-list",
        start: "top 80%"
    },
    x: -50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
});

// 4. Phone Entrance (The Strava Metric Slide)
gsap.from(".phone-mockup-main", {
    scrollTrigger: {
        trigger: ".metrics-section",
        start: "top 60%"
    },
    rotateY: -30,
    opacity: 0,
    x: 100,
    duration: 1.5,
    ease: "expo.out"
});

// 5. Story Cards staggered reveal
gsap.from(".story-card", {
    scrollTrigger: {
        trigger: ".group-section",
        start: "top 70%"
    },
    y: 100,
    opacity: 0,
    stagger: 0.3,
    duration: 1
});

// Make sure to include: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>
gsap.registerPlugin(TextPlugin);

const tl = gsap.timeline();

// 1. Initial fade in for the whole container
tl.from(".content", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
});

gsap.registerPlugin(ScrollTrigger);

// 1. Shrink Hero Video on Scroll
gsap.to(".hero-video", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    scale: 1.5,
    opacity: 0.1,
    filter: "blur(20px)"
});

// 2. Animate the Golden Orb
gsap.to("#pulse-orb", {
    scrollTrigger: {
        trigger: ".story-reveal",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
    },
    opacity: 0.4,
    scale: 2,
    y: 200, // Moves the orb down as you scroll
    duration: 2
});

// 3. Narrative Reveal
gsap.from(".narrative-wrapper", {
    scrollTrigger: {
        trigger: ".story-reveal",
        start: "top 70%",
        toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out"
});

// 4. Writing effect for the outline text in Section 2
gsap.from(".outline", {
    scrollTrigger: {
        trigger: ".story-reveal",
        start: "top 60%"
    },
    duration: 2,
    text: "a memory.", 
    ease: "none"
});

// Background Parallax
gsap.to(".topo-map", {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    },
    y: -100,
    rotate: 2,
    ease: "none"
});

// Grid Reactivity
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    
    gsap.to(".grid-overlay", {
        duration: 2,
        x: x,
        y: y,
        ease: "power2.out"
    });
});

const metricsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".metrics-section",
        start: "top 60%",
    }
});

// 1. Scanner beam passes down
metricsTl.fromTo(".scanner-line", 
    { top: "0%", opacity: 0 }, 
    { top: "100%", opacity: 1, duration: 2, ease: "power2.inOut" }
);

// 2. Phone tilts into place as beam passes
metricsTl.from(".phone-perspective-wrap", {
    rotateY: 0,
    rotateX: 0,
    scale: 0.8,
    opacity: 0,
    duration: 1.5
}, "-=1.5");

// 3. HUD items "pop" out
metricsTl.from(".hud-item", {
    scale: 0,
    opacity: 0,
    stagger: 0.3,
    ease: "back.out(1.7)"
}, "-=0.5");

// 4. Feature list "Types" itself
metricsTl.from(".acc-item h4", {
    duration: 1,
    text: "", // If using TextPlugin
    opacity: 0,
    stagger: 0.2
}, "-=1");



gsap.registerPlugin(ScrollTrigger);

const revealTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".metrics-section",
        start: "top 60%",
        toggleActions: "play none none reverse"
    }
});

// 1. Position and show beam
revealTl.set(".scanner-beam", { opacity: 1 });

// 2. The Big Reveal: Beam travels and Mask shrinks
revealTl.to(".scanner-beam", {
    top: "100%",
    duration: 2,
    ease: "power2.inOut"
});

revealTl.to(".phone-mask", {
    height: "0%", /* Wipes the black away from top to bottom */
    duration: 2,
    ease: "power2.inOut"
}, "<"); // "<" starts at the same time as the beam

// 3. HUD Stats pop out
revealTl.from(".hud-stat", {
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "back.out(1.7)"
}, "-=0.5");

// 4. Subtle rotation on scroll
gsap.to(".phone-3d", {
    scrollTrigger: {
        trigger: ".metrics-section",
        scrub: 1
    },
    rotateY: 5,
    x: 20
});

// 1. Stacking Cards Animation
gsap.timeline({
    scrollTrigger: {
        trigger: ".group-section",
        start: "top 20%",
        end: "+=1000",
        pin: true, // Pins the section while cards switch
        scrub: 1
    }
})
.to(".card-1", { y: -100, opacity: 0, scale: 0.8, duration: 1 })
.to(".card-2", { y: -50, opacity: 1, scale: 1, duration: 1 }, "<");

// 2. Radar Beam Rotation
gsap.to(".radar-beam", {
    rotation: 360,
    duration: 4,
    repeat: -1,
    ease: "none"
});

// 3. Sequential Highlight of Discovery Items
const mapItems = document.querySelectorAll('.map-item');
gsap.to(mapItems, {
    scrollTrigger: {
        trigger: ".discovery-section",
        start: "top 60%"
    },
    opacity: 1,
    y: 0,
    stagger: {
        each: 0.5,
        repeat: -1,
        yoyo: true
    },
    onUpdate: function() {
        // Toggle active class logic here for a "scanning" feel
    }
});

// 4. Final CTA Reveal
gsap.from(".bebas.reveal-up", {
    scrollTrigger: {
        trigger: ".final-cta",
        start: "top 80%"
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});