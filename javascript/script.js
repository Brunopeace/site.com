function verificarAcesso() {
    const uuidEsperado = ['fc30c781-e382-406b-b65a-4e850382e014', '26e2f93a-a423-47d9-80d1-c85f83f45db5'];
    let uuidArmazenado = localStorage.getItem('uuid');

    if (!uuidArmazenado) {
        uuidArmazenado = gerarUUID();
        localStorage.setItem('uuid', uuidArmazenado);
    }

    if (!uuidEsperado.includes(uuidArmazenado)) {
        alert("Acesso Negado. Você não tem permissão para acessar esta página.");
        window.location.href = "acessonegado.html";
    }
}

function gerarUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function salvarClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function carregarClientes() {
    return JSON.parse(localStorage.getItem('clientes')) || [];
}

function adicionarCliente() {
    const nome = document.getElementById('inputNome').value.trim();
    const telefone = document.getElementById('inputTelefone').value.trim();
    const data = new Date(document.getElementById('inputData').value);

    if (nome && validarTelefone(telefone) && !isNaN(data.getTime())) {
        const clientes = carregarClientes();
        const clienteExistente = clientes.some(cliente => cliente.nome.toLowerCase() === nome.toLowerCase());

        if (clienteExistente) {
            alert("Cliente com o mesmo nome já existe.");
            return;
        }

        const dataVencimento = calcularDataVencimento(data);
        clientes.push({ nome: nome, telefone: telefone, data: dataVencimento });
        salvarClientes(clientes);

        window.location.reload();
    } else {
        alert("Por favor, preencha o nome, telefone válido e a data.");
    }
}

function validarTelefone(telefone) {
    return telefone.length === 11 && /^\d+$/.test(telefone);
}

function calcularDataVencimento(data) {
    let dia = data.getDate() + 1;
    let mes = data.getMonth() + 1; // Próximo mês
    let ano = data.getFullYear();

    if (mes > 11) {
        mes = 0;
        ano += 1;
    }

    let dataVencimento = new Date(ano, mes, dia);

    // Verifica se o dia caiu no mês seguinte (ex. dia 31 em meses com menos de 31 dias)
    if (dataVencimento.getMonth() !== mes) {
        dataVencimento = new Date(ano, mes + 1, 0); // Último dia do mês anterior
    }

    return dataVencimento;
}

function adicionarLinhaTabela(nome, telefone, data) {
    const tabela = document.getElementById('corpoTabela');
    const novaLinha = document.createElement('tr');

    const celulaNome = novaLinha.insertCell(0);
    celulaNome.innerText = nome;

    const celulaTelefone = novaLinha.insertCell(1);
    celulaTelefone.innerText = telefone;

    const celulaData = novaLinha.insertCell(2);
    celulaData.innerText = new Date(data).toLocaleDateString('pt-BR');

    const celulaAcoes = novaLinha.insertCell(3);

    celulaAcoes.appendChild(criarBotao("Editar", function() {
        const novoNome = prompt("Digite o novo nome do cliente:", nome);
        const novoTelefone = prompt("Digite o novo telefone do cliente:", telefone);
        const novaData = prompt("Digite a nova data de vencimento (DD/MM/AAAA):", data.toLocaleDateString('pt-BR'));

        if (novoNome && validarTelefone(novoTelefone) && novaData) {
            const partesData = novaData.split('/');
            if (partesData.length === 3) {
                const novaDataVencimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
                if (!isNaN(novaDataVencimento.getTime())) {
                    celulaNome.innerText = novoNome;
                    celulaTelefone.innerText = novoTelefone;
                    celulaData.innerText = novaDataVencimento.toLocaleDateString('pt-BR');

                    const clientes = carregarClientes();
                    const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());
                    if (clienteIndex !== -1) {
                        clientes[clienteIndex].nome = novoNome;
                        clientes[clienteIndex].telefone = novoTelefone;
                        clientes[clienteIndex].data = novaDataVencimento;
                        salvarClientes(clientes);
                        atualizarCorCelulaData(celulaData, novaDataVencimento);
                        window.location.reload();
                    }
                } else {
                    alert("Data inválida. Use o formato DD/MM/AAAA.");
                }
            } else {
                alert("Formato de data inválido. Use DD/MM/AAAA.");
            }
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }));

    celulaAcoes.appendChild(criarBotao("Excluir", function() {
        if (confirm("Tem certeza de que deseja excluir este cliente?")) {
            const clientes = carregarClientes();
            const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());
            if (clienteIndex !== -1) {
                clientes.splice(clienteIndex, 1);
                salvarClientes(clientes);
                tabela.deleteRow(novaLinha.rowIndex - 1);
                atualizarInfoClientes();
                window.location.reload();
            }
        }
    }));

    celulaAcoes.appendChild(criarBotao("WhatsApp", function() {
        const dataVencimentoDestacada = `\`${celulaData.innerText}\``;
        const mensagem = encodeURIComponent(
            `*Olá bom dia, seu plano de canais está vencendo, com data de vencimento dia ${dataVencimentoDestacada}. Caso queira renovar após esta data, favor entrar em contato.* \n \n *PIX EMAIL* \n \n *brunopeaceandlove60@gmail.com*`
        );
        const telefoneCliente = telefone.replace(/\D/g, '');
        abrirWhatsApp(telefoneCliente, mensagem);
    }));

    atualizarCorCelulaData(celulaData, data);

    tabela.appendChild(novaLinha);
}

function criarBotao(texto, callback) {
    const btn = document.createElement("button");
    btn.innerText = texto;
    btn.onclick = callback;
    return btn;
}

function abrirWhatsApp(telefoneCliente, mensagem) {
    window.open(`https://api.whatsapp.com/send?phone=55${telefoneCliente}&text=${mensagem}`, '_blank');
}

function atualizarCorCelulaData(celulaData, dataVencimento) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diferencaDias = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24));

    celulaData.classList.remove('red', 'yellow', 'orange');
    if (diferencaDias < 0) {
        celulaData.classList.add('red');
    } else if (diferencaDias === 0) {
        celulaData.classList.add('yellow');
    } else if (diferencaDias === 2) {
        celulaData.classList.add('orange');
    }
}

function pesquisarCliente() {
    const termoPesquisa = document.getElementById('inputPesquisar').value.toLowerCase();
    const linhas = document.getElementById('corpoTabela').getElementsByTagName('tr');
    for (let i = 0; i < linhas.length; i++) {
        const nome = linhas[i].getElementsByTagName('td')[0].innerText.toLowerCase();
        if (nome.includes(termoPesquisa)) {
            linhas[i].style.display = '';
        } else {
            linhas[i].style.display = 'none';
        }
    }
}

function atualizarInfoClientes() {
    const totalVencidos = calcularTotalClientesVencidos();
    const totalNaoVencidos = calcularTotalClientesNaoVencidos();
    document.getElementById('infoClientes').innerHTML = `
        <span class="clientes-vencidos">Clientes vencidos: ${totalVencidos}</span><br>
        <span class="clientes-ativos">Clientes ativos: ${totalNaoVencidos}</span>
    `;
}

function calcularTotalClientesVencidos() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const clientes = carregarClientes();
    let totalVencidos = 0;
    clientes.forEach(function(cliente) {
        const dataVencimento = new Date(cliente.data);
        if (dataVencimento < hoje) {
            totalVencidos++;
        }
    });
    return totalVencidos;
}

function calcularTotalClientesNaoVencidos() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const clientes = carregarClientes();
    let totalNaoVencidos = 0;
    clientes.forEach(function(cliente) {
        const dataVencimento = new Date(cliente.data);
        if (dataVencimento >= hoje) {
            totalNaoVencidos++;
        }
    });
    return totalNaoVencidos;
}

function carregarPagina() {
    const clientes = carregarClientes();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const clientesOrdenados = {
        doisDias: [],
        hoje: [],
        vencidos: [],
        outros: []
    };

    clientes.forEach(cliente => {
        const dataVencimento = new Date(cliente.data);
        const diferencaDias = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24));
        
        if (diferencaDias === 2) {
            clientesOrdenados.doisDias.push(cliente);
        } else if (diferencaDias === 0) {
            clientesOrdenados.hoje.push(cliente);
        } else if (diferencaDias < 0) {
            clientesOrdenados.vencidos.push(cliente);
        } else {
            clientesOrdenados.outros.push(cliente);
        }
    });

    const tabela = document.getElementById('corpoTabela');
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os clientes ordenados

    // Adicionar clientes na ordem correta
    clientesOrdenados.doisDias.forEach(cliente => {
        adicionarLinhaTabela(cliente.nome, cliente.telefone, new Date(cliente.data));
    });

    clientesOrdenados.hoje.forEach(cliente => {
        adicionarLinhaTabela(cliente.nome, cliente.telefone, new Date(cliente.data));
    });

    clientesOrdenados.outros.forEach(cliente => {
        adicionarLinhaTabela(cliente.nome, cliente.telefone, new Date(cliente.data));
    });

    clientesOrdenados.vencidos.forEach(cliente => {
        adicionarLinhaTabela(cliente.nome, cliente.telefone, new Date(cliente.data));
    });

    atualizarInfoClientes();
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const footer = document.querySelector('footer');
    footer.classList.toggle('footer-light'); // Alterna a classe para o footer

    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

function carregarDarkMode() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    const body = document.body;
    const footer = document.querySelector('footer');
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        footer.classList.remove('footer-light'); // Garante que a classe correta seja aplicada
    } else {
        footer.classList.add('footer-light'); // Garante que a classe correta seja aplicada
    }
}

function exportarClientes() {
    const clientes = carregarClientes();
    const blob = new Blob([JSON.stringify(clientes)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


function importarClientes(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const clientesImportados = JSON.parse(e.target.result);
            const clientesAtuais = carregarClientes();
            const novosClientes = [...clientesAtuais, ...clientesImportados];
            salvarClientes(novosClientes);
            window.location.reload();
        };
        reader.readAsText(file);
    }
}




function backupClientes() {
    const clientes = carregarClientes();
    const blob = new Blob([JSON.stringify(clientes)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para verificar e realizar o backup diário
function verificarBackupDiario() {
    const hoje = new Date();
    const ultimaBackupStr = localStorage.getItem('ultimaBackup');
    const ultimaBackup = ultimaBackupStr ? new Date(ultimaBackupStr) : null;

    // Se não houve backup antes ou se um dia passou desde o último backup
    if (!ultimaBackup || (hoje.getTime() - ultimaBackup.getTime()) >= 24 * 60 * 60 * 1000) {
        backupClientes();
        localStorage.setItem('ultimaBackup', hoje.toISOString());
    }
}

// Agendar a verificação de backup diário
setInterval(verificarBackupDiario, 60 * 60 * 1000); // Verifica a cada hora

// Verificação inicial ao carregar a página




window.onload = function() {
    carregarPagina();
    carregarDarkMode();
    verificarAcesso();
verificarBackupDiario(); // Verificar backup diário quando a página carrega
};