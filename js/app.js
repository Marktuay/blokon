// WooCommerce API Configuration
const WC_CONFIG = {
    url: 'http://8.229.91.134', // IP provista
    // Como implementaremos el snippet PHP de permisos públicos, ya no necesitamos exponer llaves:
    usarMockLocal: false // Cambia a `false` una vez que instales el snippet PHP en WordPress
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations Logic
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const revealObserverOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    window.revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    fadeUpElements.forEach(el => window.revealObserver.observe(el));

    // 2. Navigation Background Effect
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 10px 30px rgba(0, 8, 57, 0.1)';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            } else {
                nav.style.boxShadow = 'var(--ambient-shadow)';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            }
        });
    }

    // 3. Contact Form Submission (Mock)
    const btnSubmit = document.querySelector('.contact-form .btn-primary');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            btnSubmit.textContent = 'Enviando...';
            setTimeout(() => {
                btnSubmit.textContent = 'Especificaciones Recibidas';
                btnSubmit.style.backgroundColor = '#143ca9';
                document.querySelector('.contact-form').reset();
                setTimeout(() => {
                    btnSubmit.textContent = 'Enviar Especificaciones';
                    btnSubmit.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }

    // 4. Initialize WooCommerce Fetching if container exists
    if (document.getElementById('wc-products-container')) {
        loadWooCommerceProjects();
    }
});

// WooCommerce Integration Logic
async function loadWooCommerceProjects() {
    const container = document.getElementById('wc-products-container');

    try {
        const products = await fetchProducts();
        window.allProducts = products; // Store for filtering
        
        // Render filters if we are on the portfolio page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        if (!isHomePage && document.getElementById('project-filters')) {
            renderFilters(products);
        }
        
        renderProducts(products);
    } catch (error) {
        console.error('Error cargando proyectos WooCommerce:', error);
        container.innerHTML = `<p class="body-md text-variant fade-up visible" style="color:var(--error); padding: var(--spacing-4); border: 1px solid var(--outline-variant); border-radius: var(--radius-sm);">
            Error de conexión CORS o API REST inalcanzable. Verifique que el snippet PHP esté activo en WordPress. 
            Detalle: ${error.message}
        </p>`;
    }
}

async function fetchProducts() {
    // Si la bandera está activada, usamos mock para que no se vea feo mientras configuras el WP
    if (WC_CONFIG.usarMockLocal) {
        console.warn("[Modo Desarrollo] Mostrando portfolio de prueba. Cambia usarMockLocal a 'false' en app.js para usar la API.");
        return getMockProducts();
    }

    const endpoint = `${WC_CONFIG.url}/wp-json/wc/v3/products`;

    // Ya no mandamos Basic Auth. Dependemos de que el endpoint sea público vía el snippet PHP.
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`API respondió con estado ${response.status}`);
    }
    return await response.json();
}

function renderFilters(products) {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;

    // Extract unique categories
    const categoriesInfo = new Map();
    products.forEach(p => {
        if (p.categories) {
            p.categories.forEach(c => {
                categoriesInfo.set(c.name, c.slug);
            });
        }
    });

    let buttonsHtml = `<button class="chip active-filter" data-category="all" style="cursor:pointer; border:1px solid var(--primary); background:var(--primary); color:white;">Ver Todos</button>`;
    
    categoriesInfo.forEach((slug, name) => {
        buttonsHtml += `<button class="chip filter-btn" data-category="${name}" style="cursor:pointer; border:1px solid var(--outline-variant); background:var(--surface-container-lowest);">${name}</button>`;
    });

    filterContainer.innerHTML = buttonsHtml;

    // Setup event listeners
    const buttons = filterContainer.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            buttons.forEach(b => {
                b.style.background = 'var(--surface-container-lowest)';
                b.style.color = 'var(--on-secondary-fixed)';
                b.style.borderColor = 'var(--outline-variant)';
                b.classList.remove('active-filter');
            });
            e.target.style.background = 'var(--primary)';
            e.target.style.color = 'white';
            e.target.style.borderColor = 'var(--primary)';
            e.target.classList.add('active-filter');

            const category = e.target.getAttribute('data-category');
            if (category === 'all') {
                renderProducts(window.allProducts);
            } else {
                const filtered = window.allProducts.filter(p => 
                    p.categories && p.categories.some(c => c.name === category)
                );
                renderProducts(filtered);
            }
        });
    });
}

function renderProducts(products) {
    const container = document.getElementById('wc-products-container');
    container.innerHTML = ''; // Clear loading message

    if (!products || products.length === 0) {
        container.innerHTML = '<p class="body-md text-variant">No se encontraron proyectos publicados en la tienda.</p>';
        return;
    }

    // Whether we are on home page (limit items) or portfolio page
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    const displayProducts = isHomePage ? products.slice(0, 3) : products;

    displayProducts.forEach((product, index) => {
        // Image extraction
        const imageUrl = (product.images && product.images.length > 0)
            ? product.images[0].src
            : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop';

        // Tags / Categories extraction
        let chipsHtml = '';
        if (product.categories && product.categories.length > 0) {
            chipsHtml = product.categories.slice(0, 2).map(cat => `<span class="chip">${cat.name}</span>`).join('');
        }

        // Excerpt stripping
        const rawDesc = product.short_description || product.description || '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawDesc;
        const cleanDesc = tempDiv.textContent || tempDiv.innerText || '';
        const excerpt = cleanDesc.length > 120 ? cleanDesc.substring(0, 120) + '...' : cleanDesc;

        // Pricing
        let priceHtml = '';
        if (product.price) {
            priceHtml = `<span class="technical-label" style="color:var(--primary); margin-top:var(--spacing-2);">Inversión base: $${product.price}</span>`;
        }

        const safeName = product.name.replace(/'/g, "\\'");
        const safeSku = (product.sku || product.id).toString().replace(/'/g, "\\'");

        const article = document.createElement('article');
        article.className = 'project-card fade-up';
        article.style.transitionDelay = `${(index % 6) * 0.1}s`;

        article.innerHTML = `
            <a href="producto.html?id=${product.id}" class="card-image-wrapper" style="display:block;">
                <div class="card-image" style="background-image: url('${imageUrl}');"></div>
            </a>
            <div class="card-content">
                <span class="technical-label">REF // ${product.sku || product.id}</span>
                <a href="producto.html?id=${product.id}" style="text-decoration:none; color:inherit;">
                    <h3 class="headline-text" style="transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='inherit'">${product.name}</h3>
                </a>
                <p class="body-md text-variant" style="margin-bottom:var(--spacing-2);">${excerpt}</p>
                ${priceHtml}
                <div class="action-chips" style="margin-top:var(--spacing-3);">
                    ${chipsHtml}
                </div>
                
                <div style="display:flex; gap: var(--spacing-2); margin-top: var(--spacing-4);">
                    <button class="btn btn-primary" style="flex:1; padding: 0.5rem;" onclick="window.CartManager.addItem({id: '${product.id}', name: '${safeName}', sku: '${safeSku}'});">Añadir a Cotización</button>
                    <a href="producto.html?id=${product.id}" class="btn btn-secondary" style="padding: 0.5rem;">Detalles</a>
                </div>
            </div>
        `;

        container.appendChild(article);

        // Let the reveal observer catch the newly generated element
        if (window.revealObserver) {
            setTimeout(() => {
                window.revealObserver.observe(article);
            }, 50);
        }
    });

    // Option to view all on home page
    if (isHomePage && products.length > 3) {
        const viewAllWrapper = document.createElement('div');
        viewAllWrapper.style.gridColumn = '1 / -1';
        viewAllWrapper.style.textAlign = 'center';
        viewAllWrapper.style.marginTop = 'var(--spacing-5)';
        viewAllWrapper.className = 'fade-up';
        viewAllWrapper.innerHTML = `<a href="proyectos.html" class="btn btn-secondary">Ver ${products.length} Proyectos Totales</a>`;
        container.appendChild(viewAllWrapper);
        if (window.revealObserver) window.revealObserver.observe(viewAllWrapper);
    }
}

// Fallback Mock data to keep the site beautiful if API is not configured yet
function getMockProducts() {
    // Adding artificial delay to show loading state
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1001,
                    sku: 'TR-102',
                    name: 'Complejo Financiero Norte',
                    description: 'Acero y cristal fundidos en un bloque geométrico de 120 pisos. Sostenibilidad clase A+.',
                    price: '1.2B',
                    images: [{ src: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop' }],
                    categories: [{ name: 'Corporativo' }, { name: 'LEED Platinum' }]
                },
                {
                    id: 1002,
                    sku: 'IN-409',
                    name: 'Terminal Intermodal Cénit',
                    description: 'Nodo de transporte urbano con una cubierta en voladizo de titanio de 150 metros.',
                    price: '450M',
                    images: [{ src: 'https://images.unsplash.com/photo-1506505703445-42353381e4b9?q=80&w=2574&auto=format&fit=crop' }],
                    categories: [{ name: 'Infraestructura' }, { name: 'Transporte Público' }]
                },
                {
                    id: 1003,
                    sku: 'CL-882',
                    name: 'Pabellón Cultural Horizonte',
                    description: 'Estructura monolítica de hormigón blanco que emerge del paisaje natural.',
                    price: '320M',
                    images: [{ src: 'https://images.unsplash.com/photo-1481253127861-534498168948?q=80&w=2573&auto=format&fit=crop' }],
                    categories: [{ name: 'Cultura' }, { name: 'Diseño Paramétrico' }]
                },
                {
                    id: 1004,
                    sku: 'IN-701',
                    name: 'Enlace Metropolitano Sur',
                    description: 'Puente atirantado de 2.5km que conecta el distrito financiero con la zona portuaria.',
                    price: '890M',
                    images: [{ src: 'https://images.unsplash.com/photo-1510416955047-927161e38bce?q=80&w=2573&auto=format&fit=crop' }],
                    categories: [{ name: 'Ingeniería Civil' }, { name: 'Conectividad' }]
                }
            ]);
        }, 800);
    });
}
