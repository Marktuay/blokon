window.CartManager = {
    getItems: () => JSON.parse(localStorage.getItem('pe_cart') || '[]'),
    addItem: (item) => {
        const items = window.CartManager.getItems();
        if (!items.find(i => i.id === item.id)) {
            items.push(item);
            localStorage.setItem('pe_cart', JSON.stringify(items));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    },
    removeItem: (id) => {
        let items = window.CartManager.getItems();
        items = items.filter(i => String(i.id) !== String(id));
        localStorage.setItem('pe_cart', JSON.stringify(items));
        window.dispatchEvent(new Event('cartUpdated'));
    },
    clear: () => {
        localStorage.removeItem('pe_cart');
        window.dispatchEvent(new Event('cartUpdated'));
    }
};

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isProyectos = currentPath.includes('proyectos.html');
        const isNosotros = currentPath.includes('nosotros.html');
        const isContacto = currentPath.includes('contacto.html');
        
        this.style.display = 'block';
        
        this.innerHTML = `
            <header class="glass-nav">
                <div class="nav-container">
                    <a href="index.html" class="logo header-box" style="text-decoration:none; display:flex; align-items:center;">
                        <img src="images/logo-blokon.jpg" alt="Logo Blokon" style="height: 40px; width: auto; max-width: 150px; object-fit: contain;">
                    </a>
                    <nav class="main-nav">
                        <div class="menu-links header-box">
                            <a href="proyectos.html" class="nav-link" ${isProyectos ? 'style="color:var(--primary);"' : ''}>Proyectos</a>
                            <a href="#" class="nav-link" style="color:inherit;">Muro</a>
                            <a href="#" class="nav-link" style="color:inherit;">Kits V</a>
                            <a href="blog.html" class="nav-link" style="color:inherit;">Blog</a>
                            <a href="nosotros.html" class="nav-link" ${isNosotros ? 'style="color:var(--primary);"' : ''}>Sobre Nosotros</a>
                            <a href="contacto.html" class="nav-link nav-cta" ${isContacto ? 'style="color:var(--primary);"' : ''}>Contacto</a>
                        </div>
                        
                        <div class="header-actions header-box" style="display: flex; gap: var(--spacing-4); align-items: center; margin-left: var(--spacing-2); padding-left: var(--spacing-4);">
                            <div class="header-contact-info" style="display: flex; flex-direction: column; align-items: flex-end; margin-right: var(--spacing-4);">
                                <a href="tel:+50586927530" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 1rem;">+505 8692 - 7530</a>
                                <a href="mailto:ventas@blok-on.com" style="color: var(--on-background); font-size: 0.95rem; text-decoration: none;">ventas@blok-on.com</a>
                            </div>
                            <a href="#" class="header-icon-link" aria-label="Buscar" style="color: inherit; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </a>
                            <a href="#" class="header-icon-link" aria-label="Perfil" style="color: inherit; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </a>
                            <button id="cart-toggle" class="header-icon-button" aria-label="Carrito" style="position: relative; background: none; cursor: pointer; color: inherit; padding: 0; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.5"></circle><circle cx="20" cy="21" r="1.5"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                <span id="cart-count" style="position: absolute; top: -8px; right: -10px; background: #ffcc00; color: #000; border: 2.5px solid #000; font-weight: 900; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; display: flex; align-items: center; justify-content: center;">0</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <div id="cart-drawer" class="cart-drawer">
                <div class="cart-drawer-header">
                    <h3>Proyectos en Cotización</h3>
                    <button id="cart-close" class="btn" style="padding: 0.5rem;">✕</button>
                </div>
                <div id="cart-items" class="cart-drawer-items">
                    <!-- Items gen -->
                </div>
                <div class="cart-drawer-footer">
                    <button id="cart-checkout" class="btn btn-primary btn-block">Solicitar Contacto</button>
                </div>
            </div>
            
            <div id="cart-overlay" class="cart-overlay"></div>
        `;

        // Lógica del Drawer
        const toggleBtn = this.querySelector('#cart-toggle');
        const closeBtn = this.querySelector('#cart-close');
        const drawer = this.querySelector('#cart-drawer');
        const overlay = this.querySelector('#cart-overlay');
        const countBadge = this.querySelector('#cart-count');
        const itemsContainer = this.querySelector('#cart-items');
        const checkoutBtn = this.querySelector('#cart-checkout');

        const updateCartUI = () => {
            const items = window.CartManager.getItems();
            countBadge.textContent = items.length;
            countBadge.style.display = items.length > 0 ? 'flex' : 'none';
            
            if (items.length === 0) {
                itemsContainer.innerHTML = '<p class="body-md text-variant" style="padding: var(--spacing-4);">No hay proyectos seleccionados.</p>';
            } else {
                itemsContainer.innerHTML = items.map(item => `
                    <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--outline-variant); padding:var(--spacing-3) 0;">
                        <div>
                            <span class="technical-label" style="margin-bottom:0;">REF // ${item.sku}</span>
                            <div class="headline-text" style="font-size:1rem;">${item.name}</div>
                        </div>
                        <button onclick="window.CartManager.removeItem('${item.id}')" style="background:none; border:none; color:var(--error, #d32f2f); cursor:pointer; font-size:1.2rem;">×</button>
                    </div>
                `).join('');
            }
        };

        const toggleDrawer = () => {
            drawer.classList.toggle('open');
            overlay.classList.toggle('open');
        };

        toggleBtn.addEventListener('click', toggleDrawer);
        closeBtn.addEventListener('click', toggleDrawer);
        overlay.addEventListener('click', toggleDrawer);
        
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'contacto.html?action=quote';
        });

        const profileBtn = this.querySelector('a[aria-label="Perfil"]');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.AuthManager && window.AuthManager.getUser()) {
                    window.location.href = 'mi-cuenta.html';
                } else {
                    window.location.href = 'login.html';
                }
            });
        }

        window.addEventListener('cartUpdated', updateCartUI);
        updateCartUI();
    }
}
customElements.define('site-header', SiteHeader);

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block';
        this.innerHTML = `
            <footer class="mega-footer">
                <div class="container mega-grid">
                    <!-- Column 1: Quick Contact -->
                    <div class="footer-col footer-col-form">
                        <h4 class="footer-title">Cotización Rápida</h4>
                            <form class="quick-contact-form">
                                <input type="hidden" name="your-subject" value="Cotización desde footer">
                                <div class="form-row">
                                    <input type="text" name="your-name" placeholder="Nombre" required>
                                </div>
                                <div class="form-row">
                                    <input type="tel" name="tel-63" placeholder="Teléfono" required>
                                    <input type="email" name="your-email" placeholder="Email" required>
                                </div>
                                <textarea name="your-message" placeholder="Mensaje" rows="3" required></textarea>
                                <button type="submit" class="btn btn-secondary btn-block" style="padding: 0.8rem; font-weight:700;">Enviar</button>
                            </form>
                        <p class="footer-text-small mt-3">Responderemos a la brevedad. No compartimos tu información con terceros de ninguna manera.</p>
                        <div class="footer-hours mt-3">
                            <div class="hour-row"><span>Lun - Vie:</span><span>9:00 am - 18:00 pm</span></div>
                            <div class="hour-row"><span>Sab:</span><span>9:00 am - 14:00 pm</span></div>
                            <div class="hour-row"><span>Dom:</span><span>Cerrado</span></div>
                        </div>
                    </div>

                    <!-- Column 2: Menu -->
                    <div class="footer-col">
                        <h4 class="footer-title">MENÚ</h4>
                        <ul class="footer-links-list">
                            <li><a href="index.html">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                Inicio
                            </a></li>
                            <li><a href="proyectos.html">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                Catálogo
                            </a></li>
                            <li><a href="nosotros.html">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                Nosotros
                            </a></li>
                            <li><a href="contacto.html">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                Contacto
                            </a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Portafolio -->
                    <div class="footer-col">
                        <h4 class="footer-title">PORTAFOLIO</h4>
                        <ul class="footer-links-list">
                            <li><a href="proyectos.html?f=infraestructura">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                Infraestructura
                            </a></li>
                            <li><a href="proyectos.html?f=corporativo">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M12 22v-7"/><path d="M12 2v2"/><path d="M12 8v2"/><path d="M16 22V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v17"/><path d="M22 22V11a2 2 0 0 0-2-2h-4"/></svg>
                                Corporativo
                            </a></li>
                            <li><a href="proyectos.html?f=cultura">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M4 22h16"/><path d="M6 10v9"/><path d="M10 10v9"/><path d="M14 10v9"/><path d="M18 10v9"/><path d="M12 2 2 7v3h20V7L12 2z"/></svg>
                                Cultura
                            </a></li>
                            <li><a href="proyectos.html?f=residencial">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                Especiales
                            </a></li>
                        </ul>
                    </div>

                    <!-- Column 4: Servicios -->
                    <div class="footer-col">
                        <h4 class="footer-title">SERVICIOS</h4>
                        <ul class="footer-links-list">
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                                Diseño Estructural
                            </a></li>
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
                                Supervisión
                            </a></li>
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                Consultoría
                            </a></li>
                            <li><a href="#" style="color:var(--secondary);">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                                Sustentabilidad
                            </a></li>
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                Desarrollo
                            </a></li>
                        </ul>
                    </div>

                    <!-- Column 5: Account -->
                    <div class="footer-col">
                        <h4 class="footer-title">ACCOUNT</h4>
                        <ul class="footer-links-list special-account-menu">
                            <li>
                                <a href="mi-cuenta.html" style="display:flex; align-items:center;">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px; flex-shrink:0;">
                                        <path d="M3.34 16A10 10 0 1 1 20.66 16"/><path d="M12 14v2"/><path d="M12 14l4-4"/>
                                    </svg>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="mi-cuenta.html" style="display:flex; align-items:center;">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px; flex-shrink:0;">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/><polyline points="9 14 11 16 15 12"></polyline>
                                    </svg>
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a href="mi-cuenta.html" style="display:flex; align-items:center;">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px; flex-shrink:0;">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    Addresses
                                </a>
                            </li>
                            <li>
                                <a href="mi-cuenta.html" style="display:flex; align-items:center;">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px; flex-shrink:0;">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><circle cx="18" cy="18" r="3"/><path d="M18 13v2"/><path d="M18 21v2"/><path d="M14 18h2"/><path d="M20 18h2"/><path d="M15.5 15.5l1.5 1.5"/><path d="M19 19l1.5 1.5"/><path d="M20.5 15.5L19 17"/><path d="M17 19l-1.5 1.5"/>
                                    </svg>
                                    Details
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Column 6: Contacto -->
                    <div class="footer-col">
                        <h4 class="footer-title">CONTACTO</h4>
                        <ul class="footer-links-list">
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                +52 (55) 1234-5678
                            </a></li>
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                                +52 (55) 8765-4321
                            </a></li>
                            <li><a href="mailto:info@blokon.mx">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                info@blokon.mx
                            </a></li>
                            <li><a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#96c121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Km 18.5 carretera nueva a León, Mateare
                            </a></li>
                        </ul>
                    </div>
                </div>

                <div class="container">
                    <hr class="footer-divider">
                </div>

                <div class="container footer-bottom">
                    <div class="payment-methods">
                        <span class="footer-text-small footer-bottom-title">PAGOS ACEPTADOS</span>
                        <div class="payment-icons">
                            <div class="pay-icon" style="color:#142c8e; font-style:italic;">VISA</div>
                            <div class="pay-icon" style="color:#eb001b;">mastercard</div>
                            <div class="pay-icon" style="color:#0079c1; font-style:italic;">PayPal</div>
                            <div class="pay-icon" style="color:#000;">Pay</div>
                        </div>
                    </div>
                    <div class="social-links">
                        <span class="footer-text-small footer-bottom-title social-title">SÍGUENOS</span>
                        <div class="social-icons">
                            <a href="#" class="social-icon">f</a>
                            <a href="#" class="social-icon">IG</a>
                            <a href="#" class="social-icon">𝕏</a>
                            <a href="#" class="social-icon">in</a>
                            <a href="#" class="social-icon">▶</a>
                            
                        </div>
                    </div>
                </div>
                <div class="container" style="text-align:center; margin-top:2rem;">
                    <span class="footer-text-small" style="color:var(--secondary); font-size:0.95rem;">Copyright © New Century Companies 2026. Todos los derechos reservados.</span>
                </div>
            </footer>
            
            <!-- Botón Flotante de WhatsApp Global -->
            <a href="https://wa.me/525512345678?text=Hola%20equipo%20de%20Blokon,%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n." target="_blank" class="whatsapp-float" aria-label="Escríbenos por WhatsApp">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
            </a>
        `;
    }
}
customElements.define('site-footer', SiteFooter);
