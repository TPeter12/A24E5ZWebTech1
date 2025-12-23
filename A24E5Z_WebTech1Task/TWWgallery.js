const STORAGE_KEY = 'westernGalleryImages';
    const gallery = document.getElementById('gallery');
    const fileInput = document.getElementById('imageUpload');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Lightbox megnyitása
    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('lightbox-visible');
        document.body.style.overflow = 'hidden';
    }

    // Lightbox bezárása
    function closeLightbox() {
        lightbox.classList.remove('lightbox-visible');
        document.body.style.overflow = '';
    }

    // ESC billentyűvel is zárható
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Kattintás a háttérre vagy X-re zár
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });

    // Galéria betöltése
    function loadGallery() {
        gallery.innerHTML = '';
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const images = JSON.parse(saved);
        images.forEach((dataUrl, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = dataUrl;
            img.alt = 'Felhasználó által feltöltött western kép';
            img.style.cursor = 'zoom-in';

            img.onclick = () => openLightbox(dataUrl);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn material-symbols-outlined';
            deleteBtn.textContent = 'delete';
            deleteBtn.title = 'Törlés';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                removeImage(index);
            };

            item.appendChild(img);
            item.appendChild(deleteBtn);
            gallery.appendChild(item);
        });
    }

    // Törlés
    function removeImage(index) {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        saved.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        loadGallery();
    }

    // Feltöltés
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        if (files.length === 0) return;

        let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                saved.push(dataUrl);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                loadGallery();
            };
            reader.readAsDataURL(file);
        });

        fileInput.value = '';
    });

    // Indítás
    document.addEventListener('DOMContentLoaded', loadGallery);