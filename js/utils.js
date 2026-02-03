// js/utils.js

// Utilidades generales para la aplicación

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Símbolo de moneda
 * @returns {string} Cantidad formateada
 */
function formatCurrency(amount, currency = '$') {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
}

/**
 * Calcula el porcentaje de descuento
 * @param {number} originalPrice - Precio original
 * @param {number} currentPrice - Precio actual
 * @returns {number} Porcentaje de descuento
 */
function calculateDiscount(originalPrice, currentPrice) {
    return Math.round((originalPrice - currentPrice) / originalPrice * 100);
}

/**
 * Valida un número de teléfono
 * @param {string} phone - Número de teléfono a validar
 * @returns {boolean} True si es válido
 */
function validatePhoneNumber(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

/**
 * Valida un correo electrónico
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Limpia un número de teléfono para WhatsApp
 * @param {string} phone - Número de teléfono
 * @returns {string} Número limpio
 */
function cleanPhoneNumber(phone) {
    return phone.replace(/[^\d+]/g, '');
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Formatea una fecha para mostrar
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
}

/**
 * Debounce function
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función throttled
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Almacenamiento seguro en localStorage
 */
const Storage = {
    /**
     * Guarda datos en localStorage
     * @param {string} key - Clave
     * @param {any} value - Valor a guardar
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    },

    /**
     * Obtiene datos de localStorage
     * @param {string} key - Clave
     * @returns {any} Datos recuperados o null
     */
    get(key) {
        try {
            const serialized = localStorage.getItem(key);
            return serialized ? JSON.parse(serialized) : null;
        } catch (error) {
            console.error('Error al leer de localStorage:', error);
            return null;
        }
    },

    /**
     * Elimina datos de localStorage
     * @param {string} key - Clave
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Limpia todos los datos de la aplicación
     */
    clearAppData() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('sunmarket_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

/**
 * Manejo de errores global
 */
function setupErrorHandling() {
    // Capturar errores no manejados
    window.addEventListener('error', (event) => {
        console.error('Error no manejado:', event.error);
        // Aquí podrías enviar el error a un servicio de monitoreo
    });

    // Capturar promesas rechazadas no manejadas
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Promesa rechazada no manejada:', event.reason);
    });
}

/**
 * Verifica la conexión a internet
 * @returns {Promise<boolean>} True si hay conexión
 */
async function checkInternetConnection() {
    if (!navigator.onLine) {
        return false;
    }

    try {
        const response = await fetch('https://www.google.com/favicon.ico', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
        });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        // Fallback para navegadores más antiguos
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (fallbackError) {
            console.error('Error al copiar al portapapeles:', fallbackError);
            return false;
        }
    }
}

/**
 * Carga un script dinámicamente
 * @param {string} url - URL del script
 * @returns {Promise} Promesa que se resuelve cuando el script carga
 */
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error al cargar el script: ${url}`));
        
        document.head.appendChild(script);
    });
}

/**
 * Carga un CSS dinámicamente
 * @param {string} url - URL del CSS
 */
function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

/**
 * Detecta el tipo de dispositivo
 * @returns {Object} Información del dispositivo
 */
function detectDevice() {
    const ua = navigator.userAgent;
    
    return {
        isMobile: /Mobi|Android|iPhone|iPad|iPod/i.test(ua),
        isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
        isDesktop: !/Mobi|Android|iPhone|iPad|iPod/i.test(ua),
        isIOS: /iPad|iPhone|iPod/.test(ua),
        isAndroid: /Android/.test(ua),
        userAgent: ua
    };
}

/**
 * Formatea bytes a un tamaño legible
 * @param {number} bytes - Bytes a formatear
 * @returns {string} Tamaño formateado
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Inicializar manejo de errores
setupErrorHandling();

// Exportar utilidades
window.utils = {
    formatCurrency,
    calculateDiscount,
    validatePhoneNumber,
    validateEmail,
    cleanPhoneNumber,
    generateId,
    formatDate,
    debounce,
    throttle,
    Storage,
    checkInternetConnection,
    copyToClipboard,
    loadScript,
    loadCSS,
    detectDevice,
    formatBytes
};