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

