// ДАНІ ПРОЄКТІВ

const projects = [
    {
        id: 'movie-app',
        category: 'application',
        image: 'assets/images/portfolio-imgs/portfolio-img1.png',

        en: {
            title: 'Movie Discovery App',
            alt: 'Dark mobile movie app with film posters and a title details screen',
            description: 'A mobile interface concept for discovering movies and series. Film posters, featured titles and dedicated detail screens help users explore what to watch next.',
            challenge: 'A movie catalogue contains many titles competing for attention. The design challenge is to make browsing comfortable on a small screen while keeping useful information easy to find.',
            approach: 'Use a dark background to emphasise colourful posters and organise titles into clear groups. Give featured content more space and use a separate screen for the selected title and its details.',
            result: 'Mobile navigation, poster-based browsing, title details and consistent visual hierarchy across application screens.',
            link: 'Discuss an application design ↗'
        },

        uk: {
            title: 'Застосунок для пошуку фільмів',
            alt: 'Темний інтерфейс застосунку з постерами фільмів та екраном опису',
            description: 'Концепція мобільного інтерфейсу для пошуку фільмів і серіалів. Постери, рекомендовані добірки та окремі екрани опису допомагають обрати, що подивитися.',
            challenge: 'Каталог фільмів містить багато назв, які змагаються за увагу. Завдання дизайну — зробити перегляд зручним на невеликому екрані та забезпечити швидкий доступ до потрібної інформації.',
            approach: 'Темне тло підкреслює яскраві постери, а зрозумілі групи впорядковують фільми. Рекомендований контент отримує більше простору, а опис вибраного фільму відкривається на окремому екрані.',
            result: 'Мобільна навігація, перегляд за постерами, інформація про фільми та послідовна візуальна ієрархія екранів.',
            link: 'Обговорити дизайн застосунку ↗'
        }
    },

    {
        id: 'furniture-store',
        category: 'website',
        image: 'assets/images/portfolio-imgs/portfolio-img2.png',

        en: {
            title: 'Furniture Store Website',
            alt: 'Furniture store website with a living room image and a chair catalogue',
            description: 'An online furniture store concept combining interior inspiration with product browsing. Large room photography introduces the style, while a clean catalogue keeps individual products easy to explore.',
            challenge: 'Furniture shoppers need both inspiration and a clear view of the products. The page should show how furniture can look in a home while helping visitors move towards the catalogue.',
            approach: 'Combine a large interior photograph with a simple headline and clear navigation. Use a light background, generous spacing and consistent product images to make the catalogue comfortable to scan.',
            result: 'An interior-led homepage, product presentation, catalogue organisation and a consistent shopping interface.',
            link: 'Discuss an online store design ↗'
        },

        uk: {
            title: 'Інтернет-магазин меблів',
            alt: 'Сайт магазину меблів із фотографією вітальні та каталогом крісел',
            description: 'Концепція інтернет-магазину меблів, яка поєднує ідеї для інтер’єру з переглядом товарів. Великі фотографії кімнат передають стиль, а зрозумілий каталог допомагає досліджувати товари.',
            challenge: 'Покупцям меблів потрібні і натхнення, і зрозуміле представлення товарів. Сторінка має показувати меблі в інтер’єрі та допомагати переходити до каталогу.',
            approach: 'Велика фотографія інтер’єру поєднується з простим заголовком і зрозумілою навігацією. Світле тло, достатні відступи та узгоджені зображення спрощують перегляд каталогу.',
            result: 'Головна сторінка з акцентом на інтер’єр, презентація товарів, структура каталогу та узгоджений інтерфейс магазину.',
            link: 'Обговорити дизайн інтернет-магазину ↗'
        }
    },

    {
        id: 'creative-agency',
        category: 'website',
        image: 'assets/images/portfolio-imgs/portfolio-img3.png',

        en: {
            title: 'Creative Agency Website',
            alt: 'Creative agency website with bold typography, project previews and yellow accents',
            description: 'A portfolio website concept for a creative agency. Bold typography, contrasting sections and selected project previews introduce the agency’s personality and its work.',
            challenge: 'An agency website needs to communicate its character and give potential clients a reason to explore further. Strong visual expression should support the work without distracting from it.',
            approach: 'Lead with a confident headline, use project imagery as visual evidence and highlight key actions with yellow accents. Alternate dark and light sections to separate the introduction, studio information and portfolio.',
            result: 'Agency positioning, expressive typography, selected work presentation and clear paths towards a project enquiry.',
            link: 'Discuss an agency website ↗'
        },

        uk: {
            title: 'Сайт творчої агенції',
            alt: 'Сайт творчої агенції з виразною типографікою, проєктами та жовтими акцентами',
            description: 'Концепція сайту-портфоліо творчої агенції. Виразна типографіка, контрастні секції та вибрані роботи знайомлять відвідувачів із характером агенції.',
            challenge: 'Сайт агенції має передавати її характер і заохочувати потенційних клієнтів до подальшого перегляду. Виразний дизайн повинен підтримувати презентацію робіт.',
            approach: 'Виразний заголовок знайомить з агенцією, зображення демонструють роботи, а жовті акценти виділяють основні дії. Чергування темних і світлих секцій відокремлює вступ, інформацію про студію та портфоліо.',
            result: 'Позиціювання агенції, виразна типографіка, презентація вибраних робіт і зрозумілий перехід до обговорення проєкту.',
            link: 'Обговорити сайт агенції ↗'
        }
    }
];


// СПІЛЬНІ ПІДПИСИ КАРТОК

const projectLabels = {
    en: {
        website: 'WEBSITE / CONCEPT STUDY',
        application: 'APPLICATION / CONCEPT STUDY',
        challengeTitle: 'The Challenge',
        approachTitle: 'The Approach',
        resultTitle: 'Design Focus'
    },

    uk: {
        website: 'ВЕБСАЙТ / КОНЦЕПЦІЯ',
        application: 'ЗАСТОСУНОК / КОНЦЕПЦІЯ',
        challengeTitle: 'Завдання',
        approachTitle: 'Підхід',
        resultTitle: 'На чому зосереджено дизайн'
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
const filterButtons = document.querySelectorAll('.filter-btn');

if (
    projectList &&
    projectTemplate &&
    projectSearch &&
    projectSort &&
    resetProjects &&
    projectCount &&
    projectEmpty
) {
    let selectedCategory = 'all';

    function getProjectLanguage() {
        return document.documentElement.lang === 'uk' ? 'uk' : 'en';
    }

    function normalizeText(text) {
        return text.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    }

    // Створення однієї картки
    function createProjectCard(project, language) {
        const fragment = projectTemplate.content.cloneNode(true);
        const card = fragment.querySelector('.project-case');
        const image = card.querySelector('img');

        const text = project[language];
        const labels = projectLabels[language];

        card.dataset.id = project.id;
        card.dataset.category = project.category;

        image.src = project.image;
        image.alt = text.alt;

        const fields = {
            category: labels[project.category],
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
            element.textContent = fields[element.dataset.field];
        });

        return fragment;
    }

    // Пошук, сортування та показ карток
    function renderProjects() {
        const language = getProjectLanguage();
        const searchText = normalizeText(projectSearch.value);

        const visibleProjects = projects.filter((project) => {
            const text = project[language];

            const searchableText = normalizeText(
                `${text.title} ${text.description}`
            );

            const matchesCategory =
                selectedCategory === 'all' ||
                project.category === selectedCategory;

            const matchesSearch = searchableText.includes(searchText);

            return matchesCategory && matchesSearch;
        });

        if (projectSort.value !== 'default') {
            visibleProjects.sort((firstProject, secondProject) => {
                const firstTitle = firstProject[language].title;
                const secondTitle = secondProject[language].title;

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

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === selectedCategory;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        projectCount.textContent = siteLanguage.text(
            'projectCount',
            { count: visibleProjects.length }
        );

        projectEmpty.hidden = visibleProjects.length !== 0;
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

    document.addEventListener('siteLanguageChange', renderProjects);

    renderProjects();
}