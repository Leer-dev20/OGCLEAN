// Product Data
const products = [
    {
        id: 1,
        name: "Lessive lucecita detergente original concentrado 5L",
        category: "detergent",
        price: 7000,
        originalPrice: 7500,
        image: "img/lucecita3img.jpg",
        rating: 4.8,
        reviews: 124,
        badge: "Best-seller",
        description: "Formule ultra-concentrée, 25 lavages, parfum délicat"
    },
    {
        id: 2,
        name: "W5 Gel Nettoyant WC de Force Active",
        category: "shower",
        price: 2500,
        originalPrice: 3000,
        image: "img/W5.jpg",
        rating: 4.9,
        reviews: 89,
        badge: "Nouveau",
        description: " Il nettoie jusqu'à faire briller les toilettes et offre un effet anti-calcaire amélioré."
    },
    {
        id: 3,
        name: "GAYAR - La confiance d'un linge impeccable",
        category: "detergent",
        price: 5000,
        originalPrice: 6500,
        image: "img/gayar.png",
        rating: 4.7,
        reviews: 203,
        badge: "Eco-responsable",
        description: "Mettez votre machine à laver en marche et versez tout simplement la lessive liquide GAYAR dans le bac de votre machine."
    },
    {
        id: 4,
        name: "Gel de bano lavanda & eucalipto",
        category: "shower",
        price: 2000,
        originalPrice: 2500,
        image: "img/lavanda.jpg",
        rating: 4.6,
        reviews: 67,
        badge: "Vegan",
        description: "Gel de baño y ducha con una mezcla de aceites esenciales de lavanda refrescante, relajante y Eucaliptus."
    },
    {
        id: 5,
        name: "Puxin lessive liquide waschmittel gel 10L",
        category: "detergent",
        price: 10000,
        originalPrice: 12500,
        image: "img/puxin.png",
        rating: 4.8,
        reviews: 156,
        badge: null,
        description: "Spécial peaux sensibles, sans allergènes"
    },
    {
        id: 6,
        name: "Intimate care wash gel ",
        category: "shower",
        price: 3000,
        originalPrice: 3500,
        image: "img/intimatecare_ph-neutral.jpeg",
        rating: 4.9,
        reviews: 234,
        badge: "Coup de cœur",
        description: "Formulé pour un nettoyage doux et délicat, il assure une hygiène intime saine."
    },
    {
        id: 7,
        name: "Detergente lavadora pieles sensibles 2L",
        category: "detergent",
        price: 3000,
        originalPrice: 3500,
        image: "img/detergentelavadora.jpg",
        rating: 4.5,
        reviews: 98,
        badge: null,
        description: "Détergent liquide Marseille pour machine à laver, 30 lavages, parfum frais"
    },
    {
        id: 8,
        name: "Gel de Douche Bergamota & Yuzu 750ml",
        category: "shower",
        price: 2000,
        originalPrice: 2500,
        image: "img/bergamota&yuzu.jpg",
        rating: 4.7,
        reviews: 145,
        badge: "Hydratant",
        description: "Texture crème onctueuse, peau satinée"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('bubbleBlissCart')) || [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <product-card 
            id="${product.id}"
            name="${product.name}"
            price="${product.price}"
            original-price="${product.originalPrice}"
            image="${product.image}"
            rating="${product.rating}"
            reviews="${product.reviews}"
            badge="${product.badge || ''}"
            category="${product.category}"
            description="${product.description}"
        ></product-card>
    `).join('');
    
    // Re-initialize feather icons for new content
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Filter Category
function filterCategory(category) {
    currentFilter = category;
    
    // Update buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
            btn.classList.add('bg-primary-600', 'text-white');
        } else {
            btn.classList.add('text-slate-600', 'hover:bg-slate-100');
            btn.classList.remove('bg-primary-600', 'text-white');
        }
    });
    
    // Animate grid
    productsGrid.style.opacity = '0';
    setTimeout(() => {
        renderProducts();
        productsGrid.style.opacity = '1';
    }, 200);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${product.name} ajouté au panier`);
    
    // Open cart drawer on mobile after adding
    if (window.innerWidth < 768) {
        setTimeout(() => openCart(), 300);
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDrawer();
}

// Update Quantity
function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            updateCartDrawer();
        }
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('bubbleBlissCart', JSON.stringify(cart));
}

// Update Cart Count Badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Calculate Total
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
}

// Update Cart Drawer Content
function updateCartDrawer() {
    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
        drawer.renderCart();
    }
}

// Toggle Cart Drawer
function toggleCart() {
    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
        drawer.toggle();
    }
}

function openCart() {
    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
        drawer.open();
    }
}

function closeCart() {
    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
        drawer.close();
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.querySelector('toast-notification');
    if (toast) {
        toast.show(message);
    }
}

// Newsletter Handler
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showToast(`Merci ! Un email de confirmation a été envoyé à ${email}`);
    e.target.reset();
}

// Load More Products (Simulation)
function loadMoreProducts() {
    showToast('Chargement de nouveaux produits...');
    // In a real app, this would fetch from an API
    setTimeout(() => {
        showToast('Nouveaux produits ajoutés !');
    }, 1000);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Search functionality (visual only for demo)
function handleSearch(e) {
    if (e.key === 'Enter') {
        showToast(`Recherche: ${e.target.value}`);
    }
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.filterCategory = filterCategory;
window.loadMoreProducts = loadMoreProducts;
window.handleNewsletter = handleNewsletter;
window.toggleMobileMenu = toggleMobileMenu;
window.handleSearch = handleSearch;