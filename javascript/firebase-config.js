// Inicializa o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnmG_tHbrD_Jvhh3sLSuDH756Fg5ercdk",
    authDomain: "ntcdc-8dc25.firebaseapp.com",
    projectId: "ntcdc-8dc25",
    storageBucket: "ntcdc-8dc25.firebasestorage.app",
    messagingSenderId: "586278101951",
    appId: "1:586278101951:web:7ec493040427991397f70a",
    measurementId: "G-1814PFR7NH"
};

// Verifica se o Firebase já foi carregado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Se já estiver carregado, reutiliza a instância
}

// Inicializa o serviço de mensagens do Firebase
const messaging = firebase.messaging();

// Obtém o token do dispositivo e exibe no console
messaging.getToken().then(token => {
    console.log("Token do dispositivo:", token);
    localStorage.setItem("fcmToken", token);
}).catch(err => console.error("Erro ao obter token:", err));