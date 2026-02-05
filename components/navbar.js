class MainNav extends HTMLElement {
    constructor() {
        super();
        this.cartCount = 0;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <nav class="fixed w-full z-50 top-0 transition-all duration-300" id="navbar">
                <div class="glass shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-20">
                            <!-- Logo -->
                            <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer" onclick="window.scrollTo(0,0)">
                                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white transform rotate-3">
                                    <i data-feather="droplet" class="w-6 h-6"></i>
                                </div>
                                <span class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                    BY OG CLEAN
                                </span>
                            </div>

                            <!-- Desktop Menu -->
                            <div class="hidden md:flex items-center space-x-8">
                                <a href="#categories" class="text-slate-600 hover:text-primary-600 font-medium transition-colors">Catégories</a>
                                <a href="#products" class="text-slate-600 hover:text-primary-600 font-medium transition-colors">Produits</a>
                                <a href="#" onclick="showToast('Page à venir')" class="text-slate-600 hover:text-primary-600 font-medium transition-colors">Notre Histoire</a>
                                <a href="#" onclick="showToast('Page à venir')" class="text-slate-600 hover:text-primary-600 font-medium transition-colors">Blog</a>
                            </div>

                            <!-- Actions -->
                            <div class="hidden md:flex items-center gap-4">
                                <div class="relative">
                                    <input type="text" placeholder="Rechercher..." 
                                        class="pl-10 pr-4 py-2 rounded-full bg-slate-100 border-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all w-48 focus:w-64"
                                        onkeypress="handleSearch(event)">
                                    <i data-feather="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                                </div>
                                
                                <button onclick="toggleCart()" class="relative p-2 text-slate-600 hover:text-primary-600 transition-colors group">
                                    <i data-feather="shopping-bag" class="w-6 h-6"></i>
                                    <span class="cart-badge absolute -top-1 -right-1 w-5 h-5 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center transform scale-0 transition-transform duration-200">0</span>
                                </button>
                                
                                <button onclick="showToast('Connexion à venir')" class="p-2 text-slate-600 hover:text-primary-600 transition-colors">
                                    <i data-feather="user" class="w-6 h-6"></i>
                                </button>
                            </div>

                            <!-- Mobile Menu Button -->
                            <div class="flex md:hidden items-center gap-4">
                                <button onclick="toggleCart()" class="relative p-2 text-slate-600">
                                    <i data-feather="shopping-bag" class="w-6 h-6"></i>
                                    <span class="cart-badge absolute -top-1 -right-1 w-5 h-5 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center hidden">0</span>
                                </button>
                                <button onclick="toggleMobileMenu()" class="p-2 text-slate-600 hover:text-primary-600">
                                    <i data-feather="menu" class="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Menu -->
                    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100">
                        <div class="px-4 pt-2 pb-6 space-y-1">
                            <div class="relative mb-4 mt-2">
                                <input type="text" placeholder="Rechercher..." 
                                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-primary-500"
                                    onkeypress="handleSearch(event)">
                                <i data-feather="search" class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                            </div>
                            <a href="#categories" class="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">Catégories</a>
                            <a href="#products" class="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">Produits</a>
                            <a href="#" onclick="showToast('Page à venir')" class="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">Notre Histoire</a>
                            <a href="#" onclick="showToast('Page à venir')" class="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">Blog</a>
                            <div class="border-t border-slate-100 my-2 pt-2">
                                <a href="#" onclick="showToast('Connexion à venir')" class="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                                    <i data-feather="user" class="w-5 h-5"></i>
                                    Mon Compte
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }
}

customElements.define('main-nav', MainNav);