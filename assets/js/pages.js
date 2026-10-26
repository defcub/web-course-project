
// =========================================
// ВАЛІДАЦІЯ ФОРМ ОБРАНОЮ МОВОЮ
// =========================================

function prepareFormValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');

    form.noValidate = true;

    function validateFields() {
        fields.forEach((field) => {
            field.setCustomValidity('');

            const value = field.value.trim();

            let messageKey = '';
            let messageValues = {};

            if (field.type === 'checkbox') {
                if (field.required && !field.checked) {
                    messageKey = 'consentRequired';
                }
            } else if (field.required && value === '') {
                messageKey = field.tagName === 'SELECT'
                    ? 'serviceRequired'
                    : 'fieldRequired';
            } else if (
                field.type === 'email' &&
                field.validity.typeMismatch
            ) {
                messageKey = 'emailInvalid';
            } else if (
                value !== '' &&
                field.minLength > 0 &&
                value.length < field.minLength
            ) {
                messageKey = 'fieldTooShort';

                messageValues = {
                    min: field.minLength
                };
            } else if (
                field.maxLength > 0 &&
                field.value.length > field.maxLength
            ) {
                messageKey = 'fieldTooLong';

                messageValues = {
                    max: field.maxLength
                };
            }

            if (messageKey) {
                field.setCustomValidity(
                    siteLanguage.text(messageKey, messageValues)
                );
            }
        });
    }

    form.addEventListener('input', validateFields);
    form.addEventListener('change', validateFields);

    document.addEventListener(
        'siteLanguageChange',
        validateFields
    );

    return validateFields;
}


// =========================================
// БРИФ ПРОЄКТУ
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

    const validateContactForm = prepareFormValidation(contactForm);

    let formMessageKey = '';

    function updateFormMessage() {
        formMessage.textContent = formMessageKey
            ? siteLanguage.text(formMessageKey)
            : '';
    }

    function showFormMessage(key) {
        formMessageKey = key;

        updateFormMessage();
    }

    function updateCounter() {
        messageCounter.textContent =
            `${projectMessage.value.length} / 2000`;
    }

    projectMessage.addEventListener('input', updateCounter);

    contactForm.addEventListener('input', () => {
        showFormMessage('');
    });

    document.addEventListener(
        'siteLanguageChange',
        updateFormMessage
    );

    // Відновлення збереженої чернетки
    try {
        const savedDraft = localStorage.getItem(storageKey);

        if (savedDraft) {
            const draft = JSON.parse(savedDraft);

            if (
                draft &&
                typeof draft === 'object' &&
                !Array.isArray(draft)
            ) {
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

                showFormMessage('draftRestored');
            }
        }
    } catch {
        showFormMessage('draftLoadError');
    }

    updateCounter();

    // Збереження чернетки
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        validateContactForm();

        if (!contactForm.reportValidity()) {
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

            showFormMessage('draftSaved');
        } catch {
            showFormMessage('draftSaveError');
        }
    });

    // Видалення чернетки
    clearDraft.addEventListener('click', () => {
        try {
            localStorage.removeItem(storageKey);

            contactForm.reset();

            updateCounter();
            validateContactForm();

            showFormMessage('draftCleared');
        } catch {
            showFormMessage('draftClearError');
        }
    });
}

// МОДАЛЬНЕ ВІКНО

const requestModal = document.getElementById('requestModal');
const openRequestModal = document.getElementById('openRequestModal');
const closeRequestModal = document.getElementById('closeRequestModal');
const requestModalForm = document.getElementById('requestModalForm');

if (
    requestModal &&
    openRequestModal &&
    closeRequestModal &&
    requestModalForm
) {
    const requestClientName =
        document.getElementById('requestClientName');

    const requestModalStatus =
        document.getElementById('requestModalStatus');

    const validateRequestForm =
        prepareFormValidation(requestModalForm);

    let requestMessageKey = '';
    let pointerStartedOutside = false;

    function updateRequestMessage() {
        requestModalStatus.textContent = requestMessageKey
            ? siteLanguage.text(requestMessageKey)
            : '';
    }

    function showRequestMessage(key) {
        requestMessageKey = key;

        updateRequestMessage();
    }

    function isOutsideModal(event) {
        const bounds = requestModal.getBoundingClientRect();

        return (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
        );
    }

    // Відкриття
    openRequestModal.addEventListener('click', () => {
        if (requestModal.open) {
            return;
        }

        showRequestMessage('');

        requestModal.showModal();

        document.body.classList.add('modal-open');

        requestClientName.focus();
    });

    // Закриття кнопкою
    closeRequestModal.addEventListener('click', () => {
        requestModal.close();
    });

    // Закриття натисканням поза вікном
    requestModal.addEventListener('pointerdown', (event) => {
        pointerStartedOutside = isOutsideModal(event);
    });

    requestModal.addEventListener('pointerup', (event) => {
        if (pointerStartedOutside && isOutsideModal(event)) {
            requestModal.close();
        }

        pointerStartedOutside = false;
    });

    requestModal.addEventListener('pointercancel', () => {
        pointerStartedOutside = false;
    });

    // Спрацьовує після закриття Escape
    requestModal.addEventListener('close', () => {
        document.body.classList.remove('modal-open');

        pointerStartedOutside = false;

        openRequestModal.focus();
    });

    requestModalForm.addEventListener('input', () => {
        showRequestMessage('');
    });

    document.addEventListener(
        'siteLanguageChange',
        updateRequestMessage
    );

    // Перевірка форми
    requestModalForm.addEventListener('submit', (event) => {
        event.preventDefault();

        validateRequestForm();

        if (!requestModalForm.reportValidity()) {
            return;
        }

        showRequestMessage('requestValid');
    });
}