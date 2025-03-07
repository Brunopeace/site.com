self.addEventListener('periodicsync', event => {
    if (event.tag === 'verificarClientes') {
        event.waitUntil(
            self.registration.showNotification("Aviso de Vencimento", {
                body: "Verifique os clientes com vencimento em 2 dias!",
                icon: "img/icon512.png",
                vibrate: [200, 100, 200],
            })
        );
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Abre o aplicativo ao clicar na notificação
    );
});