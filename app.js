document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Header Transform on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        // Toggle icon active indicator (bars -> X)
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });

    // 3. Highlight Current Section in Navbar on Scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger activation near center of screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Smooth typing feedback subhead animation
    const subhead = document.querySelector('.hero-subtitle');
    const professions = ['Creative Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = professions[wordIndex];
        
        if (isDeleting) {
            subhead.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subhead.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Wait at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % professions.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typewriter effect after 800ms
    setTimeout(typeEffect, 800);
});
