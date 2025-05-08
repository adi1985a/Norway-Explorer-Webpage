// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Dynamic Image Slider
const images = [
    'images/northern-lights.jpg',
    'images/geirangerfjord.jpg',
    'images/trolltunga.jpg',
    'images/bergen.jpg'
];

const imageSlider = document.querySelector('.image-slider');
let currentImageIndex = 0;

function createImageElement(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Norway Landscape';
    return img;
}

function updateSlider() {
    if (!imageSlider) return;
    
    imageSlider.innerHTML = '';
    const img = createImageElement(images[currentImageIndex]);
    imageSlider.appendChild(img);
    
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Change image every 5 seconds
setInterval(updateSlider, 5000);
updateSlider(); // Initial load

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Add CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Language Management
const translations = {
    en: {
        languageNames: {
            en: 'English',
            pl: 'Polish'
        },
        // Add English translations here
    },
    pl: {
        languageNames: {
            en: 'Angielski',
            pl: 'Polski'
        },
        // Add Polish translations here
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update current language display and flag
    const currentLanguageSpan = document.querySelector('.current-language');
    const currentFlag = document.querySelector('.current-flag');
    if (currentLanguageSpan) {
        currentLanguageSpan.textContent = translations[lang].languageNames[lang];
    }
    if (currentFlag) {
        currentFlag.src = `icons/${lang}.svg`;
        currentFlag.alt = translations[lang].languageNames[lang];
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update active language in dropdown
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Cookie Consent Management
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createCookieConsent() {
    if (getCookie('cookieConsent')) return;

    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    cookieConsent.innerHTML = `
        <div class="cookie-text">
            Ta strona używa plików cookie, aby poprawić Twoje wrażenia z przeglądania. 
            Korzystając z naszej strony, zgadzasz się na naszą politykę plików cookie.
        </div>
        <div class="cookie-buttons">
            <button class="cookie-accept">Akceptuj wszystkie</button>
            <button class="cookie-reject">Odrzuć opcjonalne</button>
        </div>
    `;

    document.body.appendChild(cookieConsent);

    const acceptButton = cookieConsent.querySelector('.cookie-accept');
    const rejectButton = cookieConsent.querySelector('.cookie-reject');

    acceptButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'all', 365);
        cookieConsent.remove();
    });

    rejectButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'essential', 365);
        cookieConsent.remove();
    });
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', createCookieConsent);

// Remove the favorite button functionality since it's no longer needed
