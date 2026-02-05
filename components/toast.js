class ToastNotification extends HTMLElement {
    constructor() {
        super();
        this.message = '';
        this.showing = false;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="toast-container" class="fixed bottom-6 right-6 z-[80] flex flex-col gap-2 pointer-events-none">
                <!-- Toasts will be injected here -->
            </div>
        `;
    }

    show(message, duration = 3000) {
        const container = this.querySelector('#toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast pointer-events-auto bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-[400px]';
        toast.innerHTML = `
            <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i data-feather="check" class="w-4 h-4"></i>
            </div>
            <p class="font-medium text-sm">${message}</p>
            <button onclick="this.parentElement.remove()" class="ml-auto text-slate-400 hover:text-white transition-colors">
                <i data-feather="x" class="w-4 h-4"></i>
            </button>
        `;

        container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }
}

customElements.define('toast-notification', ToastNotification);