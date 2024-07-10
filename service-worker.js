self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                // Lista de arquivos a serem armazenados no cache
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'verificar-vencimentos') {
        event.waitUntil(verificarVencimentos());
    }
});

async function verificarVencimentos() {
    const clientes = await carregarClientes();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    clientes.forEach(cliente => {
        const dataVencimento = new Date(cliente.data);
        const diferencaDias = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24));
        
        if (diferencaDias === 2) {
            self.registration.showNotification('Aviso de Vencimento', {
                body: `O plano de ${cliente.nome} está prestes a vencer em 2 dias.`,
                icon: '/path/to/icon.png'
            });
        }
    });
}

function carregarClientes() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ClientesDB', 1);

        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['clientes'], 'readonly');
            const store = transaction.objectStore('clientes');
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = function() {
                resolve(getAllRequest.result);
            };

            getAllRequest.onerror = function() {
                reject(getAllRequest.error);
            };
        };

        request.onerror = function() {
            reject(request.error);
        };
    });
}