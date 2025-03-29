// Datos de productos actualizados con instrumentos llaneros
const products = [
    { id: 1, name: "Arpa Llanera Profesional", price: "$2,500,000", image: "https://placehold.co/300x300/png" },
    { id: 2, name: "Cuatro Venezolano", price: "$800,000", image: "https://placehold.co/300x300/png" },
    { id: 3, name: "Maracas Artesanales", price: "$150,000", image: "https://placehold.co/300x300/png" },
    { id: 4, name: "Bandola Llanera", price: "$1,200,000", image: "https://placehold.co/300x300/png" },
    { id: 5, name: "Capachos Tradicionales", price: "$180,000", image: "https://placehold.co/300x300/png" },
    { id: 6, name: "Furruco Artesanal", price: "$450,000", image: "https://placehold.co/300x300/png" },
    { id: 7, name: "Tambora Llanera", price: "$350,000", image: "https://placehold.co/300x300/png" },
    { id: 8, name: "Charrasca de Metal", price: "$120,000", image: "https://placehold.co/300x300/png" },
    { id: 9, name: "Guitarra Criolla", price: "$900,000", image: "https://placehold.co/300x300/png" },
    { id: 10, name: "Bajo Quinto Tradicional", price: "$1,800,000", image: "https://placehold.co/300x300/png" },
    { id: 11, name: "Requinto Llanero", price: "$750,000", image: "https://placehold.co/300x300/png" },
    { id: 12, name: "Cajón Peruano", price: "$280,000", image: "https://placehold.co/300x300/png" },
    { id: 13, name: "Güiro Profesional", price: "$95,000", image: "https://placehold.co/300x300/png" },
    { id: 14, name: "Tiple Colombiano", price: "$650,000", image: "https://placehold.co/300x300/png" },
    { id: 15, name: "Mandolina Artesanal", price: "$950,000", image: "https://placehold.co/300x300/png" }
];

const defaultAvatarUrl = 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';

// Datos de ejemplo para reseñas actualizados
const sampleReviews = [
    {
        id: 1,
        productId: 1,
        productName: "Arpa Llanera Profesional",
        userName: "Carlos Rodríguez",
        userAvatar: defaultAvatarUrl,
        rating: 5,
        date: "15 Mar 2024",
        content: "Excelente calidad en el arpa llanera. El sonido es espectacular y el acabado artesanal es de primera. Muy satisfecho con mi compra.",
        isCurrentUser: false
    },
    {
        id: 2,
        productId: 2,
        productName: "Cuatro Venezolano",
        userName: "Laura Martínez",
        userAvatar: defaultAvatarUrl,
        rating: 4,
        date: "10 Mar 2024",
        content: "El cuatro venezolano tiene un sonido increíble. La madera es de excelente calidad y la afinación se mantiene muy bien. Perfecta para música llanera.",
        isCurrentUser: false
    },
    {
        id: 3,
        productId: 3,
        productName: "Maracas Artesanales",
        userName: "Miguel Sánchez",
        userAvatar: defaultAvatarUrl,
        rating: 5,
        date: "5 Mar 2024",
        content: "Las maracas tienen un sonido auténtico y tradicional. La fabricación artesanal se nota en cada detalle. Excelente servicio y entrega rápida.",
        isCurrentUser: false
    }
];

// Variables globales
let selectedProductId = null;
let selectedProductName = "";
let selectedRating = 0;
let reviews = [...sampleReviews];
let nextReviewId = 4;
let editingReviewId = null;
const currentUserName = "Usuario Actual"; // Name of current user
const MIN_CHARS = 100; // Minimum number of characters for the comment

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    renderProductList();
    renderReviews();
    setupEventListeners();
});

// Renderizar lista de productos
function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.className = 'product-item';
        productElement.dataset.id = product.id;

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-item-image">
            <div class="product-item-name">${product.name}</div>
            <div class="product-item-price">${product.price}</div>
        `;

        productList.appendChild(productElement);
    });
}

// Renderizar reseñas
function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = '';

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p style="text-align: center; color: var(--dark);">No hay reseñas para mostrar.</p>';
        return;
    }

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.dataset.id = review.id;

        const starsHTML = generateStarsHTML(review.rating);
        const userBadge = review.isCurrentUser ? '<span class="user-badge">Tú</span>' : '';

        // Mostrar información del producto solo si existe
        const productInfo = review.productName
            ? `<div class="review-product">Producto: ${review.productName}</div>`
            : '';

        // Ahora SIEMPRE mostramos los botones de acción para los comentarios del usuario actual
        const actionButtons = review.isCurrentUser ? `
            <div class="review-actions" style="display: ${review.isCurrentUser ? 'flex' : 'none'}">
                <button class="review-action-button edit-review">
                    <i class='bx bx-edit-alt'></i>
                    <span>Editar</span>
                </button>
                <button class="review-action-button delete-review">
                    <i class='bx bx-trash'></i>
                    <span>Eliminar</span>
                </button>
            </div>
        ` : '';

        reviewElement.innerHTML = `
            <div class="review-header">
                <img src="${review.userAvatar}" alt="${review.userName}" class="user-avatar">
                <div class="review-user-info">
                    <div class="review-user-name">${review.userName} ${userBadge}</div>
                    <div class="review-meta">
                        ${productInfo}
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">
                        ${starsHTML}
                    </div>
                </div>
            </div>
            <div class="review-content">${review.content}</div>
            ${actionButtons}
        `;

        reviewsContainer.appendChild(reviewElement);
    });

    // Solo agregar event listeners a los botones si existen
    document.querySelectorAll('.edit-review').forEach(button => {
        button.addEventListener('click', function (e) {
            const review = e.target.closest('.review');
            const reviewId = parseInt(review.dataset.id);
            const reviewData = reviews.find(r => r.id === reviewId);
            if (reviewData && reviewData.isCurrentUser) {
                handleEditReview(e);
            }
        });
    });

    document.querySelectorAll('.delete-review').forEach(button => {
        button.addEventListener('click', function (e) {
            const review = e.target.closest('.review');
            const reviewId = parseInt(review.dataset.id);
            const reviewData = reviews.find(r => r.id === reviewId);
            if (reviewData && reviewData.isCurrentUser) {
                handleDeleteReview(e);
            }
        });
    });
}

// Generar HTML para estrellas
function generateStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star ${i <= rating ? 'active' : ''}" data-value="${i}">★</span>`;
    }
    return html;
}

// Configurar event listeners
function setupEventListeners() {
    const productButton = document.getElementById('product-button');
    const productDropdown = document.getElementById('product-dropdown');

    if (productButton && productDropdown) {
        productButton.addEventListener('click', function (e) {
            e.stopPropagation();
            productDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!productDropdown.contains(e.target) && e.target !== productButton) {
                productDropdown.classList.remove('active');
            }
        });
    }

    const productList = document.getElementById('product-list');
    if (productList) {
        productList.addEventListener('click', function (e) {
            const productItem = e.target.closest('.product-item');
            if (productItem) {
                const productId = parseInt(productItem.dataset.id);
                selectProduct(productId);
                productDropdown.classList.remove('active');
            }
        });
    }

    const stars = document.querySelectorAll('#rating-stars .star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = parseInt(this.dataset.value);
            selectRating(value);
        });

        star.addEventListener('mouseover', function () {
            const value = parseInt(this.dataset.value);
            highlightStars(value);
        });
    });

    const ratingStars = document.getElementById('rating-stars');
    if (ratingStars) {
        ratingStars.addEventListener('mouseout', function () {
            highlightStars(selectedRating);
        });
    }

    const reviewText = document.getElementById('review-text');
    const charCounter = document.getElementById('char-counter');
    if (reviewText && charCounter) {
        reviewText.addEventListener('input', function () {
            const length = this.value.length;
            charCounter.textContent = `${length}/${MIN_CHARS}`;

            if (length < MIN_CHARS) {
                charCounter.className = length >= MIN_CHARS * 0.7 ? 'char-counter warning' : 'char-counter error';
            } else {
                charCounter.className = 'char-counter';
            }

            validateForm();
        });
    }

    const postButton = document.getElementById('post-button');
    if (postButton) {
        postButton.addEventListener('click', submitReview);
    }

    const cancelEdit = document.getElementById('cancel-edit');
    if (cancelEdit) {
        cancelEdit.addEventListener('click', cancelEdit);
    }
}

// Funciones para seleccionar producto, calificación, validar y enviar reseñas
function selectProduct(productId) {
    selectedProductId = productId;
    const product = products.find(p => p.id === productId);
    selectedProductName = product.name;
    document.getElementById('selected-product-text').textContent = product.name;
    document.querySelectorAll('.product-item').forEach(item => {
        item.classList.remove('selected');
        if (parseInt(item.dataset.id) === productId) {
            item.classList.add('selected');
        }
    });
    validateForm();
}

function selectRating(rating) {
    selectedRating = rating;
    highlightStars(rating);
    validateForm();
}

function highlightStars(count) {
    document.querySelectorAll('#rating-stars .star').forEach(star => {
        const value = parseInt(star.dataset.value);
        if (value <= count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function validateForm() {
    const submitButton = document.getElementById('post-button');
    const errorMessage = document.getElementById('error-message');
    const reviewText = document.getElementById('review-text').value.trim();
    const isTextValid = reviewText.length >= MIN_CHARS;
    const isRatingValid = selectedRating > 0;
    const isValid = isTextValid && isRatingValid;
    submitButton.disabled = !isValid;
    if (!isValid) {
        let errorMsg = [];
        if (!isTextValid) errorMsg.push(`Debes escribir al menos ${MIN_CHARS} caracteres`);
        if (!isRatingValid) errorMsg.push("Debes seleccionar una calificación");
        errorMessage.textContent = errorMsg.join(" y ");
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
}

function submitReview() {
    const reviewText = document.getElementById('review-text').value.trim();
    if (reviewText.length < MIN_CHARS || selectedRating === 0) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }
    if (editingReviewId) {
        const reviewIndex = reviews.findIndex(r => r.id === editingReviewId);
        if (reviewIndex !== -1) {
            reviews[reviewIndex] = {
                ...reviews[reviewIndex],
                productId: selectedProductId,
                productName: selectedProductId ? selectedProductName : null,
                rating: selectedRating,
                content: reviewText,
                date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) + ' (editado)'
            };
        }
        exitEditMode();
    } else {
        const newReview = {
            id: nextReviewId++,
            productId: selectedProductId,
            productName: selectedProductId ? selectedProductName : null,
            userName: currentUserName,
            userAvatar: defaultAvatarUrl, // Usar la imagen por defecto
            rating: selectedRating,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
            content: reviewText,
            isCurrentUser: true // Asegurarnos de que esto esté establecido en true
        };
        reviews.unshift(newReview);
        resetForm();
    }
    renderReviews();
}

function handleEditReview(event) {
    const reviewElement = event.target.closest('.review');
    const reviewId = parseInt(reviewElement.dataset.id);
    const review = reviews.find(r => r.id === reviewId);
    if (review && review.isCurrentUser) {
        enterEditMode(review);
    }
}

function enterEditMode(review) {
    editingReviewId = review.id;
    document.getElementById('review-text').value = review.content;
    const charCounter = document.getElementById('char-counter');
    charCounter.textContent = `${review.content.length}/${MIN_CHARS}`;
    charCounter.className = 'char-counter';
    if (review.productId) {
        selectProduct(review.productId);
    } else {
        selectedProductId = null;
        selectedProductName = "";
        document.getElementById('selected-product-text').textContent = "Producto (opcional)";
    }
    selectRating(review.rating);
    document.getElementById('comment-area').classList.add('edit-mode');
    document.getElementById('post-button').textContent = 'Actualizar';
    document.getElementById('cancel-edit').style.display = 'inline-block';
    document.getElementById('comment-area').scrollIntoView({ behavior: 'smooth' });
}

function exitEditMode() {
    editingReviewId = null;
    document.getElementById('comment-area').classList.remove('edit-mode');
    document.getElementById('post-button').textContent = 'Publicar';
    document.getElementById('cancel-edit').style.display = 'none';
    resetForm();
}

function cancelEdit() {
    exitEditMode();
}

function resetForm() {
    document.getElementById('review-text').value = '';
    document.getElementById('selected-product-text').textContent = 'Producto (opcional)';
    const charCounter = document.getElementById('char-counter');
    charCounter.textContent = `0/${MIN_CHARS}`;
    charCounter.className = 'char-counter error';
    selectedProductId = null;
    selectedProductName = '';
    selectRating(0);
    validateForm();
}

function handleDeleteReview(event) {
    const reviewElement = event.target.closest('.review');
    const reviewId = parseInt(reviewElement.dataset.id);
    const review = reviews.find(r => r.id === reviewId);
    if (review && review.isCurrentUser) {
        if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
            reviews = reviews.filter(r => r.id !== reviewId);
            if (editingReviewId === reviewId) {
                exitEditMode();
            }
            renderReviews();
        }
    }
}

// Agregar función de inicialización
function initReviews() {
    // Obtener los elementos necesarios
    const reviewText = document.getElementById('review-text');
    const charCounter = document.getElementById('char-counter');
    const productButton = document.getElementById('product-button');
    const productDropdown = document.getElementById('product-dropdown');
    const ratingStars = document.getElementById('rating-stars');
    const postButton = document.getElementById('post-button');
    const cancelEditButton = document.getElementById('cancel-edit');

    if (!reviewText || !charCounter || !productButton || !productDropdown || !ratingStars || !postButton) {
        console.error('No se pudieron encontrar todos los elementos necesarios');
        return;
    }

    // Reiniciar el estado
    selectedProductId = null;
    selectedProductName = "";
    selectedRating = 0;
    editingReviewId = null;

    // Renderizar lista de productos y reseñas
    renderProductList();
    renderReviews();

    // Configurar eventos
    setupEventListeners();

    // Restablecer el formulario
    resetForm();
}

// Hacer la función disponible globalmente
window.initReviews = initReviews;
