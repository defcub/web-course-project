const authTexts = {
    en: {
        title: 'Your account',
        description: 'Sign in or create an account.',
        login: 'Sign in',
        register: 'Create account',
        email: 'Email',
        password: 'Password',
        repeat: 'Repeat password',
        hint: 'Use at least 8 characters.',
        signedIn: 'You are signed in as:',
        logout: 'Sign out',
        home: 'Back to home',
        loading: 'Please wait...',
        loginSuccess: 'You have signed in successfully.',
        registerSuccess: 'Your account has been created.',
        confirmEmail: 'Check your email to confirm your account.',
        logoutSuccess: 'You have signed out.',
        required: 'Please fill in this field.',
        invalidEmail: 'Enter a valid email address.',
        shortPassword: 'Use at least 8 characters.',
        passwordMismatch: 'The passwords do not match.',
        invalidLogin: 'Incorrect email or password.',
        emailNotConfirmed: 'Confirm your email before signing in.',
        emailExists: 'An account with this email already exists.',
        weakPassword: 'This password does not meet the security requirements.',
        rateLimit: 'Too many attempts. Please try again later.',
        requestError: 'The request failed. Check your connection and try again.',
        setupError: 'Could not start authentication. Reload the page.'
    },
    uk: {
        title: 'Твій обліковий запис',
        description: 'Увійди або створи обліковий запис.',
        login: 'Увійти',
        register: 'Зареєструватися',
        email: 'Електронна пошта',
        password: 'Пароль',
        repeat: 'Повтори пароль',
        hint: 'Використай щонайменше 8 символів.',
        signedIn: 'Ти увійшов як:',
        logout: 'Вийти',
        home: 'На головну',
        loading: 'Зачекай...',
        loginSuccess: 'Ти успішно увійшов.',
        registerSuccess: 'Обліковий запис створено.',
        confirmEmail: 'Перевір пошту, щоб підтвердити обліковий запис.',
        logoutSuccess: 'Ти вийшов з облікового запису.',
        required: 'Заповни це поле.',
        invalidEmail: 'Введи правильну адресу електронної пошти.',
        shortPassword: 'Використай щонайменше 8 символів.',
        passwordMismatch: 'Паролі не збігаються.',
        invalidLogin: 'Неправильна пошта або пароль.',
        emailNotConfirmed: 'Підтвердь пошту перед входом.',
        emailExists: 'Обліковий запис із цією поштою вже існує.',
        weakPassword: 'Цей пароль не відповідає вимогам безпеки.',
        rateLimit: 'Забагато спроб. Спробуй пізніше.',
        requestError: 'Запит не виконано. Перевір з’єднання та спробуй ще раз.',
        setupError: 'Не вдалося запустити авторизацію. Онови сторінку.'
    }
};

const authForm = document.getElementById('authForm');
const authFields = document.getElementById('authFields');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authPasswordRepeat = document.getElementById('authPasswordRepeat');
const passwordRepeatGroup = document.getElementById('passwordRepeatGroup');
const passwordHint = document.getElementById('passwordHint');
const authSubmit = document.getElementById('authSubmit');
const loginMode = document.getElementById('loginMode');
const registerMode = document.getElementById('registerMode');
const authGuest = document.getElementById('authGuest');
const authUser = document.getElementById('authUser');
const accountEmail = document.getElementById('accountEmail');
const logoutButton = document.getElementById('logoutButton');
const authMessage = document.getElementById('authMessage');

let supabaseClient;
let authMode = 'login';
let authBusy = false;
let authReady = false;
let messageKey = '';
let messageType = '';

function getAuthText(key) {
    const language = document.documentElement.lang === 'uk' ? 'uk' : 'en';

    return authTexts[language][key];
}

function renderAuth() {
    document.querySelectorAll('[data-auth-text]').forEach(element => {
        element.textContent = getAuthText(element.dataset.authText);
    });

    const isRegister = authMode === 'register';

    loginMode.setAttribute('aria-pressed', String(!isRegister));
    registerMode.setAttribute('aria-pressed', String(isRegister));

    passwordRepeatGroup.hidden = !isRegister;
    passwordHint.hidden = !isRegister;
    authPasswordRepeat.disabled = !isRegister;
    authPasswordRepeat.required = isRegister;

    authPassword.autocomplete = isRegister
        ? 'new-password'
        : 'current-password';

    authFields.disabled = authBusy || !authReady;
    loginMode.disabled = authBusy || !authReady;
    registerMode.disabled = authBusy || !authReady;
    logoutButton.disabled = authBusy || !authReady;

    authForm.setAttribute('aria-busy', String(authBusy));

    authSubmit.textContent = getAuthText(
        authBusy ? 'loading' : authMode
    );

    authMessage.textContent = messageKey ? getAuthText(messageKey) : '';
    authMessage.dataset.type = messageType;

    document.title = getAuthText('title') + ' — Enver';
}

function showAuthMessage(key, type = '') {
    messageKey = key;
    messageType = type;
    renderAuth();
}

function clearValidation() {
    authEmail.setCustomValidity('');
    authPassword.setCustomValidity('');
    authPasswordRepeat.setCustomValidity('');
}

function changeAuthMode(mode) {
    authMode = mode;
    authPassword.value = '';
    authPasswordRepeat.value = '';

    clearValidation();
    showAuthMessage('');
    authEmail.focus();
}

function validateAuthForm() {
    clearValidation();

    authEmail.value = authEmail.value.trim();

    if (!authEmail.value) {
        authEmail.setCustomValidity(getAuthText('required'));
    } else if (authEmail.validity.typeMismatch) {
        authEmail.setCustomValidity(getAuthText('invalidEmail'));
    }

    if (!authPassword.value) {
        authPassword.setCustomValidity(getAuthText('required'));
    } else if (authMode === 'register' && authPassword.value.length < 8) {
        authPassword.setCustomValidity(getAuthText('shortPassword'));
    }

    if (authMode === 'register') {
        if (!authPasswordRepeat.value) {
            authPasswordRepeat.setCustomValidity(getAuthText('required'));
        } else if (authPasswordRepeat.value !== authPassword.value) {
            authPasswordRepeat.setCustomValidity(getAuthText('passwordMismatch'));
        }
    }

    return authForm.reportValidity();
}

function getAuthErrorKey(error) {
    const errors = {
        invalid_credentials: 'invalidLogin',
        email_not_confirmed: 'emailNotConfirmed',
        user_already_exists: 'emailExists',
        email_exists: 'emailExists',
        weak_password: 'weakPassword',
        over_request_rate_limit: 'rateLimit',
        over_email_send_rate_limit: 'rateLimit'
    };

    return errors[error.code] || 'requestError';
}

function showAuthUser(user) {
    authGuest.hidden = Boolean(user);
    authUser.hidden = !user;
    accountEmail.textContent = user ? user.email : '';
}

loginMode.addEventListener('click', () => {
    changeAuthMode('login');
});

registerMode.addEventListener('click', () => {
    changeAuthMode('register');
});

authForm.addEventListener('input', () => {
    clearValidation();

    if (messageKey) {
        showAuthMessage('');
    }
});

document.addEventListener('siteLanguageChange', () => {
    clearValidation();
    renderAuth();
});

authForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!authReady || authBusy || !validateAuthForm()) {
        return;
    }

    authBusy = true;
    showAuthMessage('loading');

    const credentials = {
        email: authEmail.value,
        password: authPassword.value
    };

    try {
        let result;

        if (authMode === 'register') {
            result = await supabaseClient.auth.signUp(credentials);
        } else {
            result = await supabaseClient.auth.signInWithPassword(credentials);
        }

        if (result.error) {
            throw result.error;
        }

        authForm.reset();
        clearValidation();

        if (authMode === 'register' && !result.data.session) {
            showAuthMessage('confirmEmail', 'success');
        } else {
            showAuthUser(result.data.user);

            showAuthMessage(
                authMode === 'register' ? 'registerSuccess' : 'loginSuccess',
                'success'
            );
        }
    } catch (error) {
        showAuthMessage(getAuthErrorKey(error), 'error');
    } finally {
        authBusy = false;
        renderAuth();
    }
});

logoutButton.addEventListener('click', async () => {
    if (!authReady || authBusy) {
        return;
    }

    authBusy = true;
    showAuthMessage('loading');

    try {
        const { error } = await supabaseClient.auth.signOut({
            scope: 'local'
        });

        if (error) {
            throw error;
        }

        showAuthUser(null);
        authMode = 'login';
        authForm.reset();
        clearValidation();
        showAuthMessage('logoutSuccess', 'success');
    } catch (error) {
        showAuthMessage(getAuthErrorKey(error), 'error');
    } finally {
        authBusy = false;
        renderAuth();
    }
});

renderAuth();

try {
    supabaseClient = window.supabase.createClient(databaseUrl, databaseKey);

    supabaseClient.auth.onAuthStateChange((event, session) => {
        authReady = true;
        showAuthUser(session ? session.user : null);

        if (!authBusy) {
            messageKey = '';
            messageType = '';
        }

        renderAuth();
    });
} catch (error) {
    showAuthMessage('setupError', 'error');
}