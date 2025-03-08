// Verifica clientes a vencer uma vez por dia
self.addEventListener("sync", event => {
    if (event.tag === "verificarClientes") {
        event.waitUntil(verificarClientesAVencer());
    }
});

// Função para verificar clientes a vencer
async function verificarClientesAVencer() {
    const clientes = await carregarClientesDoStorage();
    if (!clientes.length) return;

    const hoje = new Date().toLocaleDateString("pt-BR"); // Data de hoje formatada
    const ultimoAviso = await getUltimoAviso(); // Última notificação enviada

    if (hoje === ultimoAviso) {
        console.log("Notificação já enviada hoje. Ignorando.");
        return; // Sai da função se já enviou hoje
    }

    const clientesNotificar = clientes.filter(cliente => {
        const dataVencimento = new Date(cliente.data);
        return Math.ceil((dataVencimento - new Date()) / (1000 * 60 * 60 * 24)) === 2;
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

        await salvarUltimoAviso(hoje); // Salva a data da última notificação
    }
}

// Evento de clique na notificação
self.addEventListener("notificationclick", event => {
    event.notification.close();
    event.waitUntil(clients.openWindow("https://brunopeace.github.io/site.com/"));
});

// Função para acessar os clientes armazenados no navegador
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

// Salva a data da última notificação enviada
async function salvarUltimoAviso(data) {
    self.registration.sync.register("salvarUltimoAviso");
    self.clients.matchAll().then(clients => {
        if (clients.length > 0) {
            clients[0].postMessage({ action: "salvarUltimoAviso", data });
        }
    });
}

// Obtém a última data de notificação enviada
async function getUltimoAviso() {
    return new Promise(resolve => {
        self.clients.matchAll().then(clients => {
            if (clients.length > 0) {
                clients[0].postMessage({ action: "getUltimoAviso" });
                self.addEventListener("message", event => {
                    if (event.data.action === "ultimoAviso") {
                        resolve(event.data.data || "");
                    }
                });
            } else {
                resolve("");
            }
        });
    });
}