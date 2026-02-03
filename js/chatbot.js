// js/chatbot.js

// Configuración del chatbot
const CHATBOT_CONFIG = {
    name: "Asistente SUN MARKET",
    greeting: "¡Hola! Soy el asistente de SUN MARKET. ¿En qué puedo ayudarte hoy?",
    responses: {
        "hola": ["¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte?", "¡Hola! Bienvenido a SUN MARKET. ¿Necesitas ayuda con algo?"],
        "productos": ["Tenemos combos de desayuno, merienda y cena. Todos con descuentos especiales. ¿Te interesa algún tipo en particular?", 
                     "Nuestros productos incluyen: combos familiares, combos de café, combos dulces y más. Todos a $9.99 con descuento."],
        "precios": ["Todos nuestros combos están en oferta a $9.99 (precio regular alrededor de $12.50). ¡Los descuentos son de hasta 20%!", 
                   "Ofrecemos los mejores precios de la isla. Combos desde $8.99 hasta $12.99 con descuentos incluidos."],
        "pedido": ["Para hacer un pedido, simplemente haz clic en 'Pedir por WhatsApp' en cualquier producto, completa tus datos y se enviará automáticamente.", 
                  "Puedes pedir por WhatsApp en segundos. Selecciona el producto, completa el formulario y listo."],
        "entrega": ["📦 Entregamos en toda el área de la isla. Tiempo estimado: 30-60 minutos. Sin costo adicional en pedidos mayores a $15.", 
                   "🚚 Servicio de entrega rápido. Llevamos tus productos frescos directamente a tu puerta en menos de 1 hora."],
        "pago": ["💳 Aceptamos: Efectivo al recibir, transferencias bancarias, tarjetas de crédito/débito.", 
                "💰 Métodos de pago: Efectivo, transferencia, tarjeta. Puedes pagar cuando recibas tu pedido."],
        "horario": ["⏰ Horario de atención: Lunes a Sábado: 7am - 8pm. Domingos: 8am - 6pm.", 
                   "🏪 Abrimos todos los días. De lunes a sábado de 7am a 8pm, domingos de 8am a 6pm."],
        "instagram": ["📱 Síguenos en Instagram: @sunmarket.isla. Publicamos ofertas especiales y novedades.", 
                     "Instagram: @sunmarket.isla. Encuentra promociones exclusivas y conoce nuevos productos."],
        "contacto": ["📞 Teléfono: +1 234 567 8900\n💬 WhatsApp: +1 234 567 8900\n📍 Dirección: Isla, Calle Principal #123", 
                    "Puedes contactarnos por teléfono, WhatsApp o visitarnos en nuestra dirección en la isla."],
        "gracias": ["¡Gracias a ti! 😊 Estamos para servirte. ¿Hay algo más en lo que pueda ayudarte?", 
                   "¡De nada! Si tienes más preguntas, aquí estoy. 😄"],
        "default": ["Lo siento, no entendí bien. ¿Podrías reformular tu pregunta? Puedo ayudarte con: productos, precios, pedidos, entregas, horarios o contacto."]
    },
    quickReplies: [
        "Ver productos",
        "Cómo hacer pedido",
        "Horarios de entrega",
        "Métodos de pago",
        "Contactar con soporte"
    ]
};

// Estado del chatbot
let chatbotState = {
    isOpen: false,
    messages: [],
    isTyping: false,
    unreadMessages: 0
};

// Inicialización del chatbot
function initChatbot() {
    createChatbotUI();
    setupChatbotEvents();
    loadChatbotHistory();
    showGreeting();
}

// Crear interfaz del chatbot
function createChatbotUI() {
    const chatbotContainer = document.getElementById('chatbot-container');
    
    if (!chatbotContainer) {
        console.error('No se encontró el contenedor del chatbot');
        return;
    }
    
    // Crear ventana del chatbot si no existe
    if (!document.getElementById('chatbot-window')) {
        const chatbotWindow = document.createElement('div');
        chatbotWindow.id = 'chatbot-window';
        chatbotWindow.className = 'chatbot-window';
        chatbotWindow.innerHTML = `
            <div class="chatbot-header">
                <i class="fas fa-robot"></i>
                <span>${CHATBOT_CONFIG.name}</span>
                <div class="chatbot-status"></div>
            </div>
            <div class="chatbot-messages" id="chatbot-messages"></div>
            <div class="chatbot-input-area">
                <div class="chatbot-typing" id="chatbot-typing" style="display: none;">
                    <span>${CHATBOT_CONFIG.name} está escribiendo...</span>
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="chatbot-options" id="chatbot-options"></div>
                <div class="chatbot-input-wrapper">
                    <input type="text" 
                           class="chatbot-input" 
                           id="chatbot-input" 
                           placeholder="Escribe tu mensaje..."
                           aria-label="Mensaje para el chatbot">
                    <button class="chatbot-send" id="chatbot-send" aria-label="Enviar mensaje">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        chatbotContainer.appendChild(chatbotWindow);
    }
}

// Configurar eventos del chatbot
function setupChatbotEvents() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const sendBtn = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input');
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleChatbot);
    }
    
    if (sendBtn && inputField) {
        sendBtn.addEventListener('click', sendUserMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
    
    // Cerrar chatbot al hacer clic fuera (con delegación de eventos)
    document.addEventListener('click', (e) => {
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer && 
            !chatbotContainer.contains(e.target) && 
            chatbotState.isOpen) {
            closeChatbot();
        }
    });
}

// Alternar visibilidad del chatbot
function toggleChatbot() {
    if (chatbotState.isOpen) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

// Abrir chatbot
function openChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (chatbotWindow && toggleBtn) {
        chatbotWindow.classList.add('active');
        toggleBtn.classList.add('active');
        chatbotState.isOpen = true;
        
        // Resetear notificaciones no leídas
        chatbotState.unreadMessages = 0;
        updateNotificationBadge();
        
        // Enfocar el campo de entrada
        setTimeout(() => {
            const inputField = document.getElementById('chatbot-input');
            if (inputField) inputField.focus();
        }, 300);
    }
}

// Cerrar chatbot
function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (chatbotWindow && toggleBtn) {
        chatbotWindow.classList.remove('active');
        toggleBtn.classList.remove('active');
        chatbotState.isOpen = false;
    }
}

// Mostrar saludo inicial
function showGreeting() {
    addChatbotMessage(CHATBOT_CONFIG.greeting, 'bot');
    showQuickReplies();
}

// Mostrar respuestas rápidas
function showQuickReplies() {
    const optionsContainer = document.getElementById('chatbot-options');
    
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    
    CHATBOT_CONFIG.quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = reply;
        button.addEventListener('click', () => {
            handleQuickReply(reply);
        });
        optionsContainer.appendChild(button);
    });
}

// Manejar respuesta rápida
function handleQuickReply(reply) {
    addChatbotMessage(reply, 'user');
    
    // Mapear respuestas rápidas a intenciones
    const intentMap = {
        'Ver productos': 'productos',
        'Cómo hacer pedido': 'pedido',
        'Horarios de entrega': 'entrega',
        'Métodos de pago': 'pago',
        'Contactar con soporte': 'contacto'
    };
    
    const intent = intentMap[reply] || 'default';
    processUserMessage(reply, intent);
}

// Enviar mensaje del usuario
function sendUserMessage() {
    const inputField = document.getElementById('chatbot-input');
    
    if (!inputField || !inputField.value.trim()) return;
    
    const message = inputField.value.trim();
    inputField.value = '';
    
    addChatbotMessage(message, 'user');
    processUserMessage(message);
}

// Procesar mensaje del usuario
function processUserMessage(message, forcedIntent = null) {
    // Simular escritura
    showTypingIndicator();
    
    // Determinar intención
    const intent = forcedIntent || determineIntent(message.toLowerCase());
    
    // Simular tiempo de respuesta
    setTimeout(() => {
        hideTypingIndicator();
        sendBotResponse(intent);
        
        // Guardar conversación
        saveChatbotHistory();
    }, 1000 + Math.random() * 1000);
}

// Determinar intención del mensaje
function determineIntent(message) {
    const intents = {
        'hola': ['hola', 'buenas', 'saludos', 'hello', 'hi'],
        'productos': ['producto', 'combo', 'qué tienes', 'oferta', 'descuento'],
        'precios': ['precio', 'cuánto cuesta', 'costo', 'valor'],
        'pedido': ['pedir', 'ordenar', 'comprar', 'encargar', 'cómo pido'],
        'entrega': ['entrega', 'envío', 'domicilio', 'llevan', 'cuándo llega'],
        'pago': ['pago', 'pagar', 'efectivo', 'tarjeta', 'transferencia'],
        'horario': ['horario', 'abren', 'hora', 'cuándo', 'atendencia'],
        'instagram': ['instagram', 'red social', 'facebook', 'twitter', 'social'],
        'contacto': ['contacto', 'teléfono', 'número', 'dirección', 'ubicación'],
        'gracias': ['gracias', 'thank you', 'merci', 'agradecido']
    };
    
    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => message.includes(keyword))) {
            return intent;
        }
    }
    
    return 'default';
}

// Enviar respuesta del bot
function sendBotResponse(intent) {
    const responses = CHATBOT_CONFIG.responses[intent] || CHATBOT_CONFIG.responses.default;
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    addChatbotMessage(response, 'bot');
    
    // Mostrar opciones rápidas después de ciertas respuestas
    if (intent === 'productos' || intent === 'pedido' || intent === 'default') {
        setTimeout(showQuickReplies, 500);
    }
}

// Añadir mensaje al chat
function addChatbotMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${formatMessage(text)}
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // Guardar en el estado
    chatbotState.messages.push({
        text,
        sender,
        time: new Date().toISOString()
    });
    
    // Scroll al último mensaje
    scrollToBottom();
    
    // Incrementar notificaciones si el chatbot está cerrado
    if (sender === 'bot' && !chatbotState.isOpen) {
        chatbotState.unreadMessages++;
        updateNotificationBadge();
    }
}

// Formatear mensaje (detectar enlaces, etc.)
function formatMessage(text) {
    // Convertir saltos de línea a <br>
    let formatted = text.replace(/\n/g, '<br>');
    
    // Detectar y formatear enlaces
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formatted = formatted.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
    
    // Detectar y formatear números de teléfono
    const phoneRegex = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
    formatted = formatted.replace(phoneRegex, '<a href="tel:$&">$&</a>');
    
    return formatted;
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const typingIndicator = document.getElementById('chatbot-typing');
    if (typingIndicator) {
        chatbotState.isTyping = true;
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
}

// Ocultar indicador de escritura
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('chatbot-typing');
    if (typingIndicator) {
        chatbotState.isTyping = false;
        typingIndicator.style.display = 'none';
    }
}

// Scroll al final del chat
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Actualizar badge de notificación
function updateNotificationBadge() {
    const notificationBadge = document.getElementById('chatbot-notification');
    
    if (notificationBadge) {
        if (chatbotState.unreadMessages > 0) {
            notificationBadge.textContent = chatbotState.unreadMessages;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
}

// Cargar historial del chatbot
function loadChatbotHistory() {
    try {
        const savedHistory = localStorage.getItem('sunmarket_chatbot_history');
        if (savedHistory) {
            chatbotState.messages = JSON.parse(savedHistory);
            
            // Mostrar mensajes guardados
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
                
                chatbotState.messages.forEach(msg => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `message ${msg.sender}-message`;
                    
                    const time = new Date(msg.time).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                    
                    messageDiv.innerHTML = `
                        <div class="message-content">
                            ${formatMessage(msg.text)}
                            <div class="message-time">${time}</div>
                        </div>
                    `;
                    
                    messagesContainer.appendChild(messageDiv);
                });
                
                scrollToBottom();
            }
        }
    } catch (error) {
        console.error('Error al cargar historial del chatbot:', error);
    }
}

// Guardar historial del chatbot
function saveChatbotHistory() {
    try {
        // Limitar el historial a los últimos 50 mensajes
        const recentMessages = chatbotState.messages.slice(-50);
        localStorage.setItem('sunmarket_chatbot_history', JSON.stringify(recentMessages));
    } catch (error) {
        console.error('Error al guardar historial del chatbot:', error);
    }
}

// Limpiar historial del chatbot
function clearChatbotHistory() {
    chatbotState.messages = [];
    localStorage.removeItem('sunmarket_chatbot_history');
    
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    
    showGreeting();
}

// Función para enviar mensaje desde otros módulos
function sendNotificationToChatbot(message) {
    addChatbotMessage(message, 'bot');
    
    // Si el chatbot está cerrado, mostrar notificación
    if (!chatbotState.isOpen) {
        chatbotState.unreadMessages++;
        updateNotificationBadge();
    }
}

// Exportar funciones
window.initChatbot = initChatbot;
window.addChatbotMessage = addChatbotMessage;
window.sendNotificationToChatbot = sendNotificationToChatbot;
window.clearChatbotHistory = clearChatbotHistory;