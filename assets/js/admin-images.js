const imageTexts = {
    en: {
        label: 'Project image',
        drop: 'Drop an image here or choose a file',
        hint: 'JPEG, PNG or WebP. Maximum 5 MB.',
        required: 'Choose a project image.',
        invalid: 'Choose one JPEG, PNG or WebP image up to 5 MB.',
        uploadFailed: 'Could not upload the image. Check your connection and try again.'
    },
    uk: {
        label: 'Зображення проєкту',
        drop: 'Перетягни зображення сюди або вибери файл',
        hint: 'JPEG, PNG або WebP. Максимум 5 МБ.',
        required: 'Вибери зображення проєкту.',
        invalid: 'Вибери одне зображення JPEG, PNG або WebP до 5 МБ.',
        uploadFailed: 'Не вдалося завантажити зображення. Перевір з’єднання та спробуй ще раз.'
    }
};

const imageFileInput = document.getElementById('projectImageFile');
const imagePathInput = document.getElementById('projectImage');
const imageDropZone = document.getElementById('imageDropZone');
const imagePreview = document.getElementById('projectImagePreview');
const imageMessage = document.getElementById('imageUploadMessage');

const imageExtensions = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

let selectedImageFile = null;
let imagePreviewUrl = '';
let imageMessageKey = '';

function renderImageTexts() {
    const language = document.documentElement.lang === 'uk' ? 'uk' : 'en';

    document.querySelectorAll('[data-image-text]').forEach(element => {
        element.textContent = imageTexts[language][element.dataset.imageText];
    });

    imageMessage.textContent = imageMessageKey
        ? imageTexts[language][imageMessageKey]
        : '';
}

function showImageMessage(key) {
    imageMessageKey = key;
    renderImageTexts();
}

function showImagePreview(source) {
    if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        imagePreviewUrl = '';
    }

    imagePreview.hidden = !source;

    if (source) {
        imagePreview.src = source;
    } else {
        imagePreview.removeAttribute('src');
    }
}

function resetImagePicker() {
    selectedImageFile = null;
    imageFileInput.value = '';
    imagePathInput.value = '';

    showImagePreview('');
    showImageMessage('');

    imageDropZone.classList.remove('is-dragging');
}

function selectProjectImage(files) {
    if (adminBusy || adminState !== 'ready') {
        return;
    }

    if (files.length === 0) {
        return;
    }

    const file = files[0];

    if (
        files.length !== 1 ||
        !Object.hasOwn(imageExtensions, file.type) ||
        file.size === 0 ||
        file.size > 5 * 1024 * 1024
    ) {
        imageFileInput.value = '';
        showImageMessage('invalid');
        return;
    }

    selectedImageFile = file;

    showImagePreview('');
    imagePreviewUrl = URL.createObjectURL(file);
    imagePreview.src = imagePreviewUrl;
    imagePreview.hidden = false;

    showImageMessage('');
}

function validateProjectImage() {
    if (!selectedImageFile && !imagePathInput.value) {
        showImageMessage('required');
        imageFileInput.focus();
        return false;
    }

    return true;
}

async function uploadProjectImage() {
    if (!selectedImageFile) {
        return imagePathInput.value;
    }

    const file = selectedImageFile;
    const extension = imageExtensions[file.type];
    const fileName = crypto.randomUUID() + '.' + extension;

    const { error } = await adminClient.storage
        .from('project-images')
        .upload(fileName, file, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        const uploadError = new Error(error.message);
        uploadError.code = 'IMAGE_UPLOAD_FAILED';
        throw uploadError;
    }

    const { data } = adminClient.storage
        .from('project-images')
        .getPublicUrl(fileName);

    return data.publicUrl;
}

imageFileInput.addEventListener('change', () => {
    selectProjectImage(imageFileInput.files);
});

imageDropZone.addEventListener('dragover', event => {
    event.preventDefault();

    if (!adminBusy && adminState === 'ready') {
        imageDropZone.classList.add('is-dragging');
    }
});

imageDropZone.addEventListener('dragleave', event => {
    if (!imageDropZone.contains(event.relatedTarget)) {
        imageDropZone.classList.remove('is-dragging');
    }
});

imageDropZone.addEventListener('drop', event => {
    event.preventDefault();

    imageDropZone.classList.remove('is-dragging');

    if (event.dataTransfer) {
        selectProjectImage(event.dataTransfer.files);
    }
});

document.addEventListener('siteLanguageChange', renderImageTexts);

renderImageTexts();