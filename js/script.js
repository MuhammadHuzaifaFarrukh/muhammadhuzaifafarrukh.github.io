// Typewriter Effect (only runs on pages with 'typewriter-text' element)
const typewriterText = document.getElementById('typewriter-text');
const texts = [
    "C++ Developer",
    "Exploring AI using Python",
    "Passionate about Game Development"
    
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // milliseconds per character
let deletingSpeed = 50; // milliseconds per character
let delayBetweenTexts = 1500; // milliseconds

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of text
        isDeleting = true;
        setTimeout(type, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500); // Short pause before typing next text
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typewriterText) { // Only run if typewriterText element exists (i.e., on index.html)
        type();
    }
});


// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger && nav && navLinks) { // Ensure elements exist before adding listeners
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked (for single page navigation or navigating between pages)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(l => l.style.animation = ''); // Reset animation
            }
        });
    });
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('checkbox');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// Check for saved theme preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference saved, check system preference
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
});

// Listen for theme toggle change
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });
}
