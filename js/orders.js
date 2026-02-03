// js/orders.js

// Datos del pedido actual
let currentOrder = {
    product: null,
    price: null,
    productId: null,
    customerInfo: {}
};

// Inicialización del módulo de pedidos
function initOrders() {
    setupOrderButtons();
    setupModal();
    loadOrderForm();
}

// Configurar botones de pedido
function setupOrderButtons() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrderClick);
    });
}

// Manejar clic en botón de pedido
function handleOrderClick(event) {
    const button = event.currentTarget;
    
    currentOrder = {
        product: button.dataset.product,
        price: button.dataset.price,
        productId: button.dataset.productId,
        customerInfo: {}
    };
    
    showOrderModal();
    updateModalContent();
}

// Configurar modal
function setupModal() {
    const modal = document.getElementById('order-modal');
    const closeButton = document.getElementById('modal-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', hideOrderModal);
    }
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideOrderModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            hideOrderModal();
        }
    });
}

// Mostrar modal de pedido
function showOrderModal() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Ocultar modal de pedido
function hideOrderModal() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetOrderForm();
}

// Actualizar contenido del modal
function updateModalContent() {
    const modalBody = document.querySelector('.modal-body');
    
    if (!modalBody) return;
    
    const product = productsData.find(p => p.id == currentOrder.productId) || {
        name: currentOrder.product,
        currentPrice: currentOrder.price,
        icon: 'fas fa-shopping-cart'
    };
    
    modalBody.innerHTML = `
        <div class="modal-product-info">
            <div class="modal-product-image">
                <i class="${product.icon}"></i>
            </div>
            <div>
                <div class="modal-product-name">${product.name}</div>
                <div class="modal-product-price">${CONFIG.currency}${parseFloat(product.currentPrice).toFixed(2)}</div>
            </div>
        </div>
        
        <form id="order-form" class="order-form">
            <div class="form-group">
                <label for="customer-name">Nombre completo *</label>
                <input type="text" id="customer-name" required placeholder="Tu nombre">
            </div>
            
            <div class="form-group">
                <label for="customer-phone">Teléfono (WhatsApp) *</label>
                <input type="tel" id="customer-phone" required placeholder="Ej: +1 234 567 8900">
            </div>
            
            <div class="form-group">
                <label for="customer-address">Dirección de entrega *</label>
                <input type="text" id="customer-address" required placeholder="Dirección completa">
            </div>
            
            <div class="form-group">
                <label for="order-quantity">Cantidad</label>
                <select id="order-quantity">
                    <option value="1">1 unidad</option>
                    <option value="2">2 unidades</option>
                    <option value="3">3 unidades</option>
                    <option value="4">4 unidades</option>
                    <option value="5">5 unidades</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="order-notes">Notas adicionales</label>
                <textarea id="order-notes" placeholder="Especificaciones, alergias, instrucciones especiales..."></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" id="cancel-order">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fab fa-whatsapp"></i> Enviar pedido por WhatsApp
                </button>
            </div>
        </form>
    `;
    
    // Configurar el formulario
    const orderForm = document.getElementById('order-form');
    const cancelButton = document.getElementById('cancel-order');
    
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', hideOrderModal);
    }
}

// Cargar formulario de pedido
function loadOrderForm() {
    // Aquí podrías cargar datos guardados del usuario
    const savedName = localStorage.getItem('sunmarket_customer_name');
    const savedPhone = localStorage.getItem('sunmarket_customer_phone');
    const savedAddress = localStorage.getItem('sunmarket_customer_address');
    
    if (savedName) currentOrder.customerInfo.name = savedName;
    if (savedPhone) currentOrder.customerInfo.phone = savedPhone;
    if (savedAddress) currentOrder.customerInfo.address = savedAddress;
}

// Manejar envío del formulario
function handleOrderSubmit(event) {
    event.preventDefault();
    
    // Validar formulario
    if (!validateOrderForm()) {
        if (typeof showNotification === 'function') {
            showNotification('Por favor completa todos los campos requeridos', 'error');
        }
        return;
    }
    
    // Recopilar datos del formulario
    const formData = {
        name: document.getElementById('customer-name').value.trim(),
        phone: document.getElementById('customer-phone').value.trim(),
        address: document.getElementById('customer-address').value.trim(),
        quantity: document.getElementById('order-quantity').value,
        notes: document.getElementById('order-notes').value.trim()
    };
    
    // Guardar datos del cliente para futuros pedidos
    saveCustomerInfo(formData);
    
    // Crear mensaje de WhatsApp
    const whatsappMessage = createWhatsAppMessage(formData);
    
    // Enviar por WhatsApp
    sendOrderByWhatsApp(whatsappMessage, formData.phone);
    
    // Cerrar modal
    hideOrderModal();
    
    // Mostrar confirmación
    if (typeof showNotification === 'function') {
        showNotification('¡Pedido enviado con éxito! Se abrirá WhatsApp.', 'success');
    }
    
    // Notificar al chatbot
    notifyChatbotOrder(formData);
}

// Validar formulario de pedido
function validateOrderForm() {
    const requiredFields = ['customer-name', 'customer-phone', 'customer-address'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            field?.classList.add('error');
            return false;
        }
        field?.classList.remove('error');
    }
    
    // Validar formato de teléfono
    const phoneField = document.getElementById('customer-phone');
    const phoneValue = phoneField.value.trim();
    if (!isValidPhone(phoneValue)) {
        phoneField.classList.add('error');
        return false;
    }
    
    return true;
}

// Validar número de teléfono
function isValidPhone(phone) {
    // Eliminar caracteres no numéricos excepto +
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    return cleanedPhone.length >= 10;
}

// Guardar información del cliente
function saveCustomerInfo(formData) {
    localStorage.setItem('sunmarket_customer_name', formData.name);
    localStorage.setItem('sunmarket_customer_phone', formData.phone);
    localStorage.setItem('sunmarket_customer_address', formData.address);
    
    // Actualizar datos actuales
    currentOrder.customerInfo = formData;
}

// Crear mensaje de WhatsApp
function createWhatsAppMessage(formData) {
    const total = (parseFloat(currentOrder.price) * parseInt(formData.quantity)).toFixed(2);
    
    let message = `*NUEVO PEDIDO - ${CONFIG.businessName}*%0A%0A`;
    message += `*Producto:* ${currentOrder.product}%0A`;
    message += `*Precio unitario:* ${CONFIG.currency}${parseFloat(currentOrder.price).toFixed(2)}%0A`;
    message += `*Cantidad:* ${formData.quantity}%0A`;
    message += `*Total:* ${CONFIG.currency}${total}%0A%0A`;
    
    message += `*Datos del cliente:*%0A`;
    message += `👤 Nombre: ${formData.name}%0A`;
    message += `📞 Teléfono: ${formData.phone}%0A`;
    message += `🏠 Dirección: ${formData.address}%0A%0A`;
    
    if (formData.notes) {
        message += `*Notas adicionales:*%0A${formData.notes}%0A%0A`;
    }
    
    message += `*Detalles del pedido:*%0A`;
    message += `🕐 Tiempo de entrega: ${CONFIG.deliveryTime}%0A`;
    message += `⏰ Horario: ${CONFIG.businessHours}%0A%0A`;
    
    message += `¡Gracias! 🙏`;
    
    return message;
}

// Enviar pedido por WhatsApp
function sendOrderByWhatsApp(message, phone) {
    // Limpiar número de teléfono
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Si el número no tiene código de país, asumir un código por defecto
    let whatsappNumber = cleanPhone;
    if (!whatsappNumber.startsWith('+')) {
        whatsappNumber = `+1${whatsappNumber}`; // Código por defecto
    }
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Notificar al chatbot sobre el pedido
function notifyChatbotOrder(formData) {
    if (typeof addChatbotMessage === 'function') {
        const message = `✅ Pedido enviado: ${currentOrder.product} x${formData.quantity} para ${formData.name}. Se ha abierto WhatsApp para confirmar.`;
        addChatbotMessage(message, 'bot');
    }
}

// Reiniciar formulario de pedido
function resetOrderForm() {
    currentOrder = {
        product: null,
        price: null,
        productId: null,
        customerInfo: {}
    };
}

// Exportar funciones
window.initOrders = initOrders;
window.setupOrderButtons = setupOrderButtons;