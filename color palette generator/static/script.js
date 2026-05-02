document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('image');
    const fileName = document.getElementById('file-name');
    const slider = document.getElementById('num_colors');
    const sliderValue = document.getElementById('color-value');

    const previewImg = document.getElementById('preview-img');

    if (fileInput && fileName) {
        fileInput.addEventListener('change', () => {
            const selected = fileInput.files[0];
            fileName.textContent = selected ? selected.name : 'No file chosen';
            if (previewImg) {
                if (selected) {
                    const previewUrl = URL.createObjectURL(selected);
                    previewImg.src = previewUrl;
                    previewImg.classList.remove('hidden');
                    previewImg.onload = () => URL.revokeObjectURL(previewUrl);
                } else {
                    previewImg.src = '';
                    previewImg.classList.add('hidden');
                }
            }
        });
    }

    if (slider && sliderValue) {
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
        });
    }

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const colorCode = button.dataset.color;
            if (colorCode) {
                copyToClipboard(colorCode, button);
            }
        });
    });

    function copyToClipboard(text, button) {
        navigator.clipboard?.writeText(text).then(() => {
            animateCopyButton(button);
            showToast(`${text} copied to clipboard`);
        }).catch(() => {
            fallbackCopy(text, button);
        });
    }

    function fallbackCopy(text, button) {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        animateCopyButton(button);
        showToast(`${text} copied to clipboard`);
    }

    function animateCopyButton(button) {
        const original = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#72d66b';
        setTimeout(() => {
            button.innerHTML = original;
            button.style.color = '';
        }, 1400);
    }

    function showToast(message) {
        let toast = document.querySelector('.toast-notice');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notice';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(toast.dismissTimeout);
        toast.dismissTimeout = setTimeout(() => {
            toast.classList.remove('visible');
        }, 1800);
    }
});