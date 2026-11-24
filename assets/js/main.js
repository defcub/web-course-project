// =========================================
// БУРГЕР МЕНЮ
// =========================================

const iconBlock = document.getElementById('iconBlock');
const iconOpen = document.getElementById('iconOpen');
const iconClose = document.getElementById('iconClose');
const navMenu = document.querySelector('.nav-menu');

if (iconBlock && iconOpen && iconClose && navMenu) {
    function updateMenuLabel() {
        const isOpen = navMenu.classList.contains('menu-open');

        iconBlock.setAttribute(
            'aria-label',
            siteLanguage.text(isOpen ? 'menuClose' : 'menuOpen')
        );
    }

    function setMenuState(isOpen) {
        navMenu.classList.toggle('menu-open', isOpen);

        iconOpen.classList.toggle('d-none', isOpen);
        iconClose.classList.toggle('d-none', !isOpen);

        iconBlock.setAttribute('aria-expanded', String(isOpen));

        updateMenuLabel();
    }

    iconBlock.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('menu-open');

        setMenuState(!isOpen);
    });

    const menuLinks = navMenu.querySelectorAll('a');

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('menu-open')
        ) {
            setMenuState(false);
            iconBlock.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 789) {
            setMenuState(false);
        }
    });

    document.addEventListener(
        'siteLanguageChange',
        updateMenuLabel
    );

    updateMenuLabel();
}


// =========================================
// ЗМІНА ШАПКИ ПРИ СКРОЛІ
// =========================================

const header = document.getElementById('header');

if (header) {
    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 50);
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
// СЛАЙДЕР ПОРТФОЛІО
// =========================================

const track = document.getElementById('portfolioTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

if (track && btnPrev && btnNext) {
    const slides = Array.from(
        track.querySelectorAll('.portfolio-slide')
    );

    const motionPreference = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    if (slides.length > 0) {
        const slideCount = slides.length;

        let currentIndex = slideCount;
        let isMoving = false;
        let finishTimeout;

        // Копії з обох боків забезпечують рух по колу.
        const beforeSlides = document.createDocumentFragment();
        const afterSlides = document.createDocumentFragment();

        function createCopy(slide) {
            const copy = slide.cloneNode(true);

            copy.className = 'portfolio-copy';
            copy.removeAttribute('id');
            copy.alt = '';
            copy.setAttribute('aria-hidden', 'true');
            copy.draggable = false;

            return copy;
        }

        slides.forEach((slide) => {
            slide.draggable = false;

            beforeSlides.append(createCopy(slide));
            afterSlides.append(createCopy(slide));
        });

        track.prepend(beforeSlides);
        track.append(afterSlides);

        function updatePosition(animate) {
            const gap =
                parseFloat(getComputedStyle(track).columnGap) || 0;

            const slideWidth =
                slides[0].getBoundingClientRect().width;

            const offset = currentIndex * (slideWidth + gap);

            track.style.transition = animate
                ? ''
                : 'none';

            track.style.transform = `translateX(-${offset}px)`;

            if (!animate) {
                // Фіксуємо непомітне повернення до основних слайдів.
                void track.offsetWidth;
                track.style.transition = '';
            }
        }

        function finishMovement() {
            clearTimeout(finishTimeout);

            if (currentIndex >= slideCount * 2) {
                currentIndex -= slideCount;
            } else if (currentIndex < slideCount) {
                currentIndex += slideCount;
            }

            updatePosition(false);
            isMoving = false;
        }

        function moveSlide(direction) {
            if (isMoving || slideCount < 2) {
                return;
            }

            isMoving = true;
            currentIndex += direction;

            if (motionPreference.matches) {
                finishMovement();
                return;
            }

            updatePosition(true);

            // Запасний варіант, якщо transitionend не спрацює.
            finishTimeout = setTimeout(finishMovement, 500);
        }

        btnPrev.addEventListener('click', () => {
            moveSlide(-1);
        });

        btnNext.addEventListener('click', () => {
            moveSlide(1);
        });

        track.addEventListener('transitionend', (event) => {
            if (
                event.target === track &&
                event.propertyName === 'transform' &&
                isMoving
            ) {
                finishMovement();
            }
        });

        window.addEventListener('resize', finishMovement);
        window.addEventListener('load', finishMovement);

        updatePosition(false);
    }
}
