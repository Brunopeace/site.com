// Escuta o evento de notificação periódica (Se o navegador suportar)
self.addEventListener("sync", event => {
    if (event.tag === "verificarClientes") {
        event.waitUntil(verificarClientesAVencer());
    }
});

// Função para verificar clientes a vencer
async function verificarClientesAVencer() {
    const clientes = await carregarClientesDoStorage();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const clientesNotificar = clientes.filter(cliente => {
        const dataVencimento = new Date(cliente.data);
        return Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24)) === 2;
    });

    if (clientesNotificar.length > 0) {
        const nomesClientes = clientesNotificar.map(c => c.nome).join(", ");
        self.registration.showNotification("Aviso de Vencimento", {
            body: `Clientes a vencer em 2 dias: ${nomesClientes}`,
            icon: "img/icon512.png",
            vibrate: [200, 100, 200],
            actions: [{ action: "abrir_app", title: "Abrir Aplicativo" }],
            requireInteraction: true,
        });
    }
}

// Evento de clique na notificação
self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            for (let client of clientList) {
                if (client.url.includes("Clientes") && "focus" in client) {
                    return client.focus();
                }
            }
            return clients.openWindow("/index.html"); // Certifique-se de que essa é a URL correta do seu app
        })
    );
});

// Simula carregar clientes do localStorage (Necessário para o Service Worker)
async function carregarClientesDoStorage() {
    return new Promise(resolve => {
        self.clients.matchAll().then(clients => {
            if (clients.length > 0) {
                clients[0].postMessage({ action: "carregarClientes" });
                self.addEventListener("message", event => {
                    if (event.data.action === "clientesData") {
                        resolve(event.data.clientes || []);
                    }
                });
            } else {
                resolve([]);
            }
        });
    });
}