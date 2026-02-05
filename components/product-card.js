class ProductCard extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'name', 'price', 'original-price', 'image', 'rating', 'reviews', 'badge', 'category', 'description'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const id = this.getAttribute('id');
        const name = this.getAttribute('name');
        const price = parseFloat(this.getAttribute('price')).toFixed(0);
        const originalPrice = parseFloat(this.getAttribute('original-price')).toFixed(0);
        const image = this.getAttribute('image');
        const rating = this.getAttribute('rating');
        const reviews = this.getAttribute('reviews');
        const badge = this.getAttribute('badge');
        const category = this.getAttribute('category');
        const description = this.getAttribute('description');

        const discount = Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100);

        this.innerHTML = `
            <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group h-full flex flex-col">
                <div class="relative overflow-hidden aspect-square bg-slate-100">
                    <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    
                    ${badge ? `
                        <div class="absolute top-4 left-4 px-3 py-1 bg-secondary-500 text-white text-xs font-bold rounded-full shadow-lg">
                            ${badge}
                        </div>
                    ` : ''}
                    
                    ${discount > 0 ? `
                        <div class="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                            -${discount}%
                        </div>
                    ` : ''}
                    
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button onclick="addToCart(${id})" class="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg">
                            <i data-feather="shopping-bag" class="w-4 h-4"></i>
                            Ajouter
                        </button>
                    </div>
                    
                    <button onclick="showToast('Ajouté aux favoris')" class="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                        <i data-feather="heart" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="p-6 flex-1 flex flex-col">
                    <div class="flex items-center gap-1 mb-2">
                        <div class="flex text-amber-400">
                            ${this.renderStars(rating)}
                        </div>
                        <span class="text-xs text-slate-400 ml-1">(${reviews})</span>
                    </div>
                    
                    <h3 class="font-bold text-slate-900 text-lg mb-2 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer">${name}</h3>
                    <p class="text-sm text-slate-500 mb-4 line-clamp-2">${description}</p>
                    
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-2xl font-bold text-primary-600">${price}FCFA</span>
                            ${originalPrice > price ? `<span class="text-sm text-slate-400 line-through">${originalPrice}FCFA</span>` : ''}
                        </div>
                        
                        <button onclick="addToCart(${id})" class="md:hidden w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-lg">
                            <i data-feather="plus" class="w-6 h-6"></i>
                        </button>
                    </div>
                    
                    <div class="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <i data-feather="truck" class="w-3 h-3"></i>
                        Livraison gratuite dès 2 achats
                    </div>
                </div>
            </div>
        `;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i data-feather="star" class="w-4 h-4 fill-current"></i>';
        }
        if (hasHalfStar) {
            stars += '<i data-feather="star" class="w-4 h-4 fill-current opacity-50"></i>';
        }
        
        return stars;
    }
}

customElements.define('product-card', ProductCard);