if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      }, function(err) {
        console.log('Falha ao registrar o Service Worker:', err);
      });
    });
  }

  /* código para instalar o aplicativo */

  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Criar um botão ou outro elemento na interface para o usuário instalar
    const installButton = document.createElement('button');
    installButton.innerText = 'Instalar App';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '10px';
    installButton.style.right = '10px';
    document.body.appendChild(installButton);

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt(); // Mostra o prompt de instalação

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou instalar o app');
            } else {
                console.log('Usuário rejeitou instalar o app');
            }
            deferredPrompt = null; // Limpa o prompt armazenado
            installButton.remove(); // Remove o botão da interface
        });
    });
});

// Opcional: Remover o botão após um tempo se o usuário não interagir
setTimeout(() => {
    if (deferredPrompt && installButton) {
        installButton.remove();
        console.log('Botão de instalação removido por inatividade.');
    }
}, 15000); // Remove o botão após 15 segundos



// Mostra o botão quando o usuário rola 20px para baixo
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

// Função para rolar para o topo
document.getElementById('backToTop').onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};



function verificarAcesso() {
    const uuidEsperado = ['d0709af9-0c05-4f56-8808-30f18efa7f86',
 'bebd18af-b85d-48f5-a651-e73c084da800',
 '897cfa52-6839-4f03-9d7b-353caff240ff'];
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



function verificarLogoComemorativa() {
    const logo = document.getElementById('logo');
    const hoje = new Date();
    const mes = hoje.getMonth() + 1; // Meses são indexados a partir de 0
    const dia = hoje.getDate();

            
           // Datas comemorativas
           
    if (mes === 12 && dia === 25) { // Natal
        logo.src = 'img/logo-natal.png';
        
        
    } else if (mes === 1 && dia === 1) { // Ano Novo
        logo.src = 'img/logo-ano-novo.png';
        
        
    } else if (mes === 7 && dia === 4) { // Independência dos EUA (exemplo)
        logo.src = 'img/logo-independencia.png';
        
        
    } else if (mes === 10 && dia === 31) {
        logo.src = 'img/logo-halloween.png';
        
        
    } else if (mes === 2 && dia === 14) { // Dia dos Namorados
    
    
        logo.src = 'img/logo-dia-namorados.png';
    } else if (mes === 11 && dia === 24) { // Ação de Graças (data variável, exemplo 24 de novembro)
    
    
        logo.src = 'img/logo-acao-gracas.png';
    } else if (mes === 4 && dia === 1) { // Dia da Mentira
    
    
        logo.src = 'img/logo-dia-mentira.png';
    } else if (mes === 5 && dia === 1) { // Dia do Trabalhador
    
    
        logo.src = 'img/logo-dia-trabalhador.png';
    } else if (mes === 6 && dia === 12) { // Dia dos Namorados (Brasil)
    
    
        logo.src = 'img/logo-dia-namorados-br.png';
    } else if (mes === 8 && dia === 15) { // Dia dos Pais (Brasil, data variável, exemplo 15 de agosto)
    
    
        logo.src = 'img/logo-dia-pais.png';
    } else if (mes === 10 && dia === 12) { // Dia das Crianças (Brasil)
    
    
    logo.src = 'img/logo-dia-criancas.png'; 
    } else if (mes === 6 && dia === 24) { // São João
        logo.src = 'img/logo-sao-joao.png';
        
        
        
    } else {
        logo.src = 'img/logo-padrao.png'; // logo padrao
    }
}




function esvaziarLixeira() {
    if (confirm("Tem certeza de que deseja esvaziar a lixeira? Isso removerá permanentemente todos os clientes nela.")) {
        localStorage.removeItem('lixeira');
        carregarLixeiraPagina();
    }
}



function carregarLixeiraPagina() {
    const lixeira = carregarLixeira();
    const tbody = document.querySelector('#tabelaLixeira tbody');
    tbody.innerHTML = '';

    lixeira.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="checkboxCliente" data-nome="${cliente.nome}"></td>
            <td>${cliente.nome}</td>
            <td>
                <button onclick="restaurarCliente('${cliente.nome}')">Restaurar</button>
                <button onclick="removerPermanentemente('${cliente.nome}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const esvaziarLixeiraButton = document.getElementById('esvaziarLixeira');
    esvaziarLixeiraButton.style.display = lixeira.length === 0 ? 'none' : 'block';

    const quantidadeClientes = contarClientesLixeira();
    document.getElementById('quantidadeClientesLixeira').textContent = `Clientes na lixeira: ${quantidadeClientes}`;
}

document.addEventListener('DOMContentLoaded', function() {
    carregarLixeiraPagina();
});

function removerPermanentemente(nome) {
    const lixeira = carregarLixeira();
    const clienteIndex = lixeira.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());

    if (clienteIndex !== -1) {
        lixeira.splice(clienteIndex, 1);
        salvarLixeira(lixeira);
        carregarLixeiraPagina();
    }
}




function removerPermanentemente(nome) {
    const lixeira = carregarLixeira();
    const clienteIndex = lixeira.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());

    if (clienteIndex !== -1) {
        lixeira.splice(clienteIndex, 1);
        salvarLixeira(lixeira);

        window.location.reload();
    }
}

function carregarLixeira() {
    const lixeira = localStorage.getItem('lixeira');
    return lixeira ? JSON.parse(lixeira) : [];
}

function salvarLixeira(lixeira) {
    localStorage.setItem('lixeira', JSON.stringify(lixeira));
}

window.addEventListener('load', carregarLixeiraPagina);


function restaurarCliente(nome) {
    const lixeira = carregarLixeira();
    const clientes = carregarClientes();
    const clienteIndex = lixeira.findIndex(c => c.nome === nome);

    if (clienteIndex !== -1) {
        const cliente = lixeira.splice(clienteIndex, 1)[0];
        clientes.push(cliente);

        salvarClientes(clientes);
        salvarLixeira(lixeira);
        carregarLixeiraPagina();
        atualizarInfoClientes();
        atualizarTabelaClientes();
    }
}



function atualizarTabelaClientes() {
    const clientes = carregarClientes();
    const tabela = document.getElementById('corpoTabela');
    tabela.innerHTML = '';

    clientes.forEach(cliente => {
        adicionarLinhaTabela(cliente.nome, cliente.telefone, cliente.data);
    });
}



function carregarClientes() {
    return JSON.parse(localStorage.getItem('clientes')) || [];
}

function salvarClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

window.addEventListener('load', function() {
    const clientes = carregarClientes();
    clientes.forEach(cliente => adicionarLinhaTabela(cliente.nome, cliente.telefone, cliente.data));
});

// Função para alternar a exibição da lixeira
function alternarLixeira() {
const containerLixeira = document.getElementById('containerLixeira');
const toggleButton = document.getElementById('toggleLixeira');

if (containerLixeira.style.display === 'none') {
containerLixeira.style.display = 'block';
toggleButton.textContent = 'Fechar Lixeira';
} else {
containerLixeira.style.display = 'none';
toggleButton.textContent = 'Abrir Lixeira';
}
}



function excluirCliente(nome) {
    const clientes = carregarClientes();
    const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());

    if (clienteIndex !== -1) {
        const cliente = clientes.splice(clienteIndex, 1)[0];
        salvarClientes(clientes);

        const lixeira = carregarLixeira();
        lixeira.push(cliente);
        salvarLixeira(lixeira);

        const linhaCliente = document.querySelector(`tr[data-nome="${nome}"]`);
        if (linhaCliente) {
            linhaCliente.classList.add('desintegrate');
            setTimeout(() => {
                linhaCliente.remove();
                atualizarInfoClientes();
                carregarLixeiraPagina();
            }, 500);
        }
    }
}



function pesquisarClientesLixeira() {
    const input = document.getElementById('pesquisarLixeira');
    const filter = input.value.toLowerCase();
    const trs = document.querySelectorAll('#tabelaLixeira tbody tr');

    trs.forEach(tr => {
        const td = tr.querySelector('td:nth-child(2)');
        if (td) {
            const textValue = td.textContent || td.innerText;
            tr.style.display = textValue.toLowerCase().includes(filter) ? '' : 'none';
        }
    });
}


function toggleSelecionarTodos(source) {
    const checkboxes = document.querySelectorAll('.checkboxCliente');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
}



function restaurarSelecionados() {
    const checkboxes = document.querySelectorAll('.checkboxCliente:checked');
    const lixeira = carregarLixeira();
    let clientes = carregarClientes();
    let clientesRestaurados = false;

    checkboxes.forEach(checkbox => {
        const nome = checkbox.getAttribute('data-nome');
        const clienteIndex = lixeira.findIndex(c => c.nome === nome);
        const clienteExistente = clientes.some(cliente => cliente.nome === nome);

        if (clienteIndex !== -1 && !clienteExistente) {
            const cliente = lixeira.splice(clienteIndex, 1)[0];
            clientes.push(cliente);
            clientesRestaurados = true;
        }
    });

    salvarClientes(clientes);
    salvarLixeira(lixeira);
    carregarLixeiraPagina();
    atualizarInfoClientes();
    atualizarTabelaClientes();
    carregarPagina();

    if (clientesRestaurados) {
        exibirFeedback("Clientes restaurados com sucesso");
    }
}

function exibirFeedback(mensagem) {
    let feedbackElement = document.getElementById('feedbackR');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'feedbackR';
        document.body.appendChild(feedbackElement);
    }
    feedbackElement.innerText = mensagem;
    feedbackElement.style.display = "block";  // Exibe a mensagem
    setTimeout(() => {
        feedbackElement.style.display = "none";  // Oculta a mensagem após 4 segundos
    }, 4000);
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
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    if (mes > 11) {
        mes = 0;
        ano += 1;
    }

    let dataVencimento = new Date(ano, mes, dia);

    if (dataVencimento.getMonth() !== mes) {
        dataVencimento = new Date(ano, mes + 1, 0);
    }

    return dataVencimento;
}


function adicionarLinhaTabela(nome, telefone, data) {
    const tabela = document.getElementById('corpoTabela');
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-nome', nome); // Adiciona atributo de nome à linha

    // Adiciona a caixa de seleção
    const celulaSelecionar = novaLinha.insertCell(0);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('cliente-checkbox');
    celulaSelecionar.appendChild(checkbox);

    const celulaNome = novaLinha.insertCell(1);
    celulaNome.innerText = nome;

    const celulaTelefone = novaLinha.insertCell(2);
    celulaTelefone.innerText = telefone;

    const celulaData = novaLinha.insertCell(3);
    celulaData.innerText = new Date(data).toLocaleDateString('pt-BR');

    const celulaAcoes = novaLinha.insertCell(4);

    celulaAcoes.appendChild(criarBotao("Editar", function() {
    const novoNome = prompt("Digite o novo nome do cliente:", nome);
    const novoTelefone = prompt("Digite o novo telefone do cliente:", telefone);
    const novaData = prompt("Digite a nova data de vencimento (DD/MM/AAAA):", new Date(data).toLocaleDateString('pt-BR'));

    // Verifica se o usuário não cancelou algum dos prompts
    if (novoNome !== null && novoTelefone !== null && novaData !== null && novoNome && validarTelefone(novoTelefone)) {
        const partesData = novaData.split('/');
        if (partesData.length === 3) {
            const novaDataVencimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
            if (!isNaN(novaDataVencimento.getTime())) {
                const dataAnterior = new Date(data).toLocaleDateString('pt-BR');
                const novaDataFormatada = novaDataVencimento.toLocaleDateString('pt-BR');

                if (dataAnterior !== novaDataFormatada) {
                    atualizarClientesAlterados(nome, dataAnterior, novaDataFormatada);
                }

                celulaNome.innerText = novoNome;
                celulaTelefone.innerText = novoTelefone;
                celulaData.innerText = novaDataFormatada;

                const clientes = carregarClientes();
                const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());
                if (clienteIndex !== -1) {
                    clientes[clienteIndex].nome = novoNome;
                    clientes[clienteIndex].telefone = novoTelefone;
                    clientes[clienteIndex].data = novaDataVencimento;
                    salvarClientes(clientes);
                    atualizarCorCelulaData(celulaData, novaDataVencimento);
                    location.reload();
                }
            }
        }
    }
}));
    

    celulaAcoes.appendChild(criarBotao("Excluir", function() {
        if (confirm("Tem certeza de que deseja excluir este cliente?")) {
            excluirCliente(nome);
        }
    }));

    celulaAcoes.appendChild(criarBotao("WhatsApp", function() {
        const dataVencimentoDestacada = `\`${celulaData.innerText}\``;
        const mensagem = encodeURIComponent(
            `*Olá bom dia, seu plano de canais está vencendo, com data de vencimento dia ${dataVencimentoDestacada}. Caso queira renovar após esta data, favor entrar em contato.* \n \n *PIX EMAIL* \n \n brunopeaceandlove60@gmail.com `
        );
        const telefoneCliente = telefone.replace(/\D/g, '');
        abrirWhatsApp(telefoneCliente, mensagem);
    }));

    atualizarCorCelulaData(celulaData, data);

    tabela.appendChild(novaLinha);
}

function criarBotao(texto, acao) {
    const botao = document.createElement('button');
    botao.innerText = texto;
    botao.addEventListener('click', acao);
    return botao;
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



function renovarCliente(nomeCliente) {
    const clientes = carregarClientes();
    const clienteExistente = clientes.find(c => c.nome === nomeCliente);

    if (clienteExistente) {
        let dataAnterior = new Date(clienteExistente.data).toLocaleDateString('pt-BR');
        let novaData = new Date(); // Aqui você pode definir a nova data como desejar

        // Atualiza a data de vencimento do cliente
        clienteExistente.data = novaData;
        localStorage.setItem('clientes', JSON.stringify(clientes));

        // Registra a renovação de hoje
        registrarClienteRenovadoHoje(nomeCliente);

        // Atualiza a exibição dos clientes alterados
        exibirClientesRenovadosHoje();
    }
}



function registrarClienteRenovadoHoje(nomeCliente) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    let clientesHoje = JSON.parse(localStorage.getItem('clientesRenovadosHoje')) || { data: hoje, nomes: [] };

    if (clientesHoje.data === hoje && !clientesHoje.nomes.includes(nomeCliente)) {
        clientesHoje.nomes.push(nomeCliente);
    } else if (clientesHoje.data !== hoje) {
        clientesHoje = { data: hoje, nomes: [nomeCliente] };
    }

    localStorage.setItem('clientesRenovadosHoje', JSON.stringify(clientesHoje));
}

function exibirClientesRenovadosHoje() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const clientesHoje = JSON.parse(localStorage.getItem('clientesRenovadosHoje')) || { data: hoje, nomes: [] };
    const campoClientesRenovados = document.getElementById('infoClientes');

    if (clientesHoje.nomes.length > 0) {
        const listaClientes = clientesHoje.nomes.map(nome => `<li>${nome}</li>`).join('');
        campoClientesRenovados.innerHTML = `<span class="titulo-clientes-renovados">Clientes renovados hoje:</span><ul>${listaClientes}</ul>`;
    } else {
        campoClientesRenovados.innerHTML = '<span class="nenhum-cliente-renovado">Nenhum cliente renovado hoje</span>';
    }
}

// Chama a função para exibir os clientes renovados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirClientesRenovadosHoje();
});





// Função para atualizar a lista de clientes alterados no localStorage
function atualizarClientesAlterados(nome, dataAnterior, novaData) {
const hoje = new Date().toLocaleDateString('pt-BR');
let clientesAlterados = JSON.parse(localStorage.getItem('clientesAlterados')) || [];
let clientesHoje = clientesAlterados.find(c => c.data === hoje);

if (!clientesHoje) {
clientesHoje = { data: hoje, nomes: [] };
clientesAlterados.push(clientesHoje);
}

clientesHoje.nomes.push({ nome: nome, dataAnterior: dataAnterior, novaData: novaData });
localStorage.setItem('clientesAlterados', JSON.stringify(clientesAlterados));
exibirClientesAlterados();
}



// Função para exibir a lista de clientes alterados na interface
function exibirClientesAlterados() {
    const clientesAlterados = JSON.parse(localStorage.getItem('clientesAlterados')) || [];
    const hoje = new Date().toLocaleDateString('pt-BR');
    const clientesHoje = clientesAlterados.find(c => c.data === hoje);
    const campoClientesAlterados = document.getElementById('infoClientes');

    if (clientesHoje && clientesHoje.nomes.length > 0) {
        const listaClientes = clientesHoje.nomes.map(cliente => `<li>${cliente.nome}</li>`).join('');
        campoClientesAlterados.innerHTML = `<span class="titulo-clientes-renovados">Clientes renovados hoje:</span><ul>${listaClientes}</ul>`;
    } else {
        campoClientesAlterados.innerHTML = '<span class="nenhum-cliente-renovado">Nenhum cliente renovado hoje</span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirClientesAlterados();
});



function atualizarDataVencimento(nomeCliente, novaData) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let clienteExistente = clientes.find(c => c.nome === nomeCliente);

    if (clienteExistente) {
        let dataAnterior = new Date(clienteExistente.data).toLocaleDateString('pt-BR');
        let novaDataFormatada = new Date(novaData).toLocaleDateString('pt-BR');

        if (dataAnterior !== novaDataFormatada) {
            clienteExistente.data = novaData;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            atualizarClientesAlterados(nomeCliente, dataAnterior, novaDataFormatada);
    
        }
    }
}



function registrarClienteAlterado(nome) {
    const clientesAlterados = JSON.parse(localStorage.getItem('clientesAlterados')) || [];
    const hoje = new Date().toLocaleDateString('pt-BR');

    let clienteHoje = clientesAlterados.find(c => c.data === hoje);

    if (!clienteHoje) {
        clienteHoje = { data: hoje, nomes: [] };
        clientesAlterados.push(clienteHoje);
    }

    if (!clienteHoje.nomes.includes(nome)) {
        clienteHoje.nomes.push(nome);
    }

    localStorage.setItem('clientesAlterados', JSON.stringify(clientesAlterados));
    
}



function editarCliente(nomeAntigo, novoNome, novoTelefone, novaDataVencimento) {
            let clientes = carregarClientes();
            let clienteExistente = clientes.find(c => c.nome.toLowerCase() === nomeAntigo.toLowerCase());

            if (clienteExistente) {
                let dataAnterior = new Date(clienteExistente.data).toLocaleDateString('pt-BR');
                let novaDataFormatada = novaDataVencimento.toLocaleDateString('pt-BR');

                if (dataAnterior !== novaDataFormatada) {
                    clienteExistente.nome = novoNome;
                    clienteExistente.telefone = novoTelefone;
                    clienteExistente.data = novaDataVencimento;

                    salvarClientes(clientes);
                    atualizarClientesAlterados(novoNome, dataAnterior, novaDataFormatada);
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            exibirClientesAlterados();
        });



function criarBotao(texto, callback) {
    const btn = document.createElement("button");
    btn.innerText = texto;
    btn.onclick = callback;
    return btn;
}



function abrirWhatsApp(telefoneCliente, mensagem) {
    window.open(`https://api.whatsapp.com/send?phone=55${telefoneCliente}&text=${mensagem}`, '_blank');
}





function pesquisarCliente() {
    const termoPesquisa = document.getElementById('inputPesquisar').value.toLowerCase();
    const linhas = document.getElementById('corpoTabela').getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const nome = linhas[i].getElementsByTagName('td')[1].innerText.toLowerCase(); // Mudança do índice de 0 para 1
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
    document.getElementById('infoClientes2').innerHTML = `
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
            totalVencidos++; }
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



/* function importar clientes */
let clients = JSON.parse(localStorage.getItem('clients')) || [];
        let trash = JSON.parse(localStorage.getItem('trash')) || [];

        function saveClients() {
            localStorage.setItem('clients', JSON.stringify(clients));
        }

        function saveTrash() {
            localStorage.setItem('trash', JSON.stringify(trash));
        }

        function displayClients() {
            const clientList = document.getElementById('clientList');
            clientList.innerHTML = '';
            clients.forEach((client, index) => {
                const clientDiv = document.createElement('div');
                clientDiv.className = 'client';
                clientDiv.innerHTML = `
                    <span>${client.nome} - ${client.telefone} - ${new Date(client.data).toLocaleDateString()}</span>
                    <button onclick="deleteClient(${index})">Excluir</button>
                `;
                clientList.appendChild(clientDiv);
            });
        }

        function addClient() {
            const nome = prompt('Nome do cliente:');
            const telefone = prompt('Telefone do cliente:');
            const data = prompt('Data (aaaa-mm-dd):');
            clients.push({ nome, telefone, data: new Date(data).toISOString() });
            saveClients();
            displayClients();
        }

        function deleteClient(index) {
            const client = clients.splice(index, 1)[0];
            trash.push(client); // Move o cliente para a lixeira
            saveClients();
            saveTrash();
            displayClients();
        }


        function importarClientes(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const clientesImportados = JSON.parse(e.target.result);
                    const clientesAtuais = carregarClientes();
                    
                    // Mapa para rastrear clientes já existentes pelo nome
                    const mapaClientes = new Map();
                    clientesAtuais.forEach(cliente => {
                        mapaClientes.set(cliente.nome.toLowerCase(), cliente);
                    });

                    // Atualizar clientes existentes e adicionar novos clientes do backup
                    clientesImportados.forEach(clienteImportado => {
                        const nomeClienteImportado = clienteImportado.nome.toLowerCase();
                        if (mapaClientes.has(nomeClienteImportado)) {
                            // Cliente já existe, atualizar com informações do backup
                            const clienteExistente = mapaClientes.get(nomeClienteImportado);
                            clienteExistente.telefone = clienteImportado.telefone;
                            clienteExistente.data = clienteImportado.data;
                        } else {
                            // Novo cliente do backup, adicionar à lista
                            clientesAtuais.push(clienteImportado);
                        }
                    });

                    // Salvar a lista atualizada de clientes
                    salvarClientes(clientesAtuais);
                    window.location.reload();
                };
                reader.readAsText(file);
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('importarClientes').addEventListener('change', importarClientes);
            displayClients();
        });


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

document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.cliente-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});



function contarClientesLixeira() {
const lixeira = carregarLixeira();
return lixeira.length;
}


function excluirClientesSelecionados() {
    const checkboxes = document.querySelectorAll('.cliente-checkbox:checked');
    const clientes = carregarClientes();
    const lixeira = carregarLixeira();
    let clientesExcluidos = false;

    checkboxes.forEach(checkbox => {
        const nome = checkbox.closest('tr').getAttribute('data-nome');
        const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());

        if (clienteIndex !== -1) {
            const cliente = clientes.splice(clienteIndex, 1)[0];
            lixeira.push(cliente);
            clientesExcluidos = true;  // Marca que ao menos um cliente foi excluído
        }
    });

    salvarClientes(clientes);
    salvarLixeira(lixeira);
    carregarLixeiraPagina();
    atualizarTabelaClientes();
    atualizarInfoClientes();
    carregarPagina();

    if (clientesExcluidos) {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.innerText = "Clientes excluídos com sucesso";
        feedbackElement.style.display = "block";  // Exibe a mensagem
        setTimeout(() => {
            feedbackElement.style.display = "none";  // Oculta a mensagem após 3 segundos
        }, 4000);
    }
}


window.onload = function() {

    carregarPagina();
    carregarDarkMode();
    verificarBackupDiario();
    exibirClientesAlterados();
    verificarAcesso();
    verificarLogoComemorativa();
    
    
    // Chama a função de scroll para garantir que o botão seja configurado corretamente
    window.onscroll();
};