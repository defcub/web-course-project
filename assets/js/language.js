const languageMessages = {
    menuOpen: [
        'Open navigation',
        'Відкрити меню'
    ],

    menuClose: [
        'Close navigation',
        'Закрити меню'
    ],

    projectCount: [
        'Projects shown: {count}',
        'Показано проєктів: {count}'
    ],

    draftRestored: [
        'Your saved draft has been restored.',
        'Збережену чернетку відновлено.'
    ],

    draftLoadError: [
        'Your saved draft could not be loaded.',
        'Не вдалося завантажити збережену чернетку.'
    ],

    draftSaved: [
        'Draft saved on this device. No message has been sent.',
        'Чернетку збережено на цьому пристрої. Повідомлення не надсилалося.'
    ],

    draftSaveError: [
        'The draft could not be saved. Please copy your text.',
        'Не вдалося зберегти чернетку. Скопіюй свій текст.'
    ],

    draftCleared: [
        'Your draft has been cleared.',
        'Чернетку видалено.'
    ],

    draftClearError: [
        'The saved draft could not be removed.',
        'Не вдалося видалити збережену чернетку.'
    ],

    requestValid: [
        'The form is valid. Sending data to a server is not connected yet.',
        'Дані заповнені правильно. Надсилання на сервер ще не підключено.'
    ],

    fieldRequired: [
        'Please complete this field.',
        'Будь ласка, заповни це поле.'
    ],

    serviceRequired: [
        'Please choose a service.',
        'Будь ласка, обери послугу.'
    ],

    emailInvalid: [
        'Please enter a valid email address.',
        'Введи коректну адресу електронної пошти.'
    ],

    fieldTooShort: [
        'Enter at least {min} characters, excluding surrounding spaces.',
        'Введи щонайменше {min} символів без крайніх пробілів.'
    ],

    fieldTooLong: [
        'Enter no more than {max} characters.',
        'Введи не більше {max} символів.'
    ],

    consentRequired: [
        'Please confirm this checkbox to continue.',
        'Для продовження постав цю позначку.'
    ]
};


// СПІЛЬНІ ПЕРЕКЛАДИ

const commonTranslations = [
    [
        '.nav-menu a[href="index.html"]',
        'Home',
        'Головна'
    ],
    [
        '.nav-menu a[href="services.html"], .footer-nav a[href="services.html"]',
        'Services',
        'Послуги'
    ],
    [
        '.nav-menu a[href="projects.html"]',
        'Our Projects',
        'Проєкти'
    ],
    [
        '.footer-nav a[href="projects.html"]',
        'Projects',
        'Проєкти'
    ],
    [
        '.nav-menu a[href="about.html"], .footer-nav a[href="about.html"]',
        'About us',
        'Про нас'
    ],
    [
        '.main-header a[href="contact.html"], .footer-nav a[href="contact.html"]',
        'Contact us',
        'Контакти'
    ],
    [
        '.copyright',
        '© 2026 Enver. Student project.',
        '© 2026 Enver. Навчальний проєкт.'
    ],
    [
        '.nav-menu',
        'Main navigation',
        'Основна навігація',
        'aria-label'
    ],
    [
        '.footer-nav',
        'Footer navigation',
        'Навігація в підвалі',
        'aria-label'
    ],
    [
        'a.logo',
        'Enver home',
        'Enver — головна',
        'aria-label'
    ],
    [
        '.language-switcher',
        'Website language',
        'Мова сайту',
        'aria-label'
    ],
    [
        '.logo img, .floating-icon, .vector-waves, #iconOpen',
        '',
        '',
        'alt'
    ]
];


// ПЕРЕКЛАДИ СТОРІНОК

const pageTranslations = {
    '404.html': [
        [
            'title',
            '404 — Page Not Found | Enver',
            '404 — Сторінку не знайдено | Enver'
        ],
        [
            'meta[name="description"]',
            'The page could not be found. Return to the Enver homepage or explore our projects.',
            'Сторінку не знайдено. Повернися на головну сторінку Enver або переглянь наші проєкти.',
            'content'
        ],
        [
            '.error-title',
            'Page not found',
            'Сторінку не знайдено'
        ],
        [
            '.error-description',
            'The page may have been moved, deleted, or the address may contain a mistake. You can return to the homepage or explore our projects.',
            'Можливо, сторінку перемістили чи видалили, або в адресі є помилка. Ти можеш повернутися на головну або переглянути наші проєкти.'
        ],
        [
            '.error-home-link',
            'Back to Home',
            'На головну'
        ],
        [
            '.error-projects-link',
            'View Projects',
            'Переглянути проєкти'
        ]
    ],
    'index.html': [
        [
            'title',
            'Enver — Digital Design and Development Studio',
            'Enver — студія цифрового дизайну та розробки'
        ],
        [
            'meta[name="description"]',
            'Explore Enver, a concept digital studio offering web development, UI/UX design and visual content. Discover our services, projects and approach.',
            'Дізнайся про Enver — концептуальну цифрову студію розробки сайтів, UI/UX-дизайну та візуального контенту. Переглянь послуги, проєкти та підхід до роботи.',
            'content'
        ],
        [
            '.hero-title',
            'Build Your\nAwesome\nPlatform',
            'Створюємо\nцифрові\nрішення'
        ],
        [
            '.hero-subtitle',
            'Enver is a digital studio offering web development, UI/UX design and visual content. We help turn your ideas into useful digital experiences.',
            'Enver — цифрова студія розробки сайтів, UI/UX-дизайну та візуального контенту. Допомагаємо перетворювати твої ідеї на зручні цифрові продукти.'
        ],
        [
            '.hero-button-text',
            'Our Services',
            'Наші послуги'
        ],
        [
            '.hero-guy',
            'A smiling man pointing towards the studio introduction',
            'Усміхнений чоловік вказує на презентацію студії',
            'alt'
        ],
        [
            '.video-section .section-title',
            'Why Enver Is The\nBest Choice?',
            'Чому варто\nобрати Enver?'
        ],
        [
            '.video-section .section-subtitle',
            'We bring design, development and creative ideas together to build thoughtful digital products.',
            'Поєднуємо дизайн, розробку та творчі ідеї, щоб створювати продумані цифрові продукти.'
        ],
        [
            '.video-thumbnail',
            'A team discussing a digital project',
            'Команда обговорює цифровий проєкт',
            'alt'
        ],
        [
            '.video-play-btn',
            'Play the studio presentation',
            'Відтворити презентацію студії',
            'aria-label'
        ],
        [
            '.video-play-btn img, .hero-content .btn-primary img',
            '',
            '',
            'alt'
        ],
        [
            '.services-section .section-title',
            'The Services We\nProvide For You',
            'Послуги для\nтвого проєкту'
        ],
        [
            '.service-card .card-title',
            [
                'Development',
                'UI/UX Design',
                'Graphic Design',
                'Motion Design',
                'Photography',
                'Videography'
            ],
            [
                'Розробка сайтів',
                'UI/UX-дизайн',
                'Графічний дизайн',
                'Моушн-дизайн',
                'Фотографія',
                'Відеозйомка'
            ]
        ],
        [
            '.service-card .card-desc',
            [
                'We create responsive websites with clear structure and useful features.',
                'We design clear interfaces that help people reach their goals.',
                'We create visual materials that communicate your brand.',
                'We bring ideas to life through animation and moving graphics.',
                'We create photographs for products, brands and digital projects.',
                'We develop video content that tells your story.'
            ],
            [
                'Створюємо адаптивні сайти зі зрозумілою структурою та корисними функціями.',
                'Проєктуємо зрозумілі інтерфейси, які допомагають користувачам досягати мети.',
                'Створюємо візуальні матеріали, які передають характер твого бренду.',
                'Оживляємо ідеї за допомогою анімації та рухомої графіки.',
                'Створюємо фотографії для товарів, брендів і цифрових проєктів.',
                'Розробляємо відеоконтент, який розповідає твою історію.'
            ]
        ],
        [
            '.service-card .icon-wrap img',
            '',
            '',
            'alt'
        ],
        [
            '.portfolio-title',
            'Our Awesome\nPortfolio',
            'Наші\nпроєкти'
        ],
        [
            '.portfolio-slide',
            [
                'Movie discovery application interface',
                'Furniture store website',
                'Creative agency website'
            ],
            [
                'Інтерфейс застосунку для пошуку фільмів',
                'Сайт інтернет-магазину меблів',
                'Сайт творчої агенції'
            ],
            'alt'
        ],
        [
            '#btnPrev',
            'Previous project',
            'Попередній проєкт',
            'aria-label'
        ],
        [
            '#btnNext',
            'Next project',
            'Наступний проєкт',
            'aria-label'
        ],
        [
            '#btnPrev img, #btnNext img',
            '',
            '',
            'alt'
        ],
        [
            '.contact-title',
            'Contact us for the service you want to use',
            'Розкажи про свою ідею — обговорімо її реалізацію'
        ],
        [
            '.contact-btn',
            'Contact us',
            'Зв’язатися'
        ]
    ],

    'services.html': [
        [
            'title',
            'Services — Enver',
            'Послуги — Enver'
        ],
        [
            'meta[name="description"]',
            'Explore Enver services: UI/UX design, web development, branding and motion. Learn about deliverables, project stages and frequently asked questions.',
            'Ознайомся з послугами Enver: UI/UX-дизайном, розробкою сайтів, брендингом та анімацією. Дізнайся про результати роботи, етапи проєкту й поширені запитання.',
            'content'
        ],
        [
            '.page-heading .page-label',
            'OUR SERVICES',
            'НАШІ ПОСЛУГИ'
        ],
        [
            '.page-title',
            'From Your Idea\nTo a Digital Product',
            'Від твоєї ідеї\nдо цифрового продукту'
        ],
        [
            '.page-description',
            'We help businesses create useful websites, clear interfaces and memorable visual identities. Explore what we can do for your project.',
            'Допомагаємо бізнесу створювати корисні сайти, зрозумілі інтерфейси та впізнаваний візуальний стиль. Дізнайся, що ми можемо зробити для твого проєкту.'
        ],
        [
            '.service-info .page-label',
            [
                '01 / DESIGN',
                '02 / DEVELOPMENT',
                '03 / VISUAL CONTENT'
            ],
            [
                '01 / ДИЗАЙН',
                '02 / РОЗРОБКА',
                '03 / ВІЗУАЛЬНИЙ КОНТЕНТ'
            ]
        ],
        [
            '.service-info .page-section-title',
            [
                'UI/UX Design',
                'Web Development',
                'Branding & Motion'
            ],
            [
                'UI/UX-дизайн',
                'Розробка сайтів',
                'Брендинг та анімація'
            ]
        ],
        [
            '.service-info .page-text',
            [
                'A good interface helps people reach their goals without confusion. We plan the structure of your product and turn it into a clear visual experience.',
                'We turn approved designs into responsive websites. Our focus is clear structure, comfortable navigation and interactions that work across different devices.',
                'Give your brand a recognisable character. We combine graphic design and animation to explain your ideas and bring your communication to life.'
            ],
            [
                'Хороший інтерфейс допомагає людям досягати мети без зайвих труднощів. Продумуємо структуру продукту та перетворюємо її на зрозумілий візуальний досвід.',
                'Перетворюємо погоджений дизайн на адаптивний сайт. Зосереджуємося на зрозумілій структурі, зручній навігації та взаємодії на різних пристроях.',
                'Допомагаємо бренду стати впізнаваним. Поєднуємо графічний дизайн та анімацію, щоб пояснювати твої ідеї та оживляти комунікацію.'
            ]
        ],
        [
            '.service-info .page-link',
            [
                'Discuss your design project ↗',
                'Discuss your website ↗',
                'Discuss your creative project ↗'
            ],
            [
                'Обговорити дизайн проєкту ↗',
                'Обговорити розробку сайту ↗',
                'Обговорити творчий проєкт ↗'
            ]
        ],
        [
            '.service-deliverables h3',
            'What you get',
            'Що ти отримаєш'
        ],
        [
            '.service-deliverables .feature-list li',
            [
                'Audience and user journey research',
                'Page structure and wireframes',
                'Desktop and mobile interface designs',
                'Interactive Figma prototype',
                'Semantic HTML structure',
                'Responsive layouts for different screens',
                'Interactive JavaScript elements',
                'Website testing and launch preparation',
                'Visual identity and colour palette',
                'Social media graphics',
                'Storyboards and animation concepts',
                'Short promotional videos'
            ],
            [
                'Дослідження аудиторії та шляху користувача',
                'Структуру сторінок і схематичні макети',
                'Дизайн інтерфейсу для комп’ютерів і смартфонів',
                'Інтерактивний прототип у Figma',
                'Семантичну HTML-структуру',
                'Адаптивну верстку для різних екранів',
                'Інтерактивні елементи на JavaScript',
                'Тестування сайту та підготовку до запуску',
                'Візуальний стиль і палітру кольорів',
                'Графіку для соціальних мереж',
                'Розкадрування та концепції анімації',
                'Короткі рекламні відео'
            ]
        ],
        [
            '.page-section > .content-wrap > .page-label',
            'OUR PROCESS',
            'ЕТАПИ РОБОТИ'
        ],
        [
            '.page-section > .content-wrap > .page-section-title',
            [
                'How We Work',
                'Frequently Asked Questions'
            ],
            [
                'Як ми працюємо',
                'Поширені запитання'
            ]
        ],
        [
            '.process-card h3',
            [
                'Discovery',
                'Concept',
                'Production',
                'Delivery'
            ],
            [
                'Знайомство',
                'Концепція',
                'Реалізація',
                'Передавання'
            ]
        ],
        [
            '.process-card p',
            [
                'We discuss your audience, business goals and project requirements.',
                'We explore ideas and agree on the structure and visual direction.',
                'We create the designs and build the project with regular feedback.',
                'We test the result and prepare the final files for handover.'
            ],
            [
                'Обговорюємо твою аудиторію, бізнес-цілі та вимоги до проєкту.',
                'Досліджуємо ідеї та погоджуємо структуру й візуальний напрям.',
                'Створюємо дизайн і реалізуємо проєкт із регулярним обговоренням результатів.',
                'Перевіряємо результат і готуємо фінальні файли для передавання.'
            ]
        ],
        [
            '.faq-item summary',
            [
                'Can I order only one service?',
                'What do I need before starting?',
                'How long does a project take?'
            ],
            [
                'Чи можна замовити лише одну послугу?',
                'Що потрібно підготувати перед початком?',
                'Скільки часу займає робота?'
            ]
        ],
        [
            '.faq-item p',
            [
                'Yes. You can start with a single service, such as interface design or website development.',
                'Prepare a short description of your idea, your target audience and a few visual references.',
                'The timeline depends on the number of pages, required features and the review process. We agree on a schedule after discussing the brief.'
            ],
            [
                'Так. Можна почати з однієї послуги, наприклад дизайну інтерфейсу або розробки сайту.',
                'Підготуй короткий опис ідеї, інформацію про цільову аудиторію та кілька візуальних прикладів.',
                'Тривалість залежить від кількості сторінок, потрібних функцій і процесу погодження. Графік визначаємо після обговорення брифу.'
            ]
        ]
    ],

    'projects.html': [

                [
            'label[for="projectSearch"]',
            'Search projects',
            'Пошук проєктів'
        ],
        [
            '#projectSearch',
            'Enter a title or description',
            'Введи назву або опис',
            'placeholder'
        ],
        [
            'label[for="projectSort"]',
            'Sort projects',
            'Сортування проєктів'
        ],
        [
            '#projectSort option[value="default"]',
            'Default order',
            'Початковий порядок'
        ],
        [
            '#projectSort option[value="az"]',
            'Title: A–Z',
            'Назва: А–Я'
        ],
        [
            '#projectSort option[value="za"]',
            'Title: Z–A',
            'Назва: Я–А'
        ],
        [
            '#resetProjects',
            'Reset',
            'Скинути'
        ],
        [
            '#projectEmpty',
            'No projects found. Try another search or category.',
            'Проєктів не знайдено. Спробуй інший запит або категорію.'
        ],

        [
            'title',
            'Our Projects — Enver',
            'Наші проєкти — Enver'
        ],
        [
            'meta[name="description"]',
            'Discover Enver concept projects: a movie discovery app, a furniture store and a creative agency website. Explore their challenges and design approaches.',
            'Переглянь навчальні проєкти Enver: застосунок для пошуку фільмів, інтернет-магазин меблів і сайт творчої агенції. Дізнайся про завдання та підходи до дизайну.',
            'content'
        ],
        [
            '.page-heading .page-label',
            'OUR PROJECTS',
            'НАШІ ПРОЄКТИ'
        ],
        [
            '.page-title',
            'Explore the Thinking\nBehind Our Work',
            'Ідеї та рішення\nза нашими проєктами'
        ],
        [
            '.page-description',
            'Explore a movie discovery app, a furniture store and a creative agency website. These illustrative case studies describe design ideas based on the portfolio visuals.',
            'Переглянь застосунок для пошуку фільмів, інтернет-магазин меблів і сайт творчої агенції. Ці навчальні описи пояснюють ідеї дизайну на основі зображень портфоліо.'
        ],
        [
            '.project-filters',
            'Filter projects',
            'Фільтрування проєктів',
            'aria-label'
        ],
        [
            '.filter-btn[data-filter="all"]',
            'All Projects',
            'Усі проєкти'
        ],
        [
            '.filter-btn[data-filter="website"]',
            'Websites',
            'Вебсайти'
        ],
        [
            '.filter-btn[data-filter="application"]',
            'Applications',
            'Застосунки'
        ],
        [
            '.project-preview img',
            [
                'Dark mobile movie app with film posters and a title details screen',
                'Furniture store website with a living room image and a chair catalogue',
                'Creative agency website with bold typography, project previews and yellow accents'
            ],
            [
                'Темний інтерфейс застосунку з постерами фільмів та екраном опису',
                'Сайт магазину меблів із фотографією вітальні та каталогом крісел',
                'Сайт творчої агенції з виразною типографікою, проєктами та жовтими акцентами'
            ],
            'alt'
        ],
        [
            '.project-content > .page-label',
            [
                'APPLICATION / CONCEPT STUDY',
                'WEBSITE / CONCEPT STUDY',
                'WEBSITE / CONCEPT STUDY'
            ],
            [
                'ЗАСТОСУНОК / КОНЦЕПЦІЯ',
                'ВЕБСАЙТ / КОНЦЕПЦІЯ',
                'ВЕБСАЙТ / КОНЦЕПЦІЯ'
            ]
        ],
        [
            '.project-content > .page-section-title',
            [
                'Movie Discovery App',
                'Furniture Store Website',
                'Creative Agency Website'
            ],
            [
                'Застосунок для пошуку фільмів',
                'Інтернет-магазин меблів',
                'Сайт творчої агенції'
            ]
        ],
        [
            '.project-content > .page-text',
            [
                'A mobile interface concept for discovering movies and series. Film posters, featured titles and dedicated detail screens help users explore what to watch next.',
                'An online furniture store concept combining interior inspiration with product browsing. Large room photography introduces the style, while a clean catalogue keeps individual products easy to explore.',
                'A portfolio website concept for a creative agency. Bold typography, contrasting sections and selected project previews introduce the agency’s personality and its work.'
            ],
            [
                'Концепція мобільного інтерфейсу для пошуку фільмів і серіалів. Постери, рекомендовані добірки та окремі екрани опису допомагають обрати, що подивитися.',
                'Концепція інтернет-магазину меблів, яка поєднує ідеї для інтер’єру з переглядом товарів. Великі фотографії кімнат передають стиль, а зрозумілий каталог допомагає досліджувати товари.',
                'Концепція сайту-портфоліо творчої агенції. Виразна типографіка, контрастні секції та вибрані роботи знайомлять відвідувачів із характером агенції.'
            ]
        ],
        [
            '.project-description-grid h3',
            [
                'The Challenge',
                'The Approach',
                'The Challenge',
                'The Approach',
                'The Challenge',
                'The Approach'
            ],
            [
                'Завдання',
                'Підхід',
                'Завдання',
                'Підхід',
                'Завдання',
                'Підхід'
            ]
        ],
        [
            '.project-description-grid p',
            [
                'A movie catalogue contains many titles competing for attention. The design challenge is to make browsing comfortable on a small screen while keeping useful information easy to find.',
                'Use a dark background to emphasise colourful posters and organise titles into clear groups. Give featured content more space and use a separate screen for the selected title and its details.',
                'Furniture shoppers need both inspiration and a clear view of the products. The page should show how furniture can look in a home while helping visitors move towards the catalogue.',
                'Combine a large interior photograph with a simple headline and clear navigation. Use a light background, generous spacing and consistent product images to make the catalogue comfortable to scan.',
                'An agency website needs to communicate its character and give potential clients a reason to explore further. Strong visual expression should support the work without distracting from it.',
                'Lead with a confident headline, use project imagery as visual evidence and highlight key actions with yellow accents. Alternate dark and light sections to separate the introduction, studio information and portfolio.'
            ],
            [
                'Каталог фільмів містить багато назв, які змагаються за увагу. Завдання дизайну — зробити перегляд зручним на невеликому екрані та забезпечити швидкий доступ до потрібної інформації.',
                'Темне тло підкреслює яскраві постери, а зрозумілі групи впорядковують фільми. Рекомендований контент отримує більше простору, а опис вибраного фільму відкривається на окремому екрані.',
                'Покупцям меблів потрібні і натхнення, і зрозуміле представлення товарів. Сторінка має показувати меблі в інтер’єрі та допомагати переходити до каталогу.',
                'Велика фотографія інтер’єру поєднується з простим заголовком і зрозумілою навігацією. Світле тло, достатні відступи та узгоджені зображення спрощують перегляд каталогу.',
                'Сайт агенції має передавати її характер і заохочувати потенційних клієнтів до подальшого перегляду. Виразний дизайн повинен підтримувати презентацію робіт.',
                'Виразний заголовок знайомить з агенцією, зображення демонструють роботи, а жовті акценти виділяють основні дії. Чергування темних і світлих секцій відокремлює вступ, інформацію про студію та портфоліо.'
            ]
        ],
        [
            '.project-result h3',
            'Design Focus',
            'На чому зосереджено дизайн'
        ],
        [
            '.project-result p',
            [
                'Mobile navigation, poster-based browsing, title details and consistent visual hierarchy across application screens.',
                'An interior-led homepage, product presentation, catalogue organisation and a consistent shopping interface.',
                'Agency positioning, expressive typography, selected work presentation and clear paths towards a project enquiry.'
            ],
            [
                'Мобільна навігація, перегляд за постерами, інформація про фільми та послідовна візуальна ієрархія екранів.',
                'Головна сторінка з акцентом на інтер’єр, презентація товарів, структура каталогу та узгоджений інтерфейс магазину.',
                'Позиціювання агенції, виразна типографіка, презентація вибраних робіт і зрозумілий перехід до обговорення проєкту.'
            ]
        ],
        [
            '.project-content > .page-link',
            [
                'Discuss an application design ↗',
                'Discuss an online store design ↗',
                'Discuss an agency website ↗'
            ],
            [
                'Обговорити дизайн застосунку ↗',
                'Обговорити дизайн інтернет-магазину ↗',
                'Обговорити сайт агенції ↗'
            ]
        ]
    ],

    'about.html': [
        [
            'title',
            'About the Studio — Enver',
            'Про студію — Enver'
        ],
        [
            'meta[name="description"]',
            'Learn about Enver, a concept digital studio created for a student project. Explore its approach, design principles and the roles behind a digital product.',
            'Дізнайся про Enver — концептуальну цифрову студію навчального проєкту. Ознайомся з підходом до роботи, принципами дизайну та ролями у створенні продукту.',
            'content'
        ],
        [
            '.page-heading .page-label',
            'ABOUT ENVER',
            'ПРО ENVER'
        ],
        [
            '.page-title',
            'Creative Thinking.\nMeaningful Experiences.',
            'Творчі ідеї.\nПродумані рішення.'
        ],
        [
            '.page-description',
            'Enver is a concept digital studio where design, development and visual storytelling work together.',
            'Enver — концептуальна цифрова студія, у якій поєднуються дизайн, розробка та візуальна розповідь.'
        ],
        [
            '.about-content > .page-label',
            [
                'OUR STORY',
                'OUR WORKING MODEL'
            ],
            [
                'НАША ІСТОРІЯ',
                'ЯК ОРГАНІЗОВАНА РОБОТА'
            ]
        ],
        [
            '.about-content > .page-section-title',
            [
                'Every Project Starts With Understanding',
                'Different Skills.\nOne Shared Goal.'
            ],
            [
                'Кожен проєкт починається з розуміння',
                'Різні навички.\nСпільна мета.'
            ]
        ],
        [
            '.about-content > .page-text',
            [
                'Before choosing colours or writing code, we ask questions. Who will use the product? What do they need? What should feel easier?',
                'These answers guide the structure, visual style and functionality of the final experience. Our goal is to connect a clear message with a practical, thoughtful design.',
                'This website presents an illustrative studio created for a student course project.',
                'A digital project combines several responsibilities. Each one contributes to a useful and consistent result, from the first brief to the final checks.'
            ],
            [
                'Перш ніж обирати кольори або писати код, ми ставимо запитання. Хто користуватиметься продуктом? Які потреби має ця аудиторія? Що потрібно спростити?',
                'Відповіді визначають структуру, візуальний стиль і функціональність продукту. Наша мета — поєднати зрозуміле повідомлення з практичним і продуманим дизайном.',
                'Цей сайт представляє умовну студію, створену для навчального курсового проєкту.',
                'Цифровий проєкт поєднує декілька напрямів роботи. Кожен із них допомагає створити корисний і послідовний результат — від першого брифу до фінальних перевірок.'
            ]
        ],
        [
            '.about-photo img',
            'A team sharing ideas during a project discussion',
            'Команда обмінюється ідеями під час обговорення проєкту',
            'alt'
        ],
        [
            '.about-photo figcaption',
            'Sharing ideas is part of every creative process.',
            'Обмін ідеями — частина кожного творчого процесу.'
        ],
        [
            '.page-section > .content-wrap > .page-label',
            'OUR PRINCIPLES',
            'НАШІ ПРИНЦИПИ'
        ],
        [
            '.page-section > .content-wrap > .page-section-title',
            'What Matters to Us',
            'Що для нас важливо'
        ],
        [
            '.value-card h3',
            [
                'Clarity',
                'Consistency',
                'Collaboration'
            ],
            [
                'Зрозумілість',
                'Послідовність',
                'Співпраця'
            ]
        ],
        [
            '.value-card p',
            [
                'Every page should have a clear purpose. We organise content so people can understand the message and find their next step.',
                'Typography, colours and interactions should work together across every page and screen. A familiar interface makes a product easier to use.',
                'We explain our decisions, listen to feedback and connect changes to the project goals. Good communication keeps the work focused.'
            ],
            [
                'Кожна сторінка повинна мати зрозумілу мету. Організовуємо контент так, щоб люди розуміли повідомлення та знали, що робити далі.',
                'Типографіка, кольори та взаємодія мають узгоджуватися на всіх сторінках і екранах. Знайомий інтерфейс спрощує користування продуктом.',
                'Пояснюємо рішення, прислухаємося до відгуків і пов’язуємо зміни з цілями проєкту. Зрозуміла комунікація допомагає зосередитися на результаті.'
            ]
        ],
        [
            '.studio-role h3',
            [
                'Strategy & Content',
                'Design & Motion',
                'Development & Testing'
            ],
            [
                'Стратегія та контент',
                'Дизайн та анімація',
                'Розробка та тестування'
            ]
        ],
        [
            '.studio-role p',
            [
                'Research the audience, define the goals and organise the information.',
                'Create the visual language, plan interactions and develop animation concepts.',
                'Build the website and check its layouts, navigation and functionality.'
            ],
            [
                'Дослідження аудиторії, визначення цілей та впорядкування інформації.',
                'Створення візуальної мови, планування взаємодії та розробка концепцій анімації.',
                'Розробка сайту та перевірка верстки, навігації й функціональності.'
            ]
        ],
        [
            '.page-banner .page-section-title',
            'Explore Our Approach in Practice',
            'Наш підхід на практиці'
        ],
        [
            '.page-banner .page-text',
            'Discover the ideas and decisions behind our concept projects.',
            'Дізнайся про ідеї та рішення, які лежать в основі наших концептуальних проєктів.'
        ],
        [
            '.page-banner .btn',
            'View Projects ↗',
            'Переглянути проєкти ↗'
        ]
    ],

    'contact.html': [
        [
            'title',
            'Contact and Project Brief — Enver',
            'Контакти та заявка на проєкт — Enver'
        ],
        [
            'meta[name="description"]',
            'Prepare a project brief for Enver, choose a service and describe your idea. Save a draft on your device or try the demonstration project enquiry form.',
            'Підготуй бриф проєкту для Enver: обери послугу та опиши свою ідею. Збережи чернетку на пристрої або перевір демонстраційну форму обговорення проєкту.',
            'content'
        ],
        [
            '.page-heading .page-label',
            'CONTACT US',
            'КОНТАКТИ'
        ],
        [
            '.page-title',
            'Tell Us About\nYour Next Project',
            'Розкажи про\nсвій наступний проєкт'
        ],
        [
            '.page-description',
            'Start with your idea, your audience and what you want to achieve. Use this form to prepare a project brief.',
            'Почни зі своєї ідеї, аудиторії та результату, якого хочеш досягти. Скористайся формою, щоб підготувати бриф проєкту.'
        ],
        [
            '#openRequestModal',
            'Discuss a Project',
            'Обговорити проєкт'
        ],
        [
            '.contact-information > .page-section-title',
            'Where to Start?',
            'Із чого почати?'
        ],
        [
            '.contact-information > .page-text',
            'You do not need a complete specification. A few important details will help explain your idea.',
            'Не обов’язково мати готове технічне завдання. Кілька важливих деталей допоможуть пояснити твою ідею.'
        ],
        [
            '.contact-tip h3',
            [
                'Describe Your Goal',
                'Introduce Your Audience',
                'Define the Scope'
            ],
            [
                'Опиши мету',
                'Розкажи про аудиторію',
                'Визнач обсяг роботи'
            ]
        ],
        [
            '.contact-tip p',
            [
                'What problem should the website or design solve?',
                'Who will use the product and what do they need?',
                'List the pages, features or visual materials you would like to create.'
            ],
            [
                'Яку проблему повинен вирішувати сайт або дизайн?',
                'Хто користуватиметься продуктом і які потреби має ця аудиторія?',
                'Перелічи сторінки, функції або візуальні матеріали, які хочеш створити.'
            ]
        ],
        [
            '.form-notice h3',
            'Demo Form',
            'Демонстраційна форма'
        ],
        [
            '.form-notice p',
            'This form saves a draft in your browser. It does not send an email or contact a server.',
            'Ця форма зберігає чернетку у твоєму браузері. Вона не надсилає електронного листа та не передає дані на сервер.'
        ],
        [
            '#contactForm h2',
            'Project Brief',
            'Бриф проєкту'
        ],
        [
            '#contactForm > .page-text',
            'Fields marked * are required.',
            'Поля, позначені *, обов’язкові для заповнення.'
        ],
        [
            'label[for="userName"], label[for="requestClientName"]',
            'Your Name *',
            'Твоє ім’я *'
        ],
        [
            'label[for="userEmail"], label[for="requestClientEmail"]',
            'Email Address *',
            'Електронна пошта *'
        ],
        [
            'label[for="projectService"], label[for="requestServiceType"]',
            'Service *',
            'Послуга *'
        ],
        [
            'label[for="projectMessage"], label[for="requestProjectDescription"]',
            'About Your Project *',
            'Опис проєкту *'
        ],
        [
            '#projectService option[value=""], #requestServiceType option[value=""]',
            'Choose a service',
            'Обери послугу'
        ],
        [
            '#projectService option[value="design"], #requestServiceType option[value="design"]',
            'UI/UX Design',
            'UI/UX-дизайн'
        ],
        [
            '#projectService option[value="development"], #requestServiceType option[value="development"]',
            'Web Development',
            'Розробка сайту'
        ],
        [
            '#projectService option[value="branding"], #requestServiceType option[value="branding"]',
            'Branding & Motion',
            'Брендинг та анімація'
        ],
        [
            '#projectService option[value="other"]',
            'Other',
            'Інше'
        ],
        [
            '#userName, #requestClientName',
            'Your name',
            'Твоє ім’я',
            'placeholder'
        ],
        [
            '#userEmail, #requestClientEmail',
            'name@example.com',
            'name@example.com',
            'placeholder'
        ],
        [
            '#projectMessage, #requestProjectDescription',
            'Describe your idea, audience and project goals.',
            'Опиши ідею, аудиторію та цілі проєкту.',
            'placeholder'
        ],
        [
            '#contactForm .form-checkbox span',
            'I agree to save this draft on this device. *',
            'Погоджуюся зберегти чернетку на цьому пристрої. *'
        ],
        [
            '#contactForm button[type="submit"]',
            'Save Draft',
            'Зберегти чернетку'
        ],
        [
            '#clearDraft',
            'Clear Draft',
            'Очистити чернетку'
        ],
        [
            '.page-section > .content-wrap > .page-label',
            'THE NEXT STEPS',
            'НАСТУПНІ КРОКИ'
        ],
        [
            '.page-section > .content-wrap > .page-section-title',
            'What Happens in a Real Project?',
            'Як відбувається робота над реальним проєктом?'
        ],
        [
            '.contact-process-grid h3',
            [
                'Review the Brief',
                'Define the Scope',
                'Start Creating'
            ],
            [
                'Обговорення брифу',
                'Визначення обсягу',
                'Початок роботи'
            ]
        ],
        [
            '.contact-process-grid p',
            [
                'Clarify the goals, audience and main project requirements.',
                'Agree on deliverables, milestones and responsibilities.',
                'Move into research and explore the first design direction.'
            ],
            [
                'Уточнення цілей, аудиторії та основних вимог до проєкту.',
                'Погодження результатів роботи, етапів і відповідальності.',
                'Початок дослідження та пошук першого напряму дизайну.'
            ]
        ],
        [
            '#requestModalTitle',
            'Let’s Discuss Your Project',
            'Обговорімо твій проєкт'
        ],
        [
            '#requestModalDescription',
            'Complete this short form. At this stage, the data is validated without being sent to a server.',
            'Заповни коротку форму. На цьому етапі дані перевіряються без надсилання на сервер.'
        ],
        [
            '#closeRequestModal',
            'Close form',
            'Закрити форму',
            'aria-label'
        ],
        [
            '#requestModalForm .form-checkbox span',
            'I understand that this version of the form does not send data. *',
            'Розумію, що ця версія форми не надсилає дані. *'
        ],
        [
            '#requestModalForm button[type="submit"]',
            'Check Request',
            'Перевірити заявку'
        ]
    ]
};


// ПОТОЧНА МОВА

const languageStorageKey = 'enverLanguage';
const languageButtons = document.querySelectorAll('[data-language]');

let currentLanguage = 'en';

try {
    const savedLanguage = localStorage.getItem(languageStorageKey);

    if (savedLanguage === 'en' || savedLanguage === 'uk') {
        currentLanguage = savedLanguage;
    }
} catch {
}

// ПЕРЕКЛАД ПОВІДОМЛЕНЬ JAVASCRIPT

function getLanguageText(key, values = {}) {
    const translations = languageMessages[key];

    if (!translations) {
        return key;
    }

    const languageIndex = currentLanguage === 'uk' ? 1 : 0;

    let text = translations[languageIndex];

    Object.entries(values).forEach(([name, value]) => {
        text = text.replaceAll(`{${name}}`, String(value));
    });

    return text;
}

// Цим об’єктом користуються main.js і pages.js.
const siteLanguage = {
    text: getLanguageText
};

// ОНОВЛЕННЯ ТЕКСТУ ЕЛЕМЕНТА

function setTranslatedText(element, text) {
    const fragment = document.createDocumentFragment();
    const lines = text.split('\n');

    lines.forEach((line, index) => {
        if (index > 0) {
            fragment.append(document.createElement('br'));
        }

        fragment.append(document.createTextNode(line));
    });

    element.replaceChildren(fragment);
}

// ЗАСТОСУВАННЯ СЛОВНИКА

function applyTranslations(translations) {
    translations.forEach((translation) => {
        const [selector, english, ukrainian, attribute] = translation;

        const translatedValue =
            currentLanguage === 'uk' ? ukrainian : english;

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            const text = Array.isArray(translatedValue)
                ? translatedValue[index]
                : translatedValue;

            if (typeof text !== 'string') {
                return;
            }

            if (attribute) {
                element.setAttribute(attribute, text);
            } else {
                setTranslatedText(element, text);
            }
        });
    });
}

// ПЕРЕМИКАННЯ МОВИ

function setSiteLanguage(language, saveChoice = true) {
    currentLanguage = language === 'uk' ? 'uk' : 'en';

    document.documentElement.lang = currentLanguage;

    const pageName = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';

    document.dispatchEvent(new Event('beforeSiteLanguageChange'));

    applyTranslations(commonTranslations);
    applyTranslations(pageTranslations[pageName] || []);

    languageButtons.forEach((button) => {
        const isActive = button.dataset.language === currentLanguage;

        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    if (saveChoice) {
        try {
            localStorage.setItem(languageStorageKey, currentLanguage);
        } catch {
            // Перемикання працює й без доступу до сховища.
            // У такому разі вибір діє лише на поточній сторінці.
        }
    }

    document.dispatchEvent(
        new CustomEvent('siteLanguageChange', {
            detail: {
                language: currentLanguage
            }
        })
    );
}

languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setSiteLanguage(button.dataset.language);
    });
});

// ПЕРШЕ ЗАВАНТАЖЕННЯ

// Якщо description  відсутній, створюємо.
if (!document.querySelector('meta[name="description"]')) {
    const description = document.createElement('meta');

    description.name = 'description';

    document.head.append(description);
}

setSiteLanguage(currentLanguage, false);