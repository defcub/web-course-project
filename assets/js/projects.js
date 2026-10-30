// ТЕКСТИ ІНТЕРФЕЙСУ КАТАЛОГУ

const projectLabels = {
    en: {
        challengeTitle: 'The Challenge',
        approachTitle: 'The Approach',
        resultTitle: 'Design Focus',
        loading: 'Loading projects...',
        error: 'Could not load projects. Please try again.',
        retry: 'Try again',
        empty: 'No projects have been added yet.',
        noResults: 'No projects found. Try another search or category.'
    },

    uk: {
        challengeTitle: 'Завдання',
        approachTitle: 'Підхід',
        resultTitle: 'На чому зосереджено дизайн',
        loading: 'Завантажуємо проєкти...',
        error: 'Не вдалося завантажити проєкти. Спробуй ще раз.',
        retry: 'Спробувати ще раз',
        empty: 'Проєктів поки не додано.',
        noResults: 'Проєктів не знайдено. Спробуй інший запит або категорію.'
    }
};


// ЕЛЕМЕНТИ СТОРІНКИ

const projectList = document.getElementById('projectList');
const projectTemplate = document.getElementById('projectTemplate');
const projectSearch = document.getElementById('projectSearch');
const projectSort = document.getElementById('projectSort');
const resetProjects = document.getElementById('resetProjects');
const projectCount = document.getElementById('projectCount');
const projectEmpty = document.getElementById('projectEmpty');
const projectStatus = document.getElementById('projectStatus');
const retryProjects = document.getElementById('retryProjects');
const filterButtons = document.querySelectorAll('.filter-btn');

if (
    projectList &&
    projectTemplate &&
    projectSearch &&
    projectSort &&
    resetProjects &&
    projectCount &&
    projectEmpty &&
    projectStatus &&
    retryProjects
) {
    let projects = [];
    let selectedCategory = 'all';
    let loadState = 'loading';

    function getProjectLanguage() {
        return document.documentElement.lang === 'uk' ? 'uk' : 'en';
    }

    function normalizeText(text) {
        return text.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    }

    // Перевіряє дані, отримані з бази
function validateProjects(data) {
    const fields = [
        'title',
        'description',
        'challenge',
        'approach',
        'result',
        'link',
        'alt'
    ];

    function isCompleteContent(content) {
        return content &&
            typeof content === 'object' &&
            !Array.isArray(content) &&
            fields.every(field => {
                return typeof content[field] === 'string' &&
                    content[field].trim().length > 0;
            });
    }

    if (!Array.isArray(data)) {
        throw new Error('Некоректний список проєктів.');
    }

    return data.map(project => {
        if (
            !project ||
            typeof project.image_path !== 'string' ||
            !project.categories ||
            typeof project.categories.slug !== 'string' ||
            typeof project.categories.name_en !== 'string' ||
            typeof project.categories.name_uk !== 'string' ||
            !isCompleteContent(project.content_uk)
        ) {
            throw new Error('Некоректна структура даних проєкту.');
        }

        const hasEnglish = isCompleteContent(project.content_en);
        return {
            ...project,
            hasEnglish: hasEnglish,
            content_en: hasEnglish ? project.content_en : project.content_uk
        };
    });
}

    // Створення однієї картки
    function createProjectCard(project, language) {
        const fragment = projectTemplate.content.cloneNode(true);
        const card = fragment.querySelector('.project-case');
        const image = card.querySelector('img');

        const text = project[`content_${language}`];
        const labels = projectLabels[language];

        const contentLanguage = language === 'en' && project.hasEnglish? 'en': 'uk';
        if (language === 'en' && !project.hasEnglish) {
            const notice = document.createElement('p');

            notice.className = 'page-text';
            notice.lang = 'en';
            notice.textContent = 'English translation is not available yet. Original Ukrainian text is shown.';

            fragment.querySelector('.project-content').prepend(notice);
        }

        card.dataset.id = project.id;
        card.dataset.category = project.categories.slug;

        image.src = project.image_path;
        image.alt = text.alt;

        const fields = {
            category: project.categories[`name_${language}`],
            title: text.title,
            description: text.description,
            challengeTitle: labels.challengeTitle,
            challenge: text.challenge,
            approachTitle: labels.approachTitle,
            approach: text.approach,
            resultTitle: labels.resultTitle,
            result: text.result,
            link: text.link
        };

        card.querySelectorAll('[data-field]').forEach((element) => {
            const field = element.dataset.field;
            element.textContent = fields[field];
            if (['title', 'description', 'challenge', 'approach', 'result', 'link'].includes(field)) {
                element.lang = contentLanguage;
            }
        });

        return fragment;
    }

    // Оновлення стану та вмісту каталогу
    function renderProjects() {
        const language = getProjectLanguage();
        const labels = projectLabels[language];
        const isReady = loadState === 'ready';

        projectSearch.disabled = !isReady;
        projectSort.disabled = !isReady;
        resetProjects.disabled = !isReady;

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === selectedCategory;

            button.disabled = !isReady;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        projectList.setAttribute(
            'aria-busy',
            String(loadState === 'loading')
        );

        retryProjects.textContent = labels.retry;
        retryProjects.hidden = loadState !== 'error';
        projectCount.hidden = !isReady;
        projectEmpty.hidden = true;
        projectStatus.textContent = '';

        if (!isReady) {
            projectList.replaceChildren();

            projectStatus.textContent = loadState === 'loading'
                ? labels.loading
                : labels.error;

            return;
        }

        const searchText = normalizeText(projectSearch.value);

        const visibleProjects = projects.filter((project) => {
            const text = project[`content_${language}`];

            const searchableText = normalizeText(
                `${text.title} ${text.description}`
            );

            const matchesCategory =
                selectedCategory === 'all' ||
                project.categories.slug === selectedCategory;

            const matchesSearch = searchableText.includes(searchText);

            return matchesCategory && matchesSearch;
        });

        if (projectSort.value !== 'default') {
            visibleProjects.sort((firstProject, secondProject) => {
                const firstTitle = firstProject[`content_${language}`].title;
                const secondTitle = secondProject[`content_${language}`].title;

                const result = firstTitle.localeCompare(
                    secondTitle,
                    language,
                    { sensitivity: 'base' }
                );

                return projectSort.value === 'az' ? result : -result;
            });
        }

        const fragment = document.createDocumentFragment();

        visibleProjects.forEach((project) => {
            fragment.append(createProjectCard(project, language));
        });

        projectList.replaceChildren(fragment);

        projectCount.textContent = siteLanguage.text(
            'projectCount',
            { count: visibleProjects.length }
        );

        projectEmpty.textContent = projects.length === 0
            ? labels.empty
            : labels.noResults;

        projectEmpty.hidden = visibleProjects.length !== 0;
    }

    // Отримання даних із Supabase
    async function loadProjects() {
        if (loadState === 'loading' && retryProjects.disabled) {
            return;
        }

        loadState = 'loading';
        retryProjects.disabled = true;
        renderProjects();

        try {
            const data = await getDatabaseProjects();

            projects = validateProjects(data);
            loadState = 'ready';
        } catch (error) {
            projects = [];
            loadState = 'error';

            console.warn('Завантаження проєктів:', error.message);
        } finally {
            retryProjects.disabled = false;
            renderProjects();
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedCategory = button.dataset.filter;
            renderProjects();
        });
    });

    projectSearch.addEventListener('input', renderProjects);
    projectSort.addEventListener('change', renderProjects);

    resetProjects.addEventListener('click', () => {
        selectedCategory = 'all';
        projectSearch.value = '';
        projectSort.value = 'default';

        renderProjects();
        projectSearch.focus();
    });

    retryProjects.addEventListener('click', loadProjects);

    document.addEventListener('siteLanguageChange', renderProjects);

    loadProjects();
}