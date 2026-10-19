// =========================================
// БУРГЕР МЕНЮ
// =========================================

const iconBlock = document.getElementById('iconBlock');
const iconOpen = document.getElementById('iconOpen');
const iconClose = document.getElementById('iconClose');
const navMenu = document.querySelector('.nav-menu');

if (iconBlock && iconOpen && iconClose && navMenu) {
    function setMenuState(isOpen) {
        navMenu.classList.toggle('menu-open', isOpen);

        iconOpen.classList.toggle('d-none', isOpen);
        iconClose.classList.toggle('d-none', !isOpen);

        iconBlock.setAttribute('aria-expanded', String(isOpen));

        iconBlock.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );
    }

    iconBlock.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('menu-open');

        setMenuState(!isOpen);
    });

    // Закриваємо меню після натискання на посилання
    const menuLinks = navMenu.querySelectorAll('a');

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    // Закриваємо меню клавішею Escape
    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('menu-open')
        ) {
            setMenuState(false);
            iconBlock.focus();
        }
    });

    // При переході на десктоп закриваємо мобільне меню
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 789) {
            setMenuState(false);
        }
    });
}

// =========================================
// ЗМІНА ШАПКИ ПРИ СКРОЛІ
// =========================================

const header = document.getElementById('header');

if (header) {
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, {
        passive: true
    });

    updateHeader();
}

// =========================================
// АНІМАЦІЯ ПОЯВИ ЕЛЕМЕНТІВ
// =========================================

const hiddenElements = document.querySelectorAll('.animate-on-scroll');

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Елемент уже показаний — більше не спостерігаємо
                observer.unobserve(entry.target);
            }
        });
    });

    hiddenElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    hiddenElements.forEach((element) => {
        element.classList.add('is-visible');
    });
}

// =========================================
// PORTFOLIO SLIDER
// =========================================

const track = document.getElementById('portfolioTrack');
const slides = document.querySelectorAll('.portfolio-slide');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const dots = document.querySelectorAll('.portfolio-pagination .dot');

// Слайдер запускається лише на сторінці, де він існує
if (track && slides.length > 0 && btnPrev && btnNext) {
    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;

        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const slideWidth = slides[0].clientWidth;

        track.style.transform =
            `translateX(-${index * (slideWidth + gap)}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        btnPrev.style.opacity = index === 0 ? '0.5' : '1';

        btnNext.style.opacity =
            index === slides.length - 1 ? '0.5' : '1';

        btnPrev.disabled = index === 0;
        btnNext.disabled = index === slides.length - 1;
    }

    btnNext.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (i < slides.length) {
                goToSlide(i);
            }
        });
    });

    window.addEventListener('resize', () => {
        goToSlide(0);
    });

    window.addEventListener('load', () => {
        goToSlide(currentIndex);
    });

    goToSlide(0);
}