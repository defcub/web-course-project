const logoIntro = document.getElementById('logoIntro');
const logoIntroVideo = document.getElementById('logoIntroVideo');

if (logoIntro && logoIntroVideo) {
    const storageKey = 'enverIntroShown';
    // перевірка, чи сторінку перезавантажили
    const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let alreadyShown = false;
    let finished = false;
    let safetyTimeout;
    let hideTimeout;

    try {
        alreadyShown = sessionStorage.getItem(storageKey) === 'true';
    } catch {
        alreadyShown = true;
    }

    function hideIntro() {
        clearTimeout(hideTimeout);

        logoIntro.hidden = true;
        logoIntroVideo.pause();
        logoIntroVideo.removeAttribute('src');
        logoIntroVideo.load();
    }

    function finishIntro() {
        if (finished) {
            return;
        }

        finished = true;
        clearTimeout(safetyTimeout);
        document.removeEventListener('keydown', handleIntroKey);

        // Зберігаємо останній кадр під час затухання.
        logoIntroVideo.pause();

        if (reducedMotion.matches) {
            hideIntro();
            return;
        }

        logoIntro.classList.add('is-hiding');

        // Резервне приховування, якщо transitionend не спрацює.
        hideTimeout = setTimeout(hideIntro, 550);
    }

    function handleIntroKey(event) {
        if (event.key === 'Escape' || event.key === 'Tab') {
            finishIntro();
        }
    }

    logoIntro.addEventListener('transitionend', (event) => {
        if (event.target === logoIntro && event.propertyName === 'opacity' && finished) {
            hideIntro();
        }
    });

    // показуємо заставку при першому вході та після перезавантаження
    if ((!alreadyShown || isReload) && !reducedMotion.matches) {
        try {
            sessionStorage.setItem(storageKey, 'true');
        } catch {
            // анімація працюватиме й без запису у сховище.
        }

        logoIntroVideo.muted = true;

        logoIntroVideo.addEventListener('ended', finishIntro);
        logoIntroVideo.addEventListener('error', finishIntro);
        document.addEventListener('keydown', handleIntroKey);

        logoIntroVideo.src = 'assets/videos/logo.webm';
        logoIntro.hidden = false;

        // Захист від зависання завантаження або відтворення.
        safetyTimeout = setTimeout(finishIntro, 8000);

        logoIntroVideo.play().catch(finishIntro);
    }
}