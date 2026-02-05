class MainFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
                <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <!-- Brand -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white transform rotate-3">
                                <i data-feather="droplet" class="w-6 h-6"></i>
                            </div>
                            <span class="text-2xl font-bold text-white">BY OG CLEAN</span>
                        </div>
                        <p class="text-slate-400 leading-relaxed">
                            Votre destination beauté et entretien éco-responsable. Des produits qui respectent votre peau et notre planète.
                        </p>
                        <div class="flex gap-4">
                            <a href="#" onclick="showToast('Facebook')" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                                <i data-feather="facebook" class="w-5 h-5"></i>
                            </a>
                            <a href="#" onclick="showToast('Instagram')" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-secondary-600 hover:text-white transition-all">
                                <i data-feather="instagram" class="w-5 h-5"></i>
                            </a>
                            <a href="#" onclick="showToast('Twitter')" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-400 hover:text-white transition-all">
                                <i data-feather="twitter" class="w-5 h-5"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Navigation</h4>
                        <ul class="space-y-3">
                            <li><a href="#products" class="hover:text-primary-400 transition-colors">Nos Produits</a></li>
                            <li><a href="#categories" class="hover:text-primary-400 transition-colors">Catégories</a></li>
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">Nouveautés</a></li>
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">Promotions</a></li>
                        </ul>
                    </div>

                    <!-- Customer Service -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Service Client</h4>
                        <ul class="space-y-3">
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">Contactez-nous</a></li>
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">FAQ</a></li>
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">Livraison & Retours</a></li>
                            <li><a href="#" onclick="showToast('Page à venir')" class="hover:text-primary-400 transition-colors">Conditions générales</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Contact</h4>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-3">
                                <i data-feather="map-pin" class="w-5 h-5 text-primary-500"></i>
                                <span>Cit Apix Tivaouane Peul, Dakar</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <i data-feather="phone" class="w-5 h-5 text-primary-500"></i>
                                <span>00221 78 017 50 11</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <i data-feather="mail" class="w-5 h-5 text-primary-500"></i>
                                <span>massambag815@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-slate-500">© 2025 BY OG CLEAN Boutique. Tous droits réservés.</p>
                    <div class="flex items-center gap-6 text-sm text-slate-500">
                        <a href="#" onclick="showToast('Politique de confidentialité')" class="hover:text-white transition-colors">Confidentialité</a>
                        <a href="#" onclick="showToast('Cookies')" class="hover:text-white transition-colors">Cookies</a>
                        <a href="#" onclick="showToast('Mentions légales')" class="hover:text-white transition-colors">Mentions légales</a>
                    </div>
                </div>
            </footer>
        `;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

customElements.define('main-footer', MainFooter);