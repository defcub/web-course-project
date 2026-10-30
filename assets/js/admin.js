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
        setupError: 'Could not start the page. Check the script connections.',
        add: 'Add project',
        edit: 'Edit',
        editTitle: 'Edit project',
        save: 'Save project',
        cancel: 'Cancel',
        delete: 'Delete',
        deleteConfirm: 'Delete this project permanently?',
        saving: 'Saving the project...',
        deleting: 'Deleting the project...',
        saved: 'The project has been saved.',
        deleted: 'The project has been deleted.',
        actionFailed: 'Could not confirm the operation. Refresh the list to check the result. Your form values have been kept.',
        noAccess: 'The operation was not allowed or the project no longer exists.',
        duplicate: 'This project identifier already exists. Choose another one.',
        slug: 'Project identifier',
        category: 'Category',
        image: 'Image path',
        order: 'Display order',
        imageHint: 'Enter the path to an existing image inside assets/images/. This form does not upload files.',
        english: 'English content',
        ukrainian: 'Ukrainian content',
        fieldTitle: 'Title',
        description: 'Description',
        challenge: 'The challenge',
        approach: 'The approach',
        result: 'Design focus',
        link: 'Contact link text',
        alt: 'Image description',
        required: 'Please complete this field.',
        invalid: 'Check the value and its length.',
        slugInvalid: 'Use lowercase Latin letters, numbers and hyphens between words.',
        imageInvalid: 'Use a path inside assets/images/ ending in .png, .jpg, .jpeg, .webp, .gif, .avif or .svg.',
        noCategories: 'No categories are available. Add categories in Supabase first.'
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
        setupError: 'Не вдалося запустити сторінку. Перевір підключення скриптів.',
        add: 'Додати проєкт',
        edit: 'Редагувати',
        editTitle: 'Редагування проєкту',
        save: 'Зберегти проєкт',
        cancel: 'Скасувати',
        delete: 'Видалити',
        deleteConfirm: 'Назавжди видалити цей проєкт?',
        saving: 'Зберігаємо проєкт...',
        deleting: 'Видаляємо проєкт...',
        saved: 'Проєкт збережено.',
        deleted: 'Проєкт видалено.',
        actionFailed: 'Не вдалося підтвердити операцію. Онови список, щоб перевірити результат. Введені поля форми збережено.',
        noAccess: 'Операцію не дозволено або проєкт уже не існує.',
        duplicate: 'Такий ідентифікатор проєкту вже існує. Вкажи інший.',
        slug: 'Ідентифікатор проєкту',
        category: 'Категорія',
        image: 'Шлях до зображення',
        order: 'Порядок відображення',
        imageHint: 'Вкажи шлях до наявного зображення в assets/images/. Ця форма не завантажує файли.',
        english: 'Тексти англійською',
        ukrainian: 'Тексти українською',
        fieldTitle: 'Назва',
        description: 'Опис',
        challenge: 'Завдання',
        approach: 'Підхід',
        result: 'На чому зосереджено дизайн',
        link: 'Текст посилання на контакти',
        alt: 'Опис зображення',
        required: 'Заповни це поле.',
        invalid: 'Перевір значення та його довжину.',
        slugInvalid: 'Використовуй малі латинські літери, цифри та дефіси між словами.',
        imageInvalid: 'Вкажи шлях усередині assets/images/ із розширенням .png, .jpg, .jpeg, .webp, .gif, .avif або .svg.',
        noCategories: 'Немає доступних категорій. Спочатку додай категорії в Supabase.'
    }
};

const contentFields = [
    { name: 'title', label: 'fieldTitle', max: 120 },
    { name: 'description', label: 'description', max: 2000, multiline: true },
    { name: 'challenge', label: 'challenge', max: 2000, multiline: true },
    { name: 'approach', label: 'approach', max: 2000, multiline: true },
    { name: 'result', label: 'result', max: 2000, multiline: true },
    { name: 'link', label: 'link', max: 120 },
    { name: 'alt', label: 'alt', max: 250 }
];

const adminPanel = document.getElementById('adminPanel');
const adminStatus = document.getElementById('adminStatus');
const adminEmail = document.getElementById('adminEmail');
const adminProjectList = document.getElementById('adminProjectList');
const adminRefresh = document.getElementById('adminRefresh');
const adminRetry = document.getElementById('adminRetry');
const adminActionMessage = document.getElementById('adminActionMessage');
const adminAdd = document.getElementById('adminAdd');
const adminForm = document.getElementById('adminProjectForm');
const adminFormFields = document.getElementById('adminFormFields');
const adminFormTitle = document.getElementById('adminFormTitle');
const adminCancel = document.getElementById('adminCancel');
const projectCategory = document.getElementById('projectCategory');

let adminClient;
let adminProjects = [];
let adminCategories = [];
let adminState = 'loading';
let adminUserEmail = '';
let adminRequest = 0;
let adminBusy = false;
let adminAction = '';
let editingProjectId = null;

function getAdminLanguage() {
    return document.documentElement.lang === 'uk' ? 'uk' : 'en';
}

function getAdminText(key) {
    return adminTexts[getAdminLanguage()][key];
}

function getFormField(name) {
    return adminForm.elements.namedItem(name);
}

// Створюємо однакові поля для двох мов
function createContentFields() {
    const container = document.getElementById('adminUkrainianFields');

    contentFields.forEach(field => {
        const name = field.name + '_uk';

        const wrapper = document.createElement('div');
        wrapper.className = 'admin-field';

        const label = document.createElement('label');
        label.htmlFor = name;
        label.dataset.adminText = field.label;

        const input = document.createElement(
            field.multiline ? 'textarea' : 'input'
        );

        input.id = name;
        input.name = name;
        input.lang = 'uk';
        input.required = true;
        input.maxLength = field.max;

        if (!field.multiline) {
            input.type = 'text';
        }

        wrapper.append(label, input);
        container.append(wrapper);
    });
}

function renderCategories() {
    const selected = projectCategory.value;
    const language = getAdminLanguage();

    projectCategory.replaceChildren();

    adminCategories.forEach(category => {
        const option = document.createElement('option');

        option.value = category.id;
        option.textContent = category['name_' + language];

        projectCategory.append(option);
    });

    if (adminCategories.some(category => String(category.id) === selected)) {
        projectCategory.value = selected;
    }
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

    adminRefresh.disabled = adminBusy || adminState === 'loading';
    adminAdd.disabled = adminBusy || adminCategories.length === 0;
    adminFormFields.disabled = adminBusy;

    adminForm.setAttribute('aria-busy', String(adminBusy));

    adminFormTitle.textContent = getAdminText(
        editingProjectId === null ? 'add' : 'editTitle'
    );

    adminActionMessage.textContent = adminAction
        ? getAdminText(adminAction)
        : '';

    adminActionMessage.dataset.error = String(
        ['actionFailed', 'noAccess', 'duplicate', 'noCategories'].includes(adminAction)
    );

    adminEmail.textContent = adminUserEmail;

    renderCategories();
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
        const content = project.content_uk;

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

        const actions = document.createElement('div');
        actions.className = 'admin-project-actions';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'btn btn-outline';
        editButton.textContent = getAdminText('edit');
        editButton.disabled = adminBusy;

        editButton.addEventListener('click', () => {
            openProjectForm(project);
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'admin-delete';
        deleteButton.textContent = getAdminText('delete');
        deleteButton.disabled = adminBusy;

        deleteButton.addEventListener('click', () => {
            deleteAdminProject(project);
        });

        actions.append(editButton, deleteButton);
        card.append(title, category, description, slug, actions);
        fragment.append(card);
    });

    adminProjectList.append(fragment);
}

function clearFormValidation() {
    adminForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.setCustomValidity('');
    });
}

function closeProjectForm() {
    adminForm.hidden = true;
    editingProjectId = null;
    adminForm.reset();
    clearFormValidation();
}

function openProjectForm(project = null) {
    if (adminBusy || adminState !== 'ready') {
        return;
    }

    closeProjectForm();
    adminAction = '';

    if (adminCategories.length === 0) {
        adminAction = 'noCategories';
        renderAdmin();
        return;
    }

    renderCategories();

    if (project) {
        editingProjectId = project.id;

        getFormField('slug').value = project.slug;
        getFormField('category_id').value = project.category_id;
        getFormField('image_path').value = project.image_path;
        getFormField('sort_order').value = project.sort_order;

        contentFields.forEach(field => {
            getFormField(field.name + '_uk').value =
                project.content_uk[field.name];
        });
    }

    adminForm.hidden = false;
    renderAdmin();
    getFormField('slug').focus();
}

function validateProjectForm() {
    clearFormValidation();

    adminForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.value = field.value.trim();

        if (field.required && !field.value) {
            field.setCustomValidity(getAdminText('required'));
        } else if (
            (field.maxLength > 0 && field.value.length > field.maxLength) ||
            !field.validity.valid
        ) {
            field.setCustomValidity(getAdminText('invalid'));
        }
    });

    const slug = getFormField('slug');

    if (slug.value && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug.value)) {
        slug.setCustomValidity(getAdminText('slugInvalid'));
    }

    const image = getFormField('image_path');

    if (
        image.value &&
        (
            !image.value.startsWith('assets/images/') ||
            image.value.includes('..') ||
            image.value.includes('\\') ||
            !/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(image.value)
        )
    ) {
        image.setCustomValidity(getAdminText('imageInvalid'));
    }

    return adminForm.reportValidity();
}

function collectProjectData() {
    const content = {};

    contentFields.forEach(field => {
        content[field.name] = getFormField(field.name + '_uk').value.trim();
    });

    const project = {
        slug: getFormField('slug').value,
        category_id: Number(getFormField('category_id').value),
        image_path: getFormField('image_path').value,
        sort_order: Number(getFormField('sort_order').value),
        content_uk: content
    };

    if (editingProjectId === null) {
        project.content_en = {};
    }

    return project;
}

async function loadAdminPage() {
    if (adminBusy) {
        return;
    }

    const request = ++adminRequest;

    closeProjectForm();
    adminState = 'loading';
    adminProjects = [];
    adminCategories = [];
    adminUserEmail = '';
    adminAction = '';
    renderAdmin();

    try {
        const userResult = await adminClient.auth.getUser();

        if (request !== adminRequest) return;

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

        if (request !== adminRequest) return;
        if (adminResult.error) throw adminResult.error;

        if (!adminResult.data) {
            adminState = 'denied';
            return;
        }

        const projectsResult = await adminClient
            .from('projects')
            .select('*, categories(name_en, name_uk)')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true });

        if (request !== adminRequest) return;
        if (projectsResult.error) throw projectsResult.error;

        const categoriesResult = await adminClient
            .from('categories')
            .select('id, name_en, name_uk')
            .order('id', { ascending: true });

        if (request !== adminRequest) return;
        if (categoriesResult.error) throw categoriesResult.error;

        adminProjects = projectsResult.data;
        adminCategories = categoriesResult.data;
        adminUserEmail = user.email;
        adminState = 'ready';

        if (adminCategories.length === 0) {
            adminAction = 'noCategories';
        }
    } catch (error) {
        if (request !== adminRequest) return;

        adminState = 'error';
        console.warn('Admin page:', error.message);
    } finally {
        if (request === adminRequest) {
            renderAdmin();
        }
    }
}

async function saveAdminProject(event) {
    event.preventDefault();

    if (adminBusy || adminState !== 'ready' || !validateProjectForm()) {
        return;
    }

    const request = adminRequest;
    const project = collectProjectData();
    const projectId = editingProjectId;

    adminBusy = true;
    adminAction = 'saving';
    renderAdmin();

    try {
        let query;

        if (projectId === null) {
            query = adminClient.from('projects').insert(project);
        } else {
            query = adminClient
                .from('projects')
                .update(project)
                .eq('id', projectId);
        }

        const result = await query
            .select('*, categories(name_en, name_uk)')
            .single();

        if (request !== adminRequest) return;
        if (result.error) throw result.error;

        adminProjects = adminProjects.filter(item => {
            return item.id !== result.data.id;
        });

        adminProjects.push(result.data);

        adminProjects.sort((first, second) => {
            return first.sort_order - second.sort_order || first.id - second.id;
        });

        closeProjectForm();
        adminAction = 'saved';
    } catch (error) {
        if (request !== adminRequest) return;

        if (error.code === '23505') {
            adminAction = 'duplicate';
        } else if (error.code === '42501' || error.code === 'PGRST116') {
            adminAction = 'noAccess';
        } else {
            adminAction = 'actionFailed';
        }

        console.warn('Save project:', error.message);
    } finally {
        adminBusy = false;
        renderAdmin();
    }
}

async function deleteAdminProject(project) {
    if (adminBusy || adminState !== 'ready') {
        return;
    }

    const title = project.content_uk.title;

    if (!window.confirm(getAdminText('deleteConfirm') + '\n\n' + title)) {
        return;
    }

    const request = adminRequest;

    adminBusy = true;
    adminAction = 'deleting';
    renderAdmin();

    try {
        const result = await adminClient
            .from('projects')
            .delete()
            .eq('id', project.id)
            .select('id');

        if (request !== adminRequest) return;
        if (result.error) throw result.error;

        if (!result.data || result.data.length !== 1) {
            adminAction = 'noAccess';
            return;
        }

        adminProjects = adminProjects.filter(item => item.id !== project.id);

        if (editingProjectId === project.id) {
            closeProjectForm();
        }

        adminAction = 'deleted';
    } catch (error) {
        if (request !== adminRequest) return;

        adminAction = 'actionFailed';
        console.warn('Delete project:', error.message);
    } finally {
        adminBusy = false;
        renderAdmin();
    }
}

adminAdd.addEventListener('click', () => {
    openProjectForm();
});

adminCancel.addEventListener('click', () => {
    if (adminBusy) return;

    closeProjectForm();
    adminAction = '';
    renderAdmin();
    adminAdd.focus();
});

adminForm.addEventListener('submit', saveAdminProject);
adminForm.addEventListener('input', clearFormValidation);
adminForm.addEventListener('change', clearFormValidation);

adminRefresh.addEventListener('click', loadAdminPage);
adminRetry.addEventListener('click', loadAdminPage);

document.addEventListener('siteLanguageChange', () => {
    clearFormValidation();
    renderAdmin();
});

createContentFields();
renderAdmin();

try {
    adminClient = window.supabase.createClient(databaseUrl, databaseKey);

    adminClient.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
            adminRequest++;
            adminProjects = [];
            adminCategories = [];
            adminUserEmail = '';
            adminAction = '';
            adminState = 'loginRequired';
            closeProjectForm();
            renderAdmin();
        }
    });

    loadAdminPage();
} catch (error) {
    adminState = 'setupError';
    renderAdmin();
}