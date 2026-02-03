// js/products.js

// Base de datos de productos (en producción, esto vendría de una API)
const PRODUCTS_DATABASE = {
    individual: [
        {
            id: "IND-001",
            name: "Harina Pan",
            category: "despensa",
            description: "Harina de maíz precocida, ideal para arepas. Paquete de 1kg.",
            image: "harina-pan.jpg",
            icon: "fas fa-bread-slice",
            retailPrice: 2.99,
            bulkPrice: 2.49,
            bulkMin: 6,
            unit: "paquete",
            stock: 50,
            isBulkAvailable: true,
            tags: ["básico", "popular", "sin gluten"]
        },
        {
            id: "IND-002",
            name: "Queso de Mano",
            category: "lacteos",
            description: "Queso fresco artesanal. Pieza de 500g.",
            image: "queso-mano.jpg",
            icon: "fas fa-cheese",
            retailPrice: 5.99,
            bulkPrice: 4.99,
            bulkMin: 5,
            unit: "pieza",
            stock: 30,
            isBulkAvailable: true,
            tags: ["fresco", "artesanal"]
        },
        {
            id: "IND-003",
            name: "Café Molido",
            category: "despensa",
            description: "Café 100% arábica, molido para prensa francesa. Bolsa de 500g.",
            image: "cafe-molido.jpg",
            icon: "fas fa-coffee",
            retailPrice: 8.99,
            bulkPrice: 7.49,
            bulkMin: 4,
            unit: "bolsa",
            stock: 25,
            isBulkAvailable: true,
            tags: ["importado", "premium"]
        },
        {
            id: "IND-004",
            name: "Leche Entera",
            category: "lacteos",
            description: "Leche pasteurizada, caja de 1 litro.",
            image: "leche-entera.jpg",
            icon: "fas fa-wine-bottle",
            retailPrice: 1.99,
            bulkPrice: 1.69,
            bulkMin: 12,
            unit: "litro",
            stock: 100,
            isBulkAvailable: true,
            tags: ["básico", "esencial"]
        },
        {
            id: "IND-005",
            name: "Pechuga de Pollo",
            category: "carnes",
            description: "Pechuga de pollo sin hueso, bandeja de 1kg.",
            image: "pollo-pechuga.jpg",
            icon: "fas fa-drumstick-bite",
            retailPrice: 6.99,
            bulkPrice: 5.99,
            bulkMin: 3,
            unit: "kg",
            stock: 40,
            isBulkAvailable: true,
            tags: ["proteína", "fresco"]
        },
        {
            id: "IND-006",
            name: "Arroz Blanco",
            category: "despensa",
            description: "Arroz grano largo, bolsa de 2kg.",
            image: "arroz-blanco.jpg",
            icon: "fas fa-seedling",
            retailPrice: 3.49,
            bulkPrice: 2.99,
            bulkMin: 10,
            unit: "bolsa",
            stock: 80,
            isBulkAvailable: true,
            tags: ["básico", "esencial"]
        },
        {
            id: "IND-007",
            name: "Aceite Vegetal",
            category: "despensa",
            description: "Aceite de girasol, botella de 1 litro.",
            image: "aceite-vegetal.jpg",
            icon: "fas fa-oil-can",
            retailPrice: 4.49,
            bulkPrice: 3.99,
            bulkMin: 6,
            unit: "litro",
            stock: 60,
            isBulkAvailable: true,
            tags: ["cocina", "esencial"]
        },
        {
            id: "IND-008",
            name: "Jabón Líquido",
            category: "limpieza",
            description: "Jabón líquido para manos, botella de 500ml.",
            image: "jabon-liquido.jpg",
            icon: "fas fa-hand-sparkles",
            retailPrice: 2.99,
            bulkPrice: 2.49,
            bulkMin: 8,
            unit: "botella",
            stock: 45,
            isBulkAvailable: true,
            tags: ["higiene", "hogar"]
        }
    ],
    
    combos: [
        {
            id: "COM-001",
            name: "COMBO DESAYUNO FAMILIAR",
            description: "Todo lo necesario para un desayuno completo para 4 personas.",
            discount: 25,
            originalPrice: 18.50,
            currentPrice: 13.99,
            items: [
                { name: "Harina Pan", quantity: "1kg" },
                { name: "Queso de Mano", quantity: "500g" },
                { name: "Café Molido", quantity: "250g" },
                { name: "Leche Entera", quantity: "1L" }
            ],
            icon: "fas fa-bread-slice",
            category: "desayuno",
            maxPerOrder: 3
        },
        {
            id: "COM-002",
            name: "COMBO BÁSICOS DESPENSA",
            description: "Los productos esenciales para tu despensa mensual.",
            discount: 20,
            originalPrice: 25.00,
            currentPrice: 19.99,
            items: [
                { name: "Arroz Blanco", quantity: "2kg" },
                { name: "Aceite Vegetal", quantity: "1L" },
                { name: "Frijoles Negros", quantity: "1kg" },
                { name: "Azúcar Blanca", quantity: "1kg" },
                { name: "Sal", quantity: "500g" }
            ],
            icon: "fas fa-shopping-basket",
            category: "despensa",
            maxPerOrder: 5
        },
        {
            id: "COM-003",
            name: "COMBO LIMPIEZA DEL HOGAR",
            description: "Productos esenciales para la limpieza de tu hogar.",
            discount: 15,
            originalPrice: 22.50,
            currentPrice: 19.99,
            items: [
                { name: "Jabón Líquido", quantity: "500ml" },
                { name: "Detergente", quantity: "1L" },
                { name: "Cloro", quantity: "1L" },
                { name: "Papel Higiénico", quantity: "4 rollos" },
                { name: "Bolsas de Basura", quantity: "10 unidades" }
            ],
            icon: "fas fa-broom",
            category: "limpieza",
            maxPerOrder: 2
        }
    ],
    
    bulkPricing: [
        {
            productId: "IND-001",
            productName: "Harina Pan",
            unitPrice: 2.99,
            tier1: { min: 6, max: 10, price: 2.49, discount: 17 },
            tier2: { min: 11, max: 25, price: 2.29, discount: 23 },
            tier3: { min: 26, price: 2.09, discount: 30 }
        },
        {
            productId: "IND-002",
            productName: "Queso de Mano",
            unitPrice: 5.99,
            tier1: { min: 5, max: 10, price: 4.99, discount: 17 },
            tier2: { min: 11, max: 20, price: 4.49, discount: 25 },
            tier3: { min: 21, price: 3.99, discount: 33 }
        },
        {
            productId: "IND-003",
            productName: "Café Molido",
            unitPrice: 8.99,
            tier1: { min: 4, max: 8, price: 7.49, discount: 17 },
            tier2: { min: 9, max: 15, price: 6.99, discount: 22 },
            tier3: { min: 16, price: 6.49, discount: 28 }
        },
        {
            productId: "IND-004",
            productName: "Leche Entera",
            unitPrice: 1.99,
            tier1: { min: 12, max: 24, price: 1.69, discount: 15 },
            tier2: { min: 25, max: 50, price: 1.49, discount: 25 },
            tier3: { min: 51, price: 1.29, discount: 35 }
        }
    ]
};

// Estado de la aplicación
let appState = {
    cart: [],
    filteredProducts: [],
    currentView: 'grid',
    currentCategory: 'all',
    currentPriceRange: 'all',
    currentProductType: 'all',
    productsPerPage: 8,
    currentPage: 1
};

// Inicialización del módulo de productos
function initProducts() {
    loadProducts();
    setupFilters();
    setupViewMode();
    setupCart();
    setupProductModals();
    loadBulkPricing();
}

// Cargar productos individuales
function loadProducts() {
    const container = document.getElementById('individual-products-container');
    if (!container) return;
    
    // Filtrar productos según estado actual
    const filtered = filterProducts();
    appState.filteredProducts = filtered;
    
    // Calcular productos para la página actual
    const startIndex = (appState.currentPage - 1) * appState.productsPerPage;
    const endIndex = startIndex + appState.productsPerPage;
    const productsToShow = filtered.slice(startIndex, endIndex);
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Mostrar productos
    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o categorías.</p>
                <button class="btn btn-primary" id="reset-filters-view">Mostrar todos los productos</button>
            </div>
        `;
        
        document.getElementById('reset-filters-view')?.addEventListener('click', resetFilters);
        return;
    }
    
    // Crear tarjetas de producto
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    // Configurar botones de carrito
    setupAddToCartButtons();
    
    // Mostrar/ocultar botón de cargar más
    updateLoadMoreButton();
}

// Filtrar productos
function filterProducts() {
    let filtered = [...PRODUCTS_DATABASE.individual];
    
    // Filtrar por categoría
    if (appState.currentCategory !== 'all') {
        filtered = filtered.filter(product => 
            product.category === appState.currentCategory
        );
    }
    
    // Filtrar por rango de precio
    if (appState.currentPriceRange !== 'all') {
        const [min, max] = appState.currentPriceRange.split('-').map(Number);
        
        if (appState.currentPriceRange === '20+') {
            filtered = filtered.filter(product => product.retailPrice >= 20);
        } else {
            filtered = filtered.filter(product => 
                product.retailPrice >= min && product.retailPrice <= max
            );
        }
    }
    
    // Filtrar por tipo (si aplicara)
    if (appState.currentProductType === 'bulk') {
        filtered = filtered.filter(product => product.isBulkAvailable);
    }
    
    return filtered;
}

// Crear tarjeta de producto individual
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    const savings = ((product.retailPrice - product.bulkPrice) / product.retailPrice * 100).toFixed(0);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
            ${product.stock < 10 ? '<span class="product-badge">Últimas unidades</span>' : ''}
        </div>
        <div class="product-content">
            <div class="product-header">
                <div class="product-category">${formatCategory(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
            
            <div class="product-pricing">
                <div class="price-row">
                    <span class="price-label">Precio al detal:</span>
                    <span class="price-value retail-price">${formatCurrency(product.retailPrice)}/${product.unit}</span>
                </div>
                
                ${product.isBulkAvailable ? `
                <div class="price-row">
                    <span class="price-label">Precio al mayor (${product.bulkMin}+):</span>
                    <span class="price-value bulk-price">${formatCurrency(product.bulkPrice)}/${product.unit}</span>
                </div>
                <div class="bulk-minimum">
                    <i class="fas fa-tag"></i> Ahorra ${savings}% comprando al mayor
                </div>
                ` : ''}
            </div>
            
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" data-product-id="${product.id}">
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <button class="btn btn-primary btn-add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Agregar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Formatear categoría
function formatCategory(category) {
    const categories = {
        'despensa': 'Despensa',
        'lacteos': 'Lácteos',
        'carnes': 'Carnes',
        'frescos': 'Productos Frescos',
        'bebidas': 'Bebidas',
        'limpieza': 'Limpieza'
    };
    
    return categories[category] || category;
}

// Configurar filtros
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const typeFilter = document.getElementById('type-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            appState.currentCategory = e.target.value;
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            appState.currentPriceRange = e.target.value;
        });
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            appState.currentProductType = e.target.value;
        });
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            appState.currentPage = 1;
            loadProducts();
            scrollToProducts();
        });
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
}

// Reiniciar filtros
function resetFilters() {
    appState.currentCategory = 'all';
    appState.currentPriceRange = 'all';
    appState.currentProductType = 'all';
    appState.currentPage = 1;
    
    // Actualizar selects
    document.getElementById('category-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    
    loadProducts();
    scrollToProducts();
}

// Scroll a productos
function scrollToProducts() {
    const productsSection = document.getElementById('products-individual');
    if (productsSection) {
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const sectionPosition = productsSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// Configurar modo de vista
function setupViewMode() {
    const viewModeButtons = document.querySelectorAll('.btn-view-mode');
    const productsContainer = document.getElementById('individual-products-container');
    
    viewModeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            viewModeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            // Cambiar vista
            const view = button.dataset.view;
            appState.currentView = view;
            
            if (productsContainer) {
                productsContainer.dataset.view = view;
                loadProducts();
            }
        });
    });
}

// Configurar botones de agregar al carrito
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.productId;
            const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
            const quantity = parseInt(quantityInput.value) || 1;
            
            addToCart(productId, quantity);
        });
    });
    
    // Configurar selectores de cantidad
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = button.dataset.action;
            const input = button.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value) || 1;
            const max = parseInt(input.max) || 99;
            
            if (action === 'increase' && value < max) {
                value++;
            } else if (action === 'decrease' && value > 1) {
                value--;
            }
            
            input.value = value;
        });
    });
}

// Cargar combos promocionales
function loadCombos() {
    const container = document.getElementById('combos-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    PRODUCTS_DATABASE.combos.forEach(combo => {
        const comboCard = createComboCard(combo);
        container.appendChild(comboCard);
    });
}

// Crear tarjeta de combo
function createComboCard(combo) {
    const card = document.createElement('div');
    card.className = 'combo-card';
    card.dataset.comboId = combo.id;
    
    const savings = combo.originalPrice - combo.currentPrice;
    
    card.innerHTML = `
        <div class="combo-header">
            <h3 class="combo-title">${combo.name}</h3>
            <span class="combo-discount">${combo.discount}% OFF</span>
        </div>
        
        <div class="combo-content">
            <div class="combo-items">
                ${combo.items.map(item => `
                    <div class="combo-item">
                        <div class="combo-item-quantity">${item.quantity}</div>
                        <div class="combo-item-name">${item.name}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="combo-pricing">
                <div class="original-price-combo">Antes: ${formatCurrency(combo.originalPrice)}</div>
                <div class="current-price-combo">Ahora: ${formatCurrency(combo.currentPrice)}</div>
                <div class="savings-amount">
                    <i class="fas fa-piggy-bank"></i> Ahorras ${formatCurrency(savings)}
                </div>
            </div>
            
            <div class="combo-actions">
                <button class="btn btn-combo btn-combo-details" data-combo-id="${combo.id}">
                    <i class="fas fa-info-circle"></i> Ver detalles
                </button>
                <button class="btn btn-primary btn-combo" data-combo-id="${combo.id}">
                    <i class="fas fa-cart-plus"></i> Agregar al carrito
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Cargar precios al mayor
function loadBulkPricing() {
    const tableBody = document.querySelector('#bulk-pricing-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    PRODUCTS_DATABASE.bulkPricing.forEach(item => {
        const product = PRODUCTS_DATABASE.individual.find(p => p.id === item.productId);
        const row = createBulkPricingRow(item, product);
        tableBody.appendChild(row);
    });
}

// Crear fila de tabla de precios al mayor
function createBulkPricingRow(item, product) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <div class="product-name-cell">
                <div class="product-name-icon">
                    <i class="${product?.icon || 'fas fa-box'}"></i>
                </div>
                <div>
                    <strong>${item.productName}</strong><br>
                    <small>${product?.unit || 'unidad'}</small>
                </div>
            </div>
        </td>
        <td class="price-cell">${formatCurrency(item.unitPrice)}</td>
        <td>
            <div class="price-cell">${formatCurrency(item.tier1.price)}</div>
            <div class="discount-cell">${item.tier1.discount}% OFF</div>
        </td>
        <td>
            <div class="price-cell">${formatCurrency(item.tier2.price)}</div>
            <div class="discount-cell">${item.tier2.discount}% OFF</div>
        </td>
        <td>
            <div class="price-cell">${formatCurrency(item.tier3.price)}</div>
            <div class="discount-cell">${item.tier3.discount}% OFF</div>
        </td>
        <td>
            <button class="btn btn-sm btn-primary" data-bulk-product="${item.productId}">
                <i class="fas fa-cart-plus"></i> Pedir
            </button>
        </td>
    `;
    
    return row;
}

// Actualizar botón de cargar más
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-individual');
    if (!loadMoreBtn) return;
    
    const totalFiltered = appState.filteredProducts.length;
    const currentlyShowing = Math.min(
        appState.currentPage * appState.productsPerPage,
        totalFiltered
    );
    
    if (currentlyShowing >= totalFiltered) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `
            <i class="fas fa-plus"></i> 
            Cargar más productos (${currentlyShowing} de ${totalFiltered})
        `;
        
        // Configurar evento
        loadMoreBtn.onclick = () => {
            appState.currentPage++;
            loadMoreProducts();
        };
    }
}

// Cargar más productos
function loadMoreProducts() {
    const container = document.getElementById('individual-products-container');
    if (!container) return;
    
    // Calcular productos para la página actual
    const startIndex = (appState.currentPage - 1) * appState.productsPerPage;
    const endIndex = startIndex + appState.productsPerPage;
    const productsToShow = appState.filteredProducts.slice(startIndex, endIndex);
    
    // Crear y añadir nuevas tarjetas
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    // Reconfigurar botones
    setupAddToCartButtons();
    
    // Actualizar botón de cargar más
    updateLoadMoreButton();
    
    // Scroll suave al último producto cargado
    setTimeout(() => {
        const lastCard = container.lastElementChild;
        if (lastCard) {
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 100);
}

// Configurar carrito
function setupCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', (e) => {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.getElementById('cart-toggle');
        
        if (cartSidebar && 
            cartSidebar.classList.contains('open') &&
            !cartSidebar.contains(e.target) &&
            !cartToggle.contains(e.target)) {
            closeCart();
        }
    });
}

// Alternar carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        
        if (cartOverlay) {
            cartOverlay.classList.toggle('active');
        }
        
        // Actualizar contenido del carrito
        updateCartDisplay();
    }
}

// Cerrar carrito
function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        
        if (cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    }
}

// Agregar producto al carrito
function addToCart(productId, quantity = 1, type = 'individual') {
    let product;
    
    if (type === 'individual') {
        product = PRODUCTS_DATABASE.individual.find(p => p.id === productId);
    } else if (type === 'combo') {
        product = PRODUCTS_DATABASE.combos.find(p => p.id === productId);
    }
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    const existingItem = appState.cart.find(item => 
        item.productId === productId && item.type === type
    );
    
    if (existingItem) {
        // Actualizar cantidad
        existingItem.quantity += quantity;
        
        // Verificar stock máximo
        if (product.maxPerOrder && existingItem.quantity > product.maxPerOrder) {
            existingItem.quantity = product.maxPerOrder;
            showNotification(`Máximo ${product.maxPerOrder} por pedido`, 'warning');
        }
    } else {
        // Agregar nuevo item al carrito
        const price = type === 'individual' ? product.retailPrice : product.currentPrice;
        
        appState.cart.push({
            productId,
            type,
            name: product.name,
            price,
            quantity,
            unit: product.unit || 'combo',
            icon: product.icon
        });
    }
    
    // Guardar carrito
    saveCartToStorage();
    
    // Actualizar interfaz
    updateCartCount();
    updateCartDisplay();
    
    // Mostrar notificación
    showNotification(`${product.name} agregado al carrito`, 'success');
    
    // Abrir carrito si está cerrado
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('open')) {
        toggleCart();
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems || !cartEmpty) return;
    
    if (appState.cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        
        if (cartSubtotal) cartSubtotal.textContent = formatCurrency(0);
        if (cartShipping) cartShipping.textContent = formatCurrency(0);
        if (cartTotal) cartTotal.textContent = formatCurrency(0);
        if (checkoutBtn) checkoutBtn.disabled = true;
        
        return;
    }
    
    cartEmpty.style.display = 'none';
    
    // Calcular totales
    const subtotal = appState.cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
    
    const shipping = subtotal >= 25 ? 0 : 3.99;
    const total = subtotal + shipping;
    
    // Actualizar totales
    if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
    if (cartShipping) cartShipping.textContent = formatCurrency(shipping);
    if (cartTotal) cartTotal.textContent = formatCurrency(total);
    if (checkoutBtn) checkoutBtn.disabled = false;
    
    // Mostrar items
    cartItems.innerHTML = appState.cart.map((item, index) => `
        <div class="cart-item" data-item-index="${index}">
            <div class="cart-item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatCurrency(item.price)}/${item.unit}</div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">+</button>
                </div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
    
    // Configurar eventos de los items
    setupCartItemEvents();
}

// Configurar eventos de items del carrito
function setupCartItemEvents() {
    // Botones de incrementar/disminuir cantidad
    document.querySelectorAll('.increase-qty, .decrease-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.dataset.index);
            const item = appState.cart[index];
            
            if (!item) return;
            
            if (button.classList.contains('increase-qty')) {
                item.quantity++;
            } else if (button.classList.contains('decrease-qty') && item.quantity > 1) {
                item.quantity--;
            }
            
            saveCartToStorage();
            updateCartCount();
            updateCartDisplay();
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.dataset.index);
            
            if (confirm('¿Eliminar este producto del carrito?')) {
                appState.cart.splice(index, 1);
                saveCartToStorage();
                updateCartCount();
                updateCartDisplay();
                
                showNotification('Producto eliminado del carrito', 'info');
            }
        });
    });
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('sunmarket_cart', JSON.stringify(appState.cart));
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('sunmarket_cart');
        if (savedCart) {
            appState.cart = JSON.parse(savedCart);
            updateCartCount();
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        appState.cart = [];
    }
}

// Finalizar compra
function checkout() {
    if (appState.cart.length === 0) {
        showNotification('El carrito está vacío', 'warning');
        return;
    }
    
    // Crear mensaje de WhatsApp
    const message = createOrderMessage();
    
    // Abrir WhatsApp
    openWhatsApp(message);
    
    // Limpiar carrito
    appState.cart = [];
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
    closeCart();
    
    // Mostrar confirmación
    showNotification('¡Pedido enviado por WhatsApp!', 'success');
}

// Crear mensaje de pedido
function createOrderMessage() {
    const businessName = CONFIG.businessName || 'SUN MARKET';
    const customerName = localStorage.getItem('sunmarket_customer_name') || 'Cliente';
    const customerPhone = localStorage.getItem('sunmarket_customer_phone') || '';
    const customerAddress = localStorage.getItem('sunmarket_customer_address') || '';
    
    let message = `*NUEVO PEDIDO - ${businessName}*%0A%0A`;
    message += `*Datos del cliente:*%0A`;
    message += `👤 Nombre: ${customerName}%0A`;
    
    if (customerPhone) {
        message += `📞 Teléfono: ${customerPhone}%0A`;
    }
    
    if (customerAddress) {
        message += `🏠 Dirección: ${customerAddress}%0A`;
    }
    
    message += `%0A*Detalles del pedido:*%0A`;
    message += `══════════════════%0A%0A`;
    
    // Agrupar productos por tipo
    const individualItems = appState.cart.filter(item => item.type === 'individual');
    const comboItems = appState.cart.filter(item => item.type === 'combo');
    
    let totalAmount = 0;
    
    // Productos individuales
    if (individualItems.length > 0) {
        message += `*PRODUCTOS INDIVIDUALES*%0A`;
        individualItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            message += `${index + 1}. ${item.name}%0A`;
            message += `   Cantidad: ${item.quantity} ${item.unit}%0A`;
            message += `   Precio: ${formatCurrency(item.price)}/${item.unit}%0A`;
            message += `   Subtotal: ${formatCurrency(itemTotal)}%0A%0A`;
        });
    }
    
    // Combos
    if (comboItems.length > 0) {
        message += `*COMBOS PROMOCIONALES*%0A`;
        comboItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            message += `${index + 1}. ${item.name}%0A`;
            message += `   Cantidad: ${item.quantity} combo(s)%0A`;
            message += `   Precio: ${formatCurrency(item.price)}/combo%0A`;
            message += `   Subtotal: ${formatCurrency(itemTotal)}%0A%0A`;
        });
    }
    
    // Resumen
    message += `══════════════════%0A`;
    message += `*RESUMEN DEL PEDIDO*%0A`;
    message += `Subtotal: ${formatCurrency(totalAmount)}%0A`;
    
    const shipping = totalAmount >= 25 ? 0 : 3.99;
    message += `Envío: ${formatCurrency(shipping)}%0A`;
    
    const grandTotal = totalAmount + shipping;
    message += `*TOTAL: ${formatCurrency(grandTotal)}*%0A%0A`;
    
    message += `*Información adicional:*%0A`;
    message += `🕐 Entrega estimada: ${CONFIG.deliveryTime || '30-60 minutos'}%0A`;
    message += `⏰ Horario: ${CONFIG.businessHours || 'Lunes a Sábado 7am-8pm'}%0A`;
    message += `💰 Pago: Efectivo al recibir%0A%0A`;
    
    message += `¡Gracias por tu pedido! 🙏`;
    
    return message;
}

// Configurar modales de producto
function setupProductModals() {
    // Este método se implementaría para mostrar detalles completos de productos
    console.log('Modales de producto configurados');
}

// Exportar funciones
window.initProducts = initProducts;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;

// js/products.js - Actualizar referencias del carrito

// Configurar carrito - Actualizada para nuevo header
function setupCart() {
    const navCartToggle = document.getElementById('nav-cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    if (navCartToggle) {
        navCartToggle.addEventListener('click', toggleCart);
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Cerrar carrito con tecla Escape
    document.addEventListener('keydown', (e) => {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (e.key === 'Escape' && cartSidebar && cartSidebar.classList.contains('open')) {
            closeCart();
        }
    });
}

// Actualizar contador del carrito - Actualizada para nuevo badge
function updateCartCount() {
    const navCartCount = document.getElementById('nav-cart-count');
    if (navCartCount) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        navCartCount.textContent = totalItems;
        navCartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Animar cuando hay cambios
        if (totalItems > 0) {
            navCartCount.classList.add('cart-animate');
            setTimeout(() => {
                navCartCount.classList.remove('cart-animate');
            }, 300);
        }
    }
}

/* css/products.css - Añadir esto */

@keyframes cartBadgePop {
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.cart-animate {
    animation: cartBadgePop 0.3s ease;
}