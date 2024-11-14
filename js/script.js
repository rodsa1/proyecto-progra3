// Datos simulados de cuentas
const accounts = [
    { tarjeta: "123456789", pin: "1111", balance: 10000, currency: "USD" },
    { tarjeta: "234567890", pin: "1234", balance: 60000, currency: "USD" },
    { tarjeta: "345678901", pin: "5673", balance: 1000, currency: "USD" },
    { tarjeta: "456789012", pin: "0987", balance: 500, currency: "USD" },
    { tarjeta: "567890123", pin: "9080", balance: 0, currency: "USD" },
    { tarjeta: "678901234", pin: "4375", balance: 10700, currency: "USD" },
    { tarjeta: "987654321", pin: "2064", balance: 200000, currency: "EUR" }
];

// Tipos de cambio simulados
const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.73, USD: 1 },
    EUR: { USD: 1.18, GBP: 0.86, EUR: 1 },
    GBP: { USD: 1.37, EUR: 1.16, GBP: 1 }
};

let currentAccount = null;

// Funciones de utilidad
function showpantalla(message) {
    document.getElementById('pantalla').innerHTML = message;
}

function hideAllSections() {
    document.getElementById('login').classList.add('oculto');
    document.getElementById('menu').classList.add('oculto');
    document.getElementById('retirodefondos').classList.add('oculto');
    document.getElementById('secciontransferencia').classList.add('oculto');
}

function showMenu() {
    hideAllSections();
    document.getElementById('menu').classList.remove('oculto');
    showpantalla(`Bienvenido/a<br>Saldo: ${currentAccount.balance} ${currentAccount.currency}`);
}

// Funciones principales
function login() {
    const tarjeta = document.getElementById('tarjeta').value;
    const pin = document.getElementById('pin').value;

    const account = accounts.find(acc => acc.tarjeta === tarjeta && acc.pin === pin);

    if (account) {
        currentAccount = account;
        showMenu();
    } else {
        showpantalla('Tarjeta o PIN incorrecto');
    }
}

function logout() {
    currentAccount = null;
    hideAllSections();
    document.getElementById('login').classList.remove('oculto');
    document.getElementById('tarjeta').value = '';
    document.getElementById('pin').value = '';
    showpantalla('Bienvenido al Cajero Automático');
}

function showBalance() {
    showpantalla(`Su saldo es:<br>${currentAccount.balance} ${currentAccount.currency}`);
}

function showWithdraw() {
    hideAllSections();
    document.getElementById('retirodefondos').classList.remove('oculto');
    showpantalla('Ingrese el monto a retirar');
}

function withdraw() {
    const amount = parseFloat(document.getElementById('aretirar').value);
    
    if (isNaN(amount) || amount <= 0) {
        showpantalla('Por favor ingrese un monto válido');
        return;
    }

    if (amount > currentAccount.balance) {
        showpantalla('Saldo insuficiente');
        return;
    }

    currentAccount.balance -= amount;
    showpantalla(`Retiro exitoso<br>Nuevo saldo: ${currentAccount.balance} ${currentAccount.currency}`);
    document.getElementById('aretirar').value = '';
}

function showTransfer() {
    hideAllSections();
    document.getElementById('secciontransferencia').classList.remove('oculto');
    showpantalla('Ingrese los datos de la transferencia');
}

function transfer() {
    const destinatarioNumber = document.getElementById('destinatario').value;
    const amount = parseFloat(document.getElementById('transferir').value);
    const targetCurrency = document.getElementById('fondo').value;

    if (isNaN(amount) || amount <= 0) {
        showpantalla('Por favor ingrese un monto válido');
        return;
    }

    const destinatario = accounts.find(acc => acc.tarjeta === destinatarioNumber);
    
    if (!destinatario) {
        showpantalla('Cuenta destino no encontrada');
        return;
    }

    if (amount > currentAccount.balance) {
        showpantalla('Saldo insuficiente');
        return;
    }

    // Convertir el monto según el tipo de cambio
    const exchangeRate = exchangeRates[currentAccount.currency][targetCurrency];
    const convertedAmount = amount * exchangeRate;

    currentAccount.balance -= amount;
    destinatario.balance += convertedAmount;

    showpantalla(`Transferencia exitosa<br>Nuevo saldo: ${currentAccount.balance} ${currentAccount.currency}`);
    document.getElementById('transferir').value = '';
    document.getElementById('destinatario').value = '';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    hideAllSections();
    document.getElementById('login').classList.remove('oculto');
});
