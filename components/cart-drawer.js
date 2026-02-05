class CartDrawer extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const cart = JSON.parse(localStorage.getItem('bubbleBlissCart')) || [];
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        this.innerHTML = `
            <div id="cart-overlay" class="fixed inset-0 bg-black/50 z-[60] opacity-0 pointer-events-none transition-opacity duration-300"></div>
            
            <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col">
                <div class="flex items-center justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 class="text-xl font-bold text-slate-900">Votre Panier</h2>
                        <p class="text-sm text-slate-500">${itemCount} article${itemCount > 1 ? 's' : ''}</p>
                    </div>
                    <button onclick="closeCart()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <i data-feather="x" class="w-6 h-6 text-slate-500"></i>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto p-6">
                    ${cart.length === 0 ? `
                        <div class="text-center py-12">
                            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i data-feather="shopping-bag" class="w-10 h-10 text-slate-400"></i>
                            </div>
                            <p class="text-slate-500 mb-4">Votre panier est vide</p>
                            <button onclick="closeCart()" class="text-primary-600 font-medium hover:underline">
                                Continuer les achats
                            </button>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${cart.map(item => `
                                <div class="flex gap-4 bg-slate-50 p-4 rounded-xl">
                                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-slate-900 text-sm line-clamp-2 mb-1">${item.name}</h4>
                                        <p class="text-primary-600 font-bold">${item.price.toFixed(2)}FCFA</p>
                                        
                                        <div class="flex items-center gap-3 mt-2">
                                            <div class="flex items-center gap-2 bg-white rounded-lg border border-slate-200">
                                                <button onclick="updateQuantity(${item.id}, -1)" class="px-3 py-1 hover:bg-slate-100 text-slate-600 transition-colors">-</button>
                                                <span class="text-sm font-medium w-4 text-center">${item.quantity}</span>
                                                <button onclick="updateQuantity(${item.id}, 1)" class="px-3 py-1 hover:bg-slate-100 text-slate-600 transition-colors">+</button>
                                            </div>
                                            <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-600 text-sm underline">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
                
                ${cart.length > 0 ? `
                    <div class="border-t border-slate-100 p-6 bg-slate-50">
                        <div class="flex justify-between items-center mb-2 text-sm">
                            <span class="text-slate-600">Sous-total</span>
                            <span class="font-medium">${total}FCFA</span>
                        </div>
                        <div class="flex justify-between items-center mb-4 text-sm">
                            <span class="text-slate-600">Livraison</span>
                            <span class="text-green-600 font-medium">${parseFloat(total) > 50 ? 'Gratuite' : '3.90FCFA'}</span>
                        </div>
                        <div class="flex justify-between items-center mb-6 text-lg font-bold">
                            <span class="text-slate-900">Total</span>
                            <span class="text-primary-600">${parseFloat(total) > 50 ? total : (parseFloat(total) + 3.90).toFixed(2)}FCFA</span>
                        </div>
                        
                        <button onclick="showToast('Redirection vers le paiement...')" class="w-full py-4 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2">
                            Commander
                            <i data-feather="arrow-right" class="w-5 h-5"></i>
                        </button>
                        
                        <button onclick="closeCart()" class="w-full mt-3 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors">
                            Continuer les achats
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    setupEventListeners() {
        // Close on overlay click
        const overlay = this.querySelector('#cart-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        const drawer = this.querySelector('#cart-drawer');
        const overlay = this.querySelector('#cart-overlay');
        
        if (drawer && overlay) {
            drawer.classList.remove('translate-x-full');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        }
        this.render();
    }

    close() {
        this.isOpen = false;
        const drawer = this.querySelector('#cart-drawer');
        const overlay = this.querySelector('#cart-overlay');
        
        if (drawer && overlay) {
            drawer.classList.add('translate-x-full');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    renderCart() {
        this.render();
    }
}

customElements.define('cart-drawer', CartDrawer);