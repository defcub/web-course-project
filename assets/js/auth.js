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
        admin: 'Manage projects',
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
        googleLogin: 'Continue with Google',
        googleLoading: 'Opening Google...',
        googleError: 'Could not sign in with Google. Please try again or use email.',
        magicLink: 'Send a sign-in link',
        magicSent: 'If this account exists, check your email for a sign-in link.',
        emailDeliveryError: 'Email delivery is unavailable. Please try again later.',
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
        admin: 'Керування проєктами',
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
        googleLogin: 'Продовжити з Google',
        googleLoading: 'Відкриваємо Google...',
        googleError: 'Не вдалося увійти через Google. Спробуй ще раз або скористайся поштою.',
        magicLink: 'Отримати посилання для входу',
        magicSent: 'Якщо обліковий запис існує, перевір пошту — там буде посилання для входу.',
        emailDeliveryError: 'Надсилання листів недоступне. Спробуй пізніше.',
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
const magicLogin = document.getElementById('magicLogin');
const googleLogin = document.getElementById('googleLogin');
const loginMode = document.getElementById('loginMode');
const registerMode = document.getElementById('registerMode');
const authGuest = document.getElementById('authGuest');
const authUser = document.getElementById('authUser');
const accountEmail = document.getElementById('accountEmail');
const logoutButton = document.getElementById('logoutButton');
const authMessage = document.getElementById('authMessage');
const adminLink = document.getElementById('adminLink');
let adminCheckNumber = 0;
let supabaseClient;
let authMode = 'login';
let authBusy = false;
let authReady = false;
let messageKey = '';
let messageType = '';
const googleReturnError =
    new URLSearchParams(window.location.hash.slice(1)).has('error') || new URLSearchParams(window.location.search).has('error');

function getAuthRedirectUrl() {
    return new URL('auth.html', window.location.href).href;
}

function getAuthText(key) {
    const language = document.documentElement.lang === 'uk' ? 'uk' : 'en';

    return authTexts[language][key];
}

function renderAuth() {
    document.querySelectorAll('[data-auth-text]').forEach((element) => {
        element.textContent = getAuthText(element.dataset.authText);
    });
    const isRegister = authMode === 'register';

    googleLogin.disabled = authBusy || !authReady;
    magicLogin.hidden = isRegister;
    magicLogin.disabled = authBusy || !authReady;

    loginMode.setAttribute('aria-pressed', String(!isRegister));
    registerMode.setAttribute('aria-pressed', String(isRegister));

    passwordRepeatGroup.hidden = !isRegister;
    passwordHint.hidden = !isRegister;
    authPasswordRepeat.disabled = !isRegister;
    authPasswordRepeat.required = isRegister;

    authPassword.autocomplete = isRegister ? 'new-password' : 'current-password';

    authFields.disabled = authBusy || !authReady;
    loginMode.disabled = authBusy || !authReady;
    registerMode.disabled = authBusy || !authReady;
    logoutButton.disabled = authBusy || !authReady;

    authForm.setAttribute('aria-busy', String(authBusy));

    authSubmit.textContent = getAuthText(authBusy ? 'loading' : authMode);

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

// перемикання форми між входом і реєстрацією
function changeAuthMode(mode) {
    authMode = mode;
    authPassword.value = '';
    authPasswordRepeat.value = '';

    clearValidation();
    showAuthMessage('');
    authEmail.focus();
}

// перевірка пошти та паролю перед запитом
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
        over_email_send_rate_limit: 'rateLimit',
        email_address_not_authorized: 'emailDeliveryError'
    };

    return errors[error.code] || 'requestError';
}

// перевірка, чи показувати користувачу посилання на адмінку
async function checkAdminAccess(user, checkNumber) {
    try {
        const { data, error } = await supabaseClient.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();

        if (checkNumber !== adminCheckNumber) {
            return;
        }

        if (error) {
            throw error;
        }

        adminLink.hidden = !data;
    } catch (error) {
        if (checkNumber !== adminCheckNumber) {
            return;
        }

        adminLink.hidden = true;
        console.warn('Could not check administrator access:', error);
    }
}

// оновлення сторінки залежно від того, чи користувач увійшов
function showAuthUser(user) {
    authGuest.hidden = Boolean(user);
    authUser.hidden = !user;
    accountEmail.textContent = user ? user.email : '';
    adminLink.hidden = true;
    adminCheckNumber += 1;
    const checkNumber = adminCheckNumber;
    if (!user) {
        return;
    }
    setTimeout(() => {
        if (checkNumber === adminCheckNumber) {
            checkAdminAccess(user, checkNumber);
        }
    }, 0);
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

// оброблення входу або реєстрації без перезавантаження сторінки
authForm.addEventListener('submit', async (event) => {
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
            result = await supabaseClient.auth.signUp({
                email: credentials.email,
                password: credentials.password,
                options: {
                    emailRedirectTo: getAuthRedirectUrl()
                }
            });
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

            showAuthMessage(authMode === 'register' ? 'registerSuccess' : 'loginSuccess', 'success');
        }
    } catch (error) {
        showAuthMessage(getAuthErrorKey(error), 'error');
    } finally {
        authBusy = false;
        renderAuth();
    }
});

// запуск входу через гугл
googleLogin.addEventListener('click', async () => {
    if (!authReady || authBusy) {
        return;
    }
    authBusy = true;
    showAuthMessage('googleLoading');

    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getAuthRedirectUrl(),
                skipBrowserRedirect: true,
                queryParams: {
                    prompt: 'select_account'
                }
            }
        });

        if (error || !data?.url) {
            throw error || new Error('Missing Google sign-in URL');
        }
        window.location.assign(data.url);
    } catch (error) {
        authBusy = false;
        showAuthMessage('googleError', 'error');
    }
});

// надсилання на пошту посилання для входу
magicLogin.addEventListener('click', async () => {
    if (!authReady || authBusy || authMode !== 'login') {
        return;
    }

    clearValidation();

    authEmail.value = authEmail.value.trim();

    if (!authEmail.value) {
        authEmail.setCustomValidity(getAuthText('required'));
    } else if (authEmail.validity.typeMismatch) {
        authEmail.setCustomValidity(getAuthText('invalidEmail'));
    }

    if (!authEmail.reportValidity()) {
        return;
    }

    authBusy = true;
    showAuthMessage('loading');

    try {
        const { error } = await supabaseClient.auth.signInWithOtp({
            email: authEmail.value,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: getAuthRedirectUrl()
            }
        });

        if (error) {
            throw error;
        }

        authPassword.value = '';
        authPasswordRepeat.value = '';

        showAuthMessage('magicSent', 'success');
    } catch (error) {
        showAuthMessage(getAuthErrorKey(error), 'error');
    } finally {
        authBusy = false;
        renderAuth();
    }
});

// завершення сеансу користувача
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
            const failedRedirect = event === 'INITIAL_SESSION' && !session && googleReturnError;
            messageKey = failedRedirect ? 'googleError' : '';
            messageType = failedRedirect ? 'error' : '';
        }

        renderAuth();
    });
} catch (error) {
    showAuthMessage('setupError', 'error');
}