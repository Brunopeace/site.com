// Importa o Firebase dentro do Service Worker
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Inicializa o Firebase dentro do Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyAnmG_tHbrD_Jvhh3sLSuDH756Fg5ercdk",
    authDomain: "ntcdc-8dc25.firebaseapp.com",
    projectId: "ntcdc-8dc25",
    storageBucket: "ntcdc-8dc25.firebasestorage.app",
    messagingSenderId: "586278101951",
    appId: "1:586278101951:web:7ec493040427991397f70a",
    measurementId: "G-1814PFR7NH"
});

// Obtém o serviço de mensagens do Firebase
const messaging = firebase.messaging();

// Evento para exibir notificações quando o app está fechado
messaging.onBackgroundMessage(payload => {
    console.log("📩 Notificação recebida em segundo plano:", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});