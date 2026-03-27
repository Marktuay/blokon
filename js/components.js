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
                    <a href="index.html" class="logo" style="text-decoration:none; display:flex; align-items:center;">
                        <img src="images/logo-blokon.jpg" alt="Logo Blokon" style="height: 40px; width: auto; max-width: 150px; object-fit: contain;">
                    </a>
                    <nav>
                        <a href="proyectos.html" ${isProyectos ? 'style="color:var(--primary);"' : ''}>Proyectos</a>
                        <a href="nosotros.html" ${isNosotros ? 'style="color:var(--primary);"' : ''}>Nosotros</a>
                        <a href="contacto.html" class="btn btn-primary" ${isContacto ? 'style="background-color:var(--primary-container);"' : ''}>Contacto</a>
                        
                        <div class="header-actions" style="display: flex; gap: var(--spacing-4); align-items: center; margin-left: var(--spacing-2); border-left: 1px solid var(--outline-variant); padding-left: var(--spacing-4);">
                            <a href="#" aria-label="Buscar" style="color: inherit; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </a>
                            
                            <a href="#" aria-label="Perfil" style="color: inherit; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </a>
                            
                            <button id="cart-toggle" aria-label="Carrito" style="position: relative; background: none; border: none; cursor: pointer; color: inherit; padding: 0; display: flex; align-items: center; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">
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
                        <form class="quick-contact-form" onsubmit="event.preventDefault(); alert('Mensaje enviado');">
                            <div class="form-row">
                                <input type="text" placeholder="Nombre" required>
                                <input type="text" placeholder="Apellidos" required>
                            </div>
                            <div class="form-row">
                                <input type="tel" placeholder="Teléfono" required>
                                <input type="email" placeholder="Email" required>
                            </div>
                            <textarea placeholder="Mensaje" rows="3" required></textarea>
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
                            <li><a href="index.html"><span class="icon-accent"></span> Inicio</a></li>
                            <li><a href="proyectos.html"><span class="icon-accent"></span> Catálogo</a></li>
                            <li><a href="nosotros.html"><span class="icon-accent"></span> Nosotros</a></li>
                            <li><a href="contacto.html"><span class="icon-accent"></span> Contacto</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Account -> Portafolio -->
                    <div class="footer-col">
                        <h4 class="footer-title">PORTAFOLIO</h4>
                        <ul class="footer-links-list">
                            <li><a href="proyectos.html?f=infraestructura"><span class="icon-accent"></span> Infraestructura</a></li>
                            <li><a href="proyectos.html?f=corporativo"><span class="icon-accent"></span> Corporativo</a></li>
                            <li><a href="proyectos.html?f=cultura"><span class="icon-accent"></span> Cultura</a></li>
                            <li><a href="proyectos.html?f=residencial"><span class="icon-accent"></span> Especiales</a></li>
                        </ul>
                    </div>

                    <!-- Column 4: Categories -> Servicios -->
                    <div class="footer-col">
                        <h4 class="footer-title">SERVICIOS</h4>
                        <ul class="footer-links-list no-icons">
                            <li><a href="#">Diseño Estructural</a></li>
                            <li><a href="#">Supervisión</a></li>
                            <li><a href="#">Consultoría</a></li>
                            <li><a href="#" style="color:var(--secondary);">Sustentabilidad</a></li>
                            <li><a href="#">Desarrollo</a></li>
                        </ul>
                    </div>

                    <!-- Column 5: Support -->
                    <div class="footer-col">
                        <h4 class="footer-title">SOPORTE</h4>
                        <ul class="footer-links-list no-icons">
                            <li><a href="#">Privacidad</a></li>
                            <li><a href="#">Términos de Uso</a></li>
                            <li><a href="#">Garantías</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    <!-- Column 6: Get In Touch -->
                    <div class="footer-col">
                        <h4 class="footer-title">CONTACTO</h4>
                        <ul class="footer-links-list">
                            <li><a href="#"><span class="icon-accent"></span> +52 (55) 1234-5678</a></li>
                            <li><a href="#"><span class="icon-accent"></span> +52 (55) 8765-4321</a></li>
                            <li><a href="mailto:info@blokon.mx"><span class="icon-accent"></span> info@blokon.mx</a></li>
                            <li><a href="#"><span class="icon-accent"></span> Torre Apex, Piso 12,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ciudad de México</a></li>
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
