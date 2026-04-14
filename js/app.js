// WooCommerce API Configuration
const WC_CONFIG = {
    url: 'http://8.229.91.134', // Revertido a IP para pruebas
    // Como implementaremos el snippet PHP de permisos públicos, ya no necesitamos exponer llaves:
    usarMockLocal: false // Cambia a `false` una vez que instales el snippet PHP en WordPress
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Eliminar acentos en títulos en mayúscula ---
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function processUppercaseTitles() {
        // Selecciona todos los títulos h1-h6 y .headline-text
        const selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.headline-text'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.textContent = removeAccents(el.textContent);
            });
        });
    }

    processUppercaseTitles();
    // Si hay cambios dinámicos, puedes volver a llamar a processUppercaseTitles() tras actualizar títulos

        // --- BLOG SYNC: Renderizar posts, búsqueda, filtro y paginación ---
        if (document.getElementById('blog-posts-container')) {
            const postsContainer = document.getElementById('blog-posts-container');
            const paginationContainer = document.getElementById('blog-pagination');
            const searchInput = document.getElementById('blog-search');
            const categoryFilter = document.getElementById('blog-category-filter');
            let allPosts = [];
            let allCategories = [];
            let currentPage = 1;
            let postsPerPage = 6;
            let currentSearch = '';
            let currentCategory = '';

            async function fetchPosts(page = 1, search = '', category = '') {
                let url = `http://8.229.91.134/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}`;
                if (search) url += `&search=${encodeURIComponent(search)}`;
                if (category) url += `&categories=${category}`;
                const res = await fetch(url);
                const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0', 10);
                const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
                const posts = await res.json();
                return { posts, totalPosts, totalPages };
            }

            async function fetchCategories() {
                const res = await fetch('http://8.229.91.134/wp-json/wp/v2/categories?per_page=100');
                return await res.json();
            }

            function renderPosts(posts) {
                postsContainer.innerHTML = '';
                if (!posts.length) {
                    postsContainer.innerHTML = '<p class="body-md text-variant">No se encontraron posts.</p>';
                    return;
                }
                posts.forEach(post => {
                    const img = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]
                        ? post._embedded['wp:featuredmedia'][0].source_url
                        : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop';
                    const excerpt = post.excerpt && post.excerpt.rendered
                        ? post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 140) + '...'
                        : '';
                    const article = document.createElement('article');
                    article.className = 'project-card fade-up';
                    article.innerHTML = `
                        <a href="#" class="card-image-wrapper" style="display:block;">
                            <div class="card-image" style="background-image: url('${img}');"></div>
                        </a>
                        <div class="card-content">
                            <span class="technical-label">${post.date.split('T')[0]}</span>
                            <a href="#" style="text-decoration:none; color:inherit;"><h3 class="headline-text">${post.title.rendered}</h3></a>
                            <p class="body-md text-variant" style="margin-bottom:var(--spacing-2);">${excerpt}</p>
                            <div class="action-chips" style="margin-top:var(--spacing-3);">
                                ${(post._embedded['wp:term'] && post._embedded['wp:term'][0]) ? post._embedded['wp:term'][0].map(cat => `<span class="chip">${cat.name}</span>`).join('') : ''}
                            </div>
                            <div class="blog-comments" style="margin-top:2rem;">
                                <h4 style="margin-bottom:1rem;">Comentarios</h4>
                                <div class="comments-list" id="comments-list-${post.id}"></div>
                                <div class="comment-form-area" id="comment-form-area-${post.id}"></div>
                            </div>
                        </div>
                    `;
                    postsContainer.appendChild(article);

                    // Render comments area
                    const user = window.AuthManager && window.AuthManager.getUser ? window.AuthManager.getUser() : null;
                    const commentsList = article.querySelector(`#comments-list-${post.id}`);
                    const commentFormArea = article.querySelector(`#comment-form-area-${post.id}`);
                    // Mock comments in localStorage
                    const commentsKey = `blog_comments_${post.id}`;
                    function renderComments() {
                        const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
                        if (!comments.length) {
                            commentsList.innerHTML = '<p class="body-md text-variant">No hay comentarios aún.</p>';
                        } else {
                            commentsList.innerHTML = comments.map(c => `<div class="comment-item" style="margin-bottom:1rem;"><b>${c.user}</b><br><span style="font-size:0.95em; color:#666;">${c.date}</span><div style="margin-top:0.5em;">${c.text}</div></div>`).join('');
                        }
                    }
                    renderComments();
                    if (!user) {
                        commentFormArea.innerHTML = `<div class="comment-login-msg" style="margin-top:1rem; color:#b00;">Debes <a href="login.html">iniciar sesión</a> para comentar.</div>`;
                    } else {
                        commentFormArea.innerHTML = `
                            <form class="comment-form" style="margin-top:1rem;">
                                <textarea required placeholder="Escribe tu comentario..." style="width:100%; min-height:60px; margin-bottom:0.5rem;"></textarea>
                                <button type="submit" class="btn btn-secondary">Comentar</button>
                            </form>
                        `;
                        const form = commentFormArea.querySelector('form');
                        form.addEventListener('submit', function(e) {
                            e.preventDefault();
                            const textarea = form.querySelector('textarea');
                            const text = textarea.value.trim();
                            if (!text) return;
                            const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
                            comments.push({
                                user: user.firstName || user.email,
                                text,
                                date: new Date().toLocaleString()
                            });
                            localStorage.setItem(commentsKey, JSON.stringify(comments));
                            textarea.value = '';
                            renderComments();
                        });
                    }
                });
            }

            function renderPagination(totalPages) {
                paginationContainer.innerHTML = '';
                if (totalPages <= 1) return;
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement('button');
                    btn.textContent = i;
                    btn.className = 'chip' + (i === currentPage ? ' active-filter' : '');
                    btn.style.cursor = 'pointer';
                    btn.onclick = () => {
                        currentPage = i;
                        loadPosts();
                    };
                    paginationContainer.appendChild(btn);
                }
            }

            async function loadPosts() {
                const { posts, totalPosts, totalPages } = await fetchPosts(currentPage, currentSearch, currentCategory);
                renderPosts(posts);
                renderPagination(totalPages);
            }

            async function loadCategories() {
                allCategories = await fetchCategories();
                categoryFilter.innerHTML = '<option value="">Todas las categorías</option>' +
                    allCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
            }

            // Event listeners
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                currentPage = 1;
                loadPosts();
            });
            categoryFilter.addEventListener('change', (e) => {
                currentCategory = e.target.value;
                currentPage = 1;
                loadPosts();
            });

            // Inicializar
            loadCategories();
            loadPosts();
        }
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

    // 5. Footer Quick Contact Form sync with CF7
    const quickForm = document.querySelector('.quick-contact-form');
    if (quickForm) {
        quickForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = quickForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }
            // Recolectar datos
            const formData = new FormData(quickForm);
            // Obtener _wpcf7_unit_tag dinámicamente desde el HTML del formulario en WP
            try {
                const formPage = await fetch('http://8.229.91.134/contact-us/');
                const html = await formPage.text();
                // Buscar el valor de _wpcf7_unit_tag en el HTML
                const match = html.match(/<input[^>]*name=["']?_wpcf7_unit_tag["']?[^>]*value=["']?([^"'> ]+)["']?[^>]*>/);
                if (match && match[1]) {
                    formData.append('_wpcf7_unit_tag', match[1]);
                } else {
                    throw new Error('No se pudo obtener _wpcf7_unit_tag');
                }
                // Endpoint CF7
                const endpoint = 'http://8.229.91.134/wp-json/contact-form-7/v1/contact-forms/12/feedback';
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.status === 'mail_sent') {
                    submitBtn.textContent = '¡Mensaje enviado!';
                    submitBtn.style.backgroundColor = '#96c121';
                    quickForm.reset();
                } else {
                    submitBtn.textContent = 'Error al enviar';
                    submitBtn.style.backgroundColor = '#e74c3c';
                    console.error('CF7 error response:', data);
                }
            } catch (err) {
                submitBtn.textContent = 'Error de conexión';
                submitBtn.style.backgroundColor = '#e74c3c';
                console.error('CF7 fetch error:', err);
            }
            setTimeout(() => {
                submitBtn.textContent = 'Enviar';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
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
