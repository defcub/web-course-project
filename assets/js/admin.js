const adminTexts = {
    en: {
        title: 'Project administration',
        projects: 'Projects',
        refresh: 'Refresh list',
        retry: 'Try again',
        account: 'Your account',
        catalogue: 'View catalogue',
        home: 'Back to home',
        loading: 'Checking access and loading projects...',
        loginRequired: 'Sign in to your account to continue.',
        denied: 'Your account does not have administrator access.',
        ready: 'Administrator access confirmed.',
        empty: 'No projects have been added yet.',
        error: 'Could not load the page. Check your connection and try again.',
        setupError: 'Could not start the page. Reload it and check the script connections.'
    },
    uk: {
        title: 'Керування проєктами',
        projects: 'Проєкти',
        refresh: 'Оновити список',
        retry: 'Спробувати ще раз',
        account: 'Твій обліковий запис',
        catalogue: 'Переглянути каталог',
        home: 'На головну',
        loading: 'Перевіряємо доступ і завантажуємо проєкти...',
        loginRequired: 'Увійди у свій обліковий запис для продовження.',
        denied: 'Твій обліковий запис не має прав адміністратора.',
        ready: 'Права адміністратора підтверджено.',
        empty: 'Проєктів поки не додано.',
        error: 'Не вдалося завантажити сторінку. Перевір з’єднання та спробуй ще раз.',
        setupError: 'Не вдалося запустити сторінку. Онови її та перевір підключення скриптів.'
    }
};

const adminPanel = document.getElementById('adminPanel');
const adminStatus = document.getElementById('adminStatus');
const adminEmail = document.getElementById('adminEmail');
const adminProjectList = document.getElementById('adminProjectList');
const adminRefresh = document.getElementById('adminRefresh');
const adminRetry = document.getElementById('adminRetry');

let adminClient;
let adminProjects = [];
let adminState = 'loading';
let adminUserEmail = '';
let adminRequest = 0;

function getAdminLanguage() {
    return document.documentElement.lang === 'uk' ? 'uk' : 'en';
}

function getAdminText(key) {
    return adminTexts[getAdminLanguage()][key];
}

function renderAdmin() {
    const language = getAdminLanguage();

    document.querySelectorAll('[data-admin-text]').forEach(element => {
        element.textContent = getAdminText(element.dataset.adminText);
    });

    document.title = getAdminText('title') + ' — Enver';

    adminStatus.textContent = getAdminText(adminState);
    adminStatus.dataset.error = String(
        adminState === 'error' || adminState === 'setupError'
    );

    adminPanel.hidden = adminState !== 'ready';
    adminRetry.hidden = adminState !== 'error';
    adminRefresh.disabled = adminState === 'loading';

    adminProjectList.setAttribute(
        'aria-busy',
        String(adminState === 'loading')
    );

    adminEmail.textContent = adminUserEmail;
    adminProjectList.replaceChildren();

    if (adminState !== 'ready') {
        return;
    }

    if (adminProjects.length === 0) {
        const message = document.createElement('p');

        message.textContent = getAdminText('empty');
        adminProjectList.append(message);

        return;
    }

    const fragment = document.createDocumentFragment();

    adminProjects.forEach(project => {
        const content = project['content_' + language];

        const card = document.createElement('article');
        card.className = 'admin-project';

        const title = document.createElement('h3');
        title.textContent = content.title;

        const category = document.createElement('p');
        category.textContent = project.categories['name_' + language];

        const description = document.createElement('p');
        description.textContent = content.description;

        const slug = document.createElement('p');
        slug.className = 'admin-project-slug';
        slug.textContent = project.slug;

        card.append(title, category, description, slug);
        fragment.append(card);
    });

    adminProjectList.append(fragment);
}

async function loadAdminPage() {
    const request = ++adminRequest;

    adminState = 'loading';
    adminProjects = [];
    adminUserEmail = '';
    renderAdmin();

    try {
        const userResult = await adminClient.auth.getUser();

        if (request !== adminRequest) {
            return;
        }

        if (userResult.error) {
            if (userResult.error.name === 'AuthSessionMissingError') {
                adminState = 'loginRequired';
                return;
            }

            throw userResult.error;
        }

        const user = userResult.data.user;

        if (!user) {
            adminState = 'loginRequired';
            return;
        }

        const adminResult = await adminClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', user.id)
            .maybeSingle();

        if (request !== adminRequest) {
            return;
        }

        if (adminResult.error) {
            throw adminResult.error;
        }

        if (!adminResult.data) {
            adminState = 'denied';
            return;
        }

        const projectsResult = await adminClient
            .from('projects')
            .select('id, slug, content_en, content_uk, categories(name_en, name_uk)')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true });

        if (request !== adminRequest) {
            return;
        }

        if (projectsResult.error) {
            throw projectsResult.error;
        }

        adminProjects = projectsResult.data;
        adminUserEmail = user.email;
        adminState = 'ready';
    } catch (error) {
        if (request !== adminRequest) {
            return;
        }

        adminState = 'error';
        console.warn('Admin page:', error.message);
    } finally {
        if (request === adminRequest) {
            renderAdmin();
        }
    }
}

adminRefresh.addEventListener('click', loadAdminPage);
adminRetry.addEventListener('click', loadAdminPage);

document.addEventListener('siteLanguageChange', renderAdmin);

renderAdmin();

try {
    adminClient = window.supabase.createClient(databaseUrl, databaseKey);

    adminClient.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
            adminRequest++;
            adminProjects = [];
            adminUserEmail = '';
            adminState = 'loginRequired';
            renderAdmin();
        }
    });

    loadAdminPage();
} catch (error) {
    adminState = 'setupError';
    renderAdmin();
}