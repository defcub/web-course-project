// =========================================
// ФІЛЬТРАЦІЯ ПРОЄКТІВ
// =========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-case');
const projectCount = document.getElementById('projectCount');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filter;

        // Змінюємо активну кнопку
        filterButtons.forEach((item) => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        let visibleProjects = 0;

        // Показуємо проєкти потрібної категорії
        projectCards.forEach((card) => {
            const projectCategory = card.dataset.category;

            const shouldShow =
                selectedCategory === 'all' ||
                selectedCategory === projectCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleProjects++;
            }
        });

        // Оновлюємо кількість видимих проєктів
        if (projectCount) {
            const word = visibleProjects === 1 ? 'project' : 'projects';

            projectCount.textContent =
                `Showing ${visibleProjects} ${word}`;
        }
    });
});

// =========================================
// ФОРМА ПРОЄКТУ
// =========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const projectService = document.getElementById('projectService');
    const projectMessage = document.getElementById('projectMessage');

    const messageCounter = document.getElementById('messageCounter');
    const formMessage = document.getElementById('formMessage');
    const clearDraft = document.getElementById('clearDraft');

    const storageKey = 'enverProjectDraft';

    // Лічильник символів
    function updateCounter() {
        messageCounter.textContent =
            `${projectMessage.value.length} / 2000`;
    }

    projectMessage.addEventListener('input', updateCounter);

    // Відновлення збереженої чернетки
    try {
        const savedDraft = localStorage.getItem(storageKey);

        if (savedDraft) {
            const draft = JSON.parse(savedDraft);

            if (draft && typeof draft === 'object') {
                userName.value =
                    typeof draft.name === 'string'
                        ? draft.name.slice(0, 80)
                        : '';

                userEmail.value =
                    typeof draft.email === 'string'
                        ? draft.email.slice(0, 120)
                        : '';

                projectService.value =
                    typeof draft.service === 'string'
                        ? draft.service
                        : '';

                projectMessage.value =
                    typeof draft.message === 'string'
                        ? draft.message.slice(0, 2000)
                        : '';

                formMessage.textContent =
                    'Your saved draft has been restored.';
            }
        }
    } catch {
        formMessage.textContent =
            'Your saved draft could not be loaded.';
    }

    updateCounter();

    // Збереження форми без надсилання на сервер
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        // Не дозволяємо вводити ім’я лише з пробілів
        if (userName.value.trim() === '') {
            formMessage.textContent = 'Please enter your name.';

            userName.focus();
            return;
        }

        // Перевіряємо довжину повідомлення без крайніх пробілів
        if (projectMessage.value.trim().length < 20) {
            formMessage.textContent =
                'Please describe your project in at least 20 characters.';

            projectMessage.focus();
            return;
        }

        const draft = {
            name: userName.value.trim(),
            email: userEmail.value.trim(),
            service: projectService.value,
            message: projectMessage.value.trim()
        };

        try {
            localStorage.setItem(storageKey, JSON.stringify(draft));

            formMessage.textContent =
                'Draft saved on this device. No message has been sent.';
        } catch {
            formMessage.textContent =
                'The draft could not be saved. Please copy your text.';
        }
    });

    // Видалення чернетки
    clearDraft.addEventListener('click', () => {
        try {
            localStorage.removeItem(storageKey);

            contactForm.reset();
            updateCounter();

            formMessage.textContent =
                'Your draft has been cleared.';
        } catch {
            formMessage.textContent =
                'The saved draft could not be removed.';
        }
    });
}