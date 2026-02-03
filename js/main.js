// js/main.js

// Datos de productos
const productsData = [
    {
        id: 1,
        name: "COMBO DESAYUNO FAMILIAR",
        description: "Harina Pan + Queso de mano. Perfecto para un desayuno nutritivo y delicioso para toda la familia.",
        originalPrice: 12.59,
        currentPrice: 9.99,
        discount: 20,
        icon: "fas fa-bread-slice",
        category: "desayuno"
    },
    {
        id: 2,
        name: "COMBO DESAYUNO CAFÉ",
        description: "Queso + Café molido. Ideal para comenzar el día con energía y sabor.",
        originalPrice: 12.50,
        currentPrice: 9.99,
        discount: 20,
        icon: "fas fa-coffee",
        category: "desayuno"
    },
    {
        id: 3,
        name: "COMBO DESAYUNO DULCE",
        description: "Harina de maíz + Teclita. Una opción dulce y tradicional para compartir en familia.",
        originalPrice: 11.99,
        currentPrice: 9.99,
        discount: 17,
        icon: "fas fa-cookie-bite",
        category: "desayuno"
    },
    {
        id: 4,
        name: "COMBO MERIENDA",
        description: "Galletas + Jugo natural. Perfecto para la merienda de los niños y adultos.",
        originalPrice: 10.50,
        currentPrice: 8.99,
        discount: 14,
        icon: "fas fa-cookie",
        category: "merienda"
    },
    {
        id: 5,
        name: "COMBO CENA RÁPIDA",
        description: "Pasta + Salsa de tomate. Solución rápida y deliciosa para la cena familiar.",
        originalPrice: 14.99,
        currentPrice: 11.99,
        discount: 20,
        icon: "fas fa-utensils",
        category: "cena"
    },
    {
        id: 6,
        name: "COMBO BÁSICOS",
        description: "Arroz + Frijoles + Aceite. Los productos esenciales para tu despensa.",
        originalPrice: 15.99,
        currentPrice: 12.99,
        discount: 19,
        icon: "fas fa-shopping-basket",
        category: "basicos"
    }
];

// Configuración de la aplicación
const CONFIG = {
    whatsappNumber: "1234567890",
    businessName: "SUN MARKET",
    currency: "$",
    deliveryTime: "30-60 minutos",
    businessHours: "Lunes a Sábado: 7am - 8pm",
    instagramUrl: "https://instagram.com/sunmarket",
    facebookUrl: "https://facebook.com/sunmarket"
};

// Inicialización principal
function initMain() {
    loadProducts();
    setupEventListeners();
    setupSmoothScrolling();
    updateActiveLink();
}

// Cargar productos en la página
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    const discountPercentage = Math.round((product.originalPrice - product.currentPrice) / product.originalPrice * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="price-container">
                <span class="original-price">${CONFIG.currency}${product.originalPrice.toFixed(2)}</span>
                <span class="current-price">${CONFIG.currency}${product.currentPrice.toFixed(2)}</span>
                <span class="discount-badge">${discountPercentage}% OFF</span>
            </div>
            <button class="product-btn order-btn" 
                    data-product="${product.name}" 
                    data-price="${product.currentPrice}"
                    data-product-id="${product.id}">
                <i class="fab fa-whatsapp"></i> Pedir por WhatsApp
            </button>
        </div>
    `;
    
    return card;
}

// Configurar event listeners
function setupEventListeners() {
    // WhatsApp directo
    const whatsappBtn = document.getElementById('whatsapp-direct');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const message = `Hola ${CONFIG.businessName}, me gustaría hacer un pedido. ¿Podrían ayudarme?`;
            openWhatsApp(message);
        });
    }
    
    // Contacto desde footer
    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            const message = `Hola ${CONFIG.businessName}, tengo una consulta sobre sus productos y servicios.`;
            openWhatsApp(message);
        });
    }
    
    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email);
        });
    }
    
    // Botones de pedido (se configuran en orders.js)
}

// Configurar scroll suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Actualizar enlace activo
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.footer-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Abrir WhatsApp con mensaje predefinido
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Suscribirse al newsletter
function subscribeToNewsletter(email) {
    if (!isValidEmail(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // En una aplicación real, aquí enviarías los datos a un servidor
    showNotification('¡Gracias por suscribirte a nuestro newsletter!', 'success');
    
    // Limpiar formulario
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.reset();
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Colores según el tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Añadir al documento
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Añadir estilos de animación si no existen
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Filtrar productos por categoría (función extensible)
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? productsData 
        : productsData.filter(product => product.category === category);
    
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    // Re-configurar event listeners para los nuevos botones
    setTimeout(() => {
        if (typeof setupOrderButtons === 'function') {
            setupOrderButtons();
        }
    }, 100);
}

// Exportar funciones necesarias
window.initMain = initMain;
window.filterProducts = filterProducts;
window.showNotification = showNotification;

// ---------------------------------------------- // 
// js/main.js - Actualizaciones

// Añadir estas funciones al archivo main.js existente

// Configurar navegación móvil
function setupMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
}

// Configurar contacto para ventas al mayor
function setupBulkContact() {
    const contactBulkBtn = document.getElementById('contact-bulk');
    
    if (contactBulkBtn) {
        contactBulkBtn.addEventListener('click', () => {
            const message = `Hola ${CONFIG.businessName}, me interesan los precios al mayor. ¿Podrían enviarme información y condiciones?`;
            openWhatsApp(message);
        });
    }
}

// Configurar WhatsApp rápido
function setupQuickWhatsApp() {
    const whatsappQuickBtn = document.getElementById('whatsapp-quick');
    
    if (whatsappQuickBtn) {
        whatsappQuickBtn.addEventListener('click', () => {
            const message = `Hola ${CONFIG.businessName}, tengo una consulta sobre sus productos y precios.`;
            openWhatsApp(message);
        });
    }
}

// En la función initMain, añadir:
function initMain() {
    // ... código existente ...
    
    setupMobileNavigation();
    setupBulkContact();
    setupQuickWhatsApp();
    
    // Cargar combos
    if (typeof loadCombos === 'function') {
        loadCombos();
    }
    
    // ... resto del código ...
}

// js/main.js - Navegación móvil mejorada

function setupMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCartToggle = document.getElementById('nav-cart-toggle');
    const body = document.body;
    
    // Toggle del menú móvil
    if (navToggle && navContainer) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Cerrar menú al hacer clic en overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Solo cerrar en móvil
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                    
                    // Actualizar enlace activo
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        // Cerrar menú al hacer clic en el botón del carrito
        if (navCartToggle) {
            navCartToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            });
        }
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('show')) {
                closeMobileMenu();
            }
        });
        
        // Prevenir que el menú se cierre al hacer clic dentro
        navContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Actualizar enlace activo al hacer scroll
    updateActiveNavLink();
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navContainer && navContainer.classList.contains('show')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const navToggle = document.getElementById('nav-toggle');
    const body = document.body;
    
    if (navContainer) {
        navContainer.classList.toggle('show');
        
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        
        if (navToggle) {
            navToggle.innerHTML = navContainer.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        body.style.overflow = navContainer.classList.contains('show') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const navToggle = document.getElementById('nav-toggle');
    const body = document.body;
    
    if (navContainer) {
        navContainer.classList.remove('show');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        if (navToggle) {
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        body.style.overflow = '';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    }
                    
                    // Si es la sección hero y estamos en la parte superior
                    if (activeId === 'hero' && window.scrollY < 100) {
                        const homeLink = document.querySelector('.nav-link[href="#hero"]');
                        if (homeLink) homeLink.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// En la función initMain, asegúrate de llamar a setupMobileNavigation
function initMain() {
    // ... código existente ...
    
    setupMobileNavigation();
    
    // ... resto del código ...
}