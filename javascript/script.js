if ('serviceWorker' in navigator) {
window.addEventListener('load', function() {
 navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('✅ Service Worker1 registrado com sucesso:', registration);
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
    const installButton = document.createElement('button');
    installButton.innerText = 'Instalar App';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '10px';
    installButton.style.right = '10px';
    document.body.appendChild(installButton);
    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
   deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
   console.log('Usuário aceitou instalar o app');
            } else {
   console.log('Usuário rejeitou instalar o app');
            }
            deferredPrompt = null;
            installButton.remove();
        });
    });
});
setTimeout(() => {
    if (deferredPrompt && installButton) {
        installButton.remove();
        console.log('Botão de instalação removido por inatividade.');
    }
}, 15000);

document.addEventListener("DOMContentLoaded", () => {
    const loading = document.getElementById("loading");

    const hasVisited = sessionStorage.getItem("hasVisited");

    const esconderLoader = () => {
        if (loading) {
            loading.classList.add("hidden");
            setTimeout(() => loading.style.display = "none", 500);
        }
    };

    if (!hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
        setTimeout(esconderLoader, 3000);
    } else {
        esconderLoader();
    }
});

(function(){
    function _0xuuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'['replace'](/[xy]/g, function(c) {
            const r = Math['floor'](Math['random']() * 16);
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v ;
        });
    }

    function _0xcheck() {
        const _0xU = ['111314440415-09912-46615-913115-1013910111011611189',
 'f94d86e1-1072-4553-a0d5-493de09fd975'];
        let _0xS = localStorage['getItem']('uuid');

        if (!_0xS) {
            _0xS = _0xuuid();
            localStorage['setItem']('uuid', _0xS);
        }

        const _0xA = _0xU['includes'](_0xS);

        if (!_0xA) {
            console['warn']("Acesso negado para UUID:", _0xS);
            alert("Acesso Negado. Você não tem permissão para acessar esta página.");
            window['location']['href'] = 'acessonegado.html';
        }
    }

    _0xcheck();
})();

window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};
document.getElementById('backToTop').onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
    const quantidadeClientes = contarClientesLixeira(); document.getElementById('quantidadeClientesLixeira').textContent = `Clientes na lixeira: ${quantidadeClientes}`;
}
document.addEventListener('DOMContentLoaded', function() {
    carregarLixeiraPagina();
});

function contarClientesLixeira() {
const lixeira = carregarLixeira();
return lixeira.length;
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
    return JSON.parse(localStorage.getItem('lixeira')) || [];
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
        window.location.reload();
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
        const somExclusao = new Audio('sounds/exclusao.mp3');
        somExclusao.play();
        const cliente = clientes.splice(clienteIndex, 1)[0];
        salvarClientes(clientes);
        const lixeira = carregarLixeira();
        lixeira.push(cliente);
        salvarLixeira(lixeira);

        // ✅ Exclui do Firebase também
        excluirClienteDoFirebase(nome);

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

function excluirClienteDoFirebase(nome) {
    const id = nome.toLowerCase()
        .replace(/\s+/g, '') // remove espaços
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[.#$/[\]]/g, ''); // remove caracteres inválidos

    firebase.database().ref('clientes/' + id).remove()
        .then(() => {
            console.log(`🗑️ Cliente removido do Firebase: ${id}`);
        })
        .catch((error) => {
            console.error("❌ Erro ao remover cliente do Firebase:", error);
        });
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
        if (clienteIndex !== -1 && !clientes.some(cliente => cliente.nome === nome)) {
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
    } else {
        exibirFeedback("Nenhum cliente foi restaurado. Clientes com o mesmo nome já existem.");
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
    feedbackElement.style.display = "block";
    setTimeout(() => {
        feedbackElement.style.display = "none";
    }, 4000);
}

function adicionarCliente() {
    const nomeInput = document.getElementById('inputNome');
    const telefoneInput = document.getElementById('inputTelefone');
    const dataInput = document.getElementById('inputData');

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const data = dataInput.value;

    let erro = false;

    erro |= !validarCampo(nomeInput, nome, "Nome do cliente não pode estar vazio.");
    erro |= !validarCampo(telefoneInput, telefone, "Telefone inválido. Deve conter 11 dígitos.", validarTelefone);
    erro |= !validarCampo(dataInput, data, "Data inválida. Escolha uma data válida.", validarData);

    if (erro) return;

    const nomeNormalizado = nome.toLowerCase(); // ⬅️ Nome sempre em minúsculo
    const clientes = carregarClientes();

    const clienteExistente = clientes.some(cliente =>
        cliente.nome.toLowerCase() === nomeNormalizado
    );

    if (clienteExistente) {
        alert("Cliente com o mesmo nome já existe.");
        return;
    }

    const dataFormatada = new Date(data);
    const dataVencimento = calcularDataVencimento(dataFormatada);

    const novoCliente = {
        nome: nomeNormalizado,
        telefone,
        data: dataVencimento
    };

    clientes.push(novoCliente);
    salvarClientes(clientes);

    atualizarDataNoFirebase(novoCliente).then(() => {
        window.location.reload();
    });
}

document.addEventListener('DOMContentLoaded', () => {
   exibirClientesAlterados();
   
});

function validarCampo(input, valor, mensagemErro, validador = v => v.trim() !== "") {
    if (!validador(valor)) {
        exibirErro(input, mensagemErro);
        return false;
    }
    limparErro(input);
    return true;
}

function validarTelefone(telefone) {
    return /^\d{11}$/.test(telefone);
}

function validarData(data) {
    const d = new Date(data);
    return data && !isNaN(d.getTime());
}

// Lista reutilizável de DDDs válidos do Brasil
const DDD_VALIDOS_BR = [
    "11","12","13","14","15","16","17","18","19", // SP
    "21","22","24", // RJ
    "27","28", // ES
    "31","32","33","34","35","37","38", // MG
    "41","42","43","44","45","46", // PR
    "47","48","49", // SC
    "51","53","54","55", // RS
    "61", // DF
    "62","64", // GO
    "63", // TO
    "65","66", // MT
    "67", // MS
    "68","69", // AC e RO
    "71","73","74","75","77", // BA
    "79", // SE
    "81","82","83","84","85","86","87","88","89", // NE
    "91","92","93","94","95","96","97","98","99"  // Norte
];

// Valida se o telefone tem 11 dígitos, DDD válido e começa com 9
function validarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');

    if (numeroLimpo.length !== 11) return false;

    const ddd = numeroLimpo.slice(0, 2);
    const primeiroDigito = numeroLimpo[2];

    return DDD_VALIDOS_BR.includes(ddd) && primeiroDigito === '9';
}

// Formata o telefone no padrão internacional +55
function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    return validarTelefone(numeroLimpo) ? `+55${numeroLimpo}` : "Número inválido";
}

// Formata o telefone no padrão brasileiro amigável: (11) 91234-5678
function formatarTelefoneAmigavel(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');

    if (!validarTelefone(numeroLimpo)) return "Número inválido";

    const ddd = numeroLimpo.slice(0, 2);
    const parte1 = numeroLimpo.slice(2, 7);
    const parte2 = numeroLimpo.slice(7);

    return `(${ddd}) ${parte1}-${parte2}`;
}

// Exibe uma mensagem de erro visual ao lado do input
function exibirErro(input, mensagem) {
    let erroSpan = input.parentNode.querySelector(".erro-mensagem");

    if (!erroSpan) {
        erroSpan = document.createElement("span");
        erroSpan.className = "erro-mensagem";
        input.parentNode.appendChild(erroSpan);
    }

    erroSpan.textContent = mensagem;
    input.classList.add("input-erro");
}

// Função para limpar o erro do input
function limparErro(input) {
    const erroSpan = input.nextElementSibling;
    if (erroSpan && erroSpan.classList.contains("erro-mensagem")) {
        erroSpan.remove();
    }
    input.classList.remove("input-erro");
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

function gerarIdFirebase(nome) {
    return nome.toLowerCase()
        .replace(/\s+/g, '') // remove espaços
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[.#$/[\]]/g, ''); // remove caracteres inválidos para o Firebase
}

function adicionarLinhaTabela(nome, telefone, data) {
    const tabela = document.getElementById('corpoTabela');
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-nome', nome.toLowerCase()); // garante minúsculo

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

    // Botão de editar
    celulaAcoes.appendChild(criarBotao("Editar", function () {
        const nomeAntigo = celulaNome.innerText;
        const novoNome = prompt("Digite o novo nome do cliente:", nomeAntigo);
        const novoTelefone = prompt("Digite o novo telefone do cliente:", celulaTelefone.innerText);
        const novaData = prompt("Digite a nova data de vencimento (DD/MM/AAAA):", celulaData.innerText);

        if (novoNome && novoTelefone && novaData && validarTelefone(novoTelefone)) {
            const partesData = novaData.split('/');
            if (partesData.length === 3) {
                const novaDataVencimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
                if (!isNaN(novaDataVencimento.getTime())) {
                    const dataAnterior = new Date(data).toLocaleDateString('pt-BR');
                    const novaDataFormatada = novaDataVencimento.toLocaleDateString('pt-BR');

                    if (dataAnterior !== novaDataFormatada) {
                        atualizarClientesAlterados(nomeAntigo, dataAnterior, novaDataFormatada);
                        // ⬅️ Marca que a lista deve ser exibida após o reload
                        sessionStorage.setItem("mostrarRenovadosHoje", "true");
                    }

                    const clientes = carregarClientes();
                    const clienteIndex = clientes.findIndex(c => c.nome.toLowerCase() === nomeAntigo.toLowerCase());

                    if (clienteIndex !== -1) {
                        const clienteAtualizado = {
                            nome: novoNome.toLowerCase(),
                            telefone: novoTelefone,
                            data: novaDataVencimento
                        };

                        const idAntigo = gerarIdFirebase(nomeAntigo);
                        const idNovo = gerarIdFirebase(clienteAtualizado.nome);

                        clientes[clienteIndex] = clienteAtualizado;
                        salvarClientes(clientes);

                        // Atualiza UI
                        celulaNome.innerText = clienteAtualizado.nome;
                        celulaTelefone.innerText = clienteAtualizado.telefone;
                        celulaData.innerText = novaDataVencimento.toLocaleDateString('pt-BR');
                        novaLinha.setAttribute('data-nome', clienteAtualizado.nome.toLowerCase());
                        atualizarCorCelulaData(celulaData, novaDataVencimento);

                        // Atualiza Firebase
                        const atualizarFirebase = () => {
                            return atualizarDataNoFirebase(clienteAtualizado).then(() => {
                                console.log("✏️ Cliente atualizado no Firebase:", clienteAtualizado);
                                location.reload(); // só depois de tudo
                            });
                        };

                        if (idAntigo !== idNovo) {
                            firebase.database().ref('clientes/' + idAntigo).remove().then(atualizarFirebase);
                        } else {
                            atualizarFirebase();
                        }
                    }
                }
            }
        }
    }));
    
    // Botão de excluir
celulaAcoes.appendChild(criarBotao("Excluir", function() {
    const nomeCliente = novaLinha.getAttribute('data-nome'); // ⬅️ PEGA O NOME ATUAL
    if (confirm("Tem certeza de que deseja excluir este cliente?")) {
        excluirCliente(nomeCliente);
    }
}));

    // Dropdown para enviar mensagem
    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown');
    const botaoDropdown = document.createElement('button');
    botaoDropdown.innerText = 'WhatsApp';
    botaoDropdown.classList.add('dropbtn');
    const conteudoDropdown = document.createElement('div');
 conteudoDropdown.classList.add('dropdown-content');

    // Botão para WhatsApp
    const botaoWhatsApp = document.createElement('button');
botaoWhatsApp.innerText = 'Enviar para WhatsApp';
botaoWhatsApp.classList.add('WhatsApp');
botaoWhatsApp.onclick = function() {
    const dataVencimento = celulaData.innerText.trim();
    const saudacao = obterSaudacao();
    const telefoneCliente = telefone ? telefone.replace(/\D/g, '') : '';

    if (!telefoneCliente) {
        alert('Número de telefone inválido.');
        return;
    }

    const mensagem = criarMensagemWhatsApp(saudacao, dataVencimento);
    abrirWhatsApp(telefoneCliente, mensagem);
};

conteudoDropdown.appendChild(botaoWhatsApp);

// Função para obter a saudação baseada no horário atual
function obterSaudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return "bom dia";
    if (hora < 18) return "boa tarde";
    return "boa noite";
}

// Função para criar a mensagem do WhatsApp formatada
function criarMensagemWhatsApp(saudacao, dataVencimento) {
    return encodeURIComponent(
        `*Olá, ${saudacao}!* \n\n` +
        `Seu plano de canais está vencendo em *${dataVencimento}*.\n` +
        `Caso queira renovar após esta data, favor entrar em contato.\n\n` +
        `*PIX EMAIL:* \n\n brunopeaceandlove60@gmail.com`
    );
}

// Função para abrir o WhatsApp com a mensagem
function abrirWhatsApp(telefone, mensagem) {
    const url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${mensagem}`;
    window.open(url, '_blank');
}

    // Botão para Telegram
    const botaoTelegram = document.createElement('button');
botaoTelegram.innerText = 'Enviar para Telegram';
botaoTelegram.classList.add('telegram');
botaoTelegram.onclick = function() {
    const dataVencimentoDestacada = celulaData.innerText;
    const horaAtual = new Date().getHours();
    let saudacao;
    if (horaAtual >= 0 && horaAtual < 12) {
        saudacao = "bom dia";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = "boa tarde";
    } else {
        saudacao = "boa noite";
    }

    const mensagem = encodeURIComponent(
        `Olá ${saudacao}, seu plano de canais está vencendo, com data de vencimento dia ${dataVencimentoDestacada}. Caso queira renovar após esta data, favor entrar em contato. \n\n PIX EMAIL \n\n brunopeaceandlove60@gmail.com`
    );

    const numeroTelefone = telefone.replace(/\D/g, ''); // Limpa o número de telefone
    const usernameCliente = null; // Coloque aqui o username se disponível, ou deixe como null

    if (usernameCliente) {
        // Se houver username, tenta abrir o chat com o username
        const telegramAppUrlUsername = `tg://resolve?domain=${usernameCliente}&text=${mensagem}`;
        window.location.href = telegramAppUrlUsername;

        // Fallback para o navegador
        setTimeout(() => {
            const urlTelegram = `https://t.me/${usernameCliente}?text=${mensagem}`;
            window.open(urlTelegram, '_blank');
        }, 500);
    } else {
        // Se não houver username, usa o link de compartilhamento com número de telefone
        const urlTelegramShare = `https://t.me/share/url?url=tel:+${numeroTelefone}&text=${mensagem}`;
        window.open(urlTelegramShare, '_blank');
    }
};
    
    conteudoDropdown.appendChild(botaoTelegram);
    dropdownDiv.appendChild(botaoDropdown);
    dropdownDiv.appendChild(conteudoDropdown);
    celulaAcoes.appendChild(dropdownDiv);
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
    hoje.setHours(0, 0, 0, 0); // Garante que só a data importa

    const diferencaDias = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24));

    // Remove classes antigas
    celulaData.classList.remove('red', 'yellow', 'orange');

    // Define a cor conforme a diferença de dias
    if (diferencaDias < 0) {
        celulaData.classList.add('red'); // Já venceu
    } else if (diferencaDias === 0) {
        celulaData.classList.add('yellow'); // Vence hoje
    } else if (diferencaDias === 2) {
        celulaData.classList.add('orange'); // Faltam 2 dias
    }
}

function renovarCliente(nome) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    let clientesHoje = JSON.parse(localStorage.getItem('clientesRenovadosHoje')) || { data: hoje, nomes: [] };
    if (clientesHoje.data !== hoje) {
        clientesHoje = { data: hoje, nomes: [] };
    }
    if (!clientesHoje.nomes.includes(nome)) {
        clientesHoje.nomes.push(nome);
        localStorage.setItem('clientesRenovadosHoje', JSON.stringify(clientesHoje));
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
        const listaClientes = clientesHoje.nomes.map(nome => `<li class="cliente-scroll" data-nome="${nome.toLowerCase()}">${nome}</li>`).join('');
        campoClientesRenovados.innerHTML = `<span class="titulo-clientes-renovados">Clientes renovados hoje:</span><ul>${listaClientes}</ul>`;
        adicionarEventoScrollClientes();
    } else {
        campoClientesRenovados.innerHTML = '<span class="nenhum-cliente-renovado">Nenhum cliente renovado hoje</span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirClientesRenovadosHoje();
});

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

function registrarClienteAlterado(nome) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    let clientesAlterados = JSON.parse(localStorage.getItem('clientesAlterados')) || [];
    let clientesRenovados = JSON.parse(localStorage.getItem('clientesRenovadosHoje')) || { data: hoje, nomes: [] };
    const clienteJaRenovado = clientesRenovados.nomes.some(c => c.nome === nome);

    if (clienteJaRenovado) {
        return;
    }
    let clientesHoje = clientesAlterados.find(c => c.data === hoje);
    if (!clientesHoje) {
        clientesHoje = { data: hoje, nomes: [] };
        clientesAlterados.push(clientesHoje);
    }
    if (!clientesHoje.nomes.some(c => c.nome === nome)) {
        clientesHoje.nomes.push({ nome });
        localStorage.setItem('clientesAlterados', JSON.stringify(clientesAlterados));
        exibirClientesAlterados();
    }
}

function exibirClientesAlterados() {
    const clientesAlterados = JSON.parse(localStorage.getItem('clientesAlterados')) || [];
    const hoje = new Date().toLocaleDateString('pt-BR');
    const clientesHoje = clientesAlterados.find(c => c.data === hoje);
    const campoClientesAlterados = document.getElementById('infoClientes');

    if (clientesHoje && clientesHoje.nomes.length > 0) {
        const nomesUnicos = [...new Set(clientesHoje.nomes.map(cliente => cliente.nome))];
        const listaClientes = nomesUnicos.map(nome => `<li class="cliente-scroll" data-nome="${nome.toLowerCase()}">${nome}</li>`).join('');
        campoClientesAlterados.innerHTML = `<span class="titulo-clientes-renovados">Clientes renovados hoje:</span><ul>${listaClientes}</ul>`;
        adicionarEventoScrollClientes();
    } else {
        campoClientesAlterados.innerHTML = '<span class="nenhum-cliente-renovado">Nenhum cliente renovado hoje</span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirClientesAlterados();
});

function adicionarEventoScrollClientes() {
    document.querySelectorAll('.cliente-scroll').forEach(li => {
        li.addEventListener('click', function () {
            const nome = this.getAttribute('data-nome');
            const linhaCliente = document.querySelector(`tr[data-nome="${nome}"]`);
            if (linhaCliente) {
                linhaCliente.scrollIntoView({ behavior: 'smooth', block: 'center' });
                linhaCliente.classList.add('destaque-scroll');
                setTimeout(() => linhaCliente.classList.remove('destaque-scroll'), 2000);
            }
        });
    });
}

function atualizarDataVencimento(nomeCliente, novaData) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let clienteExistente = clientes.find(c => c.nome === nomeCliente);

    if (clienteExistente) {
        let dataAnterior = new Date(clienteExistente.data).toLocaleDateString('pt-BR');
        let novaDataFormatada = new Date(novaData).toLocaleDateString('pt-BR');

        if (dataAnterior !== novaDataFormatada) {
            clienteExistente.data = novaData;
            localStorage.setItem('clientes', JSON.stringify(clientes));

            // ✅ Atualiza no Firebase
            atualizarDataNoFirebase(clienteExistente);

            // Atualiza o histórico
            atualizarClientesAlterados(nomeCliente, dataAnterior, novaDataFormatada);
        }
    }
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

//funções atualizadas
function pesquisarCliente() {
    const termoPesquisa = document.getElementById('inputPesquisar').value.toLowerCase();
    const linhas = document.getElementById('corpoTabela').getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const nome = linhas[i].getElementsByTagName('td')[1].innerText.toLowerCase();
        const telefone = linhas[i].getElementsByTagName('td')[2].innerText.toLowerCase();

        if (nome.includes(termoPesquisa) || telefone.includes(termoPesquisa)) {
            linhas[i].style.display = '';
        } else {
            linhas[i].style.display = 'none';
        }
    }
}

function atualizarInfoClientes() {
    const totalVencidos = calcularTotalClientesVencidos();
    const totalNaoVencidos = calcularTotalClientesNaoVencidos();
    const infoDiv = document.getElementById('infoClientes2');

    // Limpa conteúdo anterior
    infoDiv.innerHTML = '';

    // Cria elementos
    const vencidosSpan = document.createElement('span');
    vencidosSpan.className = 'clientes-vencidos';
    vencidosSpan.textContent = `Clientes vencidos: ${totalVencidos}`;

    const ativosSpan = document.createElement('span');
    ativosSpan.className = 'clientes-ativos';
    ativosSpan.textContent = `Clientes ativos: ${totalNaoVencidos}`;

    // Adiciona ao container
    infoDiv.appendChild(vencidosSpan);
    infoDiv.appendChild(document.createElement('br'));
    infoDiv.appendChild(ativosSpan);
}

function contarClientesPorCondicao(condicaoCallback) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const clientes = carregarClientes();
    return clientes.reduce((total, cliente) => {
        const dataVencimento = new Date(cliente.data);
        return condicaoCallback(dataVencimento, hoje) ? total + 1 : total;
    }, 0);
}

function calcularTotalClientesVencidos() {
    return contarClientesPorCondicao((vencimento, hoje) => vencimento < hoje);
}

function calcularTotalClientesNaoVencidos() {
    return contarClientesPorCondicao((vencimento, hoje) => vencimento >= hoje);
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.toggle('dark-mode-footer', isDarkMode);
    }

    // Define que o tema foi escolhido manualmente
    localStorage.setItem('dark-mode', isDarkMode);
    localStorage.setItem('dark-mode-user-set', 'true');
}

function aplicarDarkMode(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode);

    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.toggle('dark-mode-footer', isDarkMode);
    }
}

function carregarDarkMode() {
    const userSet = localStorage.getItem('dark-mode-user-set') === 'true';
    let isDarkMode = localStorage.getItem('dark-mode');

    if (isDarkMode === null || isDarkMode === undefined) {
        // Nenhum tema escolhido ainda
        const horaAtual = new Date().getHours();
        isDarkMode = horaAtual >= 18 || horaAtual < 6;
        localStorage.setItem('dark-mode', isDarkMode);
        localStorage.setItem('dark-mode-user-set', 'false'); // automático
    } else {
        isDarkMode = isDarkMode === 'true';
    }

    aplicarDarkMode(isDarkMode);

}

document.addEventListener('DOMContentLoaded', carregarDarkMode);

function verificarBackupDiario() {
    // Verificar compatibilidade com localStorage e Blob
    if (typeof Storage === "undefined" || typeof Blob === "undefined") {
        alert("Seu navegador não suporta os recursos necessários para realizar o backup.");
        return;
    }

    const hoje = new Date().toLocaleDateString();
    const ultimoBackup = localStorage.getItem('ultimoBackup');
    
    if (ultimoBackup !== hoje) {
        try {
            // Carregar clientes e lixeira
            const clientes = carregarClientes();
            const lixeira = carregarLixeira();
            
            // Preparar os dados para backup
            const backupData = {
                data: hoje,
                clientes: clientes || [],
                lixeira: lixeira || []
            };

            // Gerar o arquivo de backup
            const backupJson = JSON.stringify(backupData, null, 2);
            const blob = new Blob([backupJson], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            // Criar um link para download
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-${hoje}.json`;

            // Simular o clique para download automático
            a.click();

            // Limpar o URL do blob
            URL.revokeObjectURL(url);

            // Salvar a data do último backup
            localStorage.setItem('ultimoBackup', hoje);

            // Feedback de sucesso (se desejar)
            mostrarMensagemSucesso("Backup realizado com sucesso!");

        } catch (error) {
            console.error("Erro ao gerar o backup diário:", error);
            alert("Houve um erro ao gerar o backup diário. Tente novamente.");
        }
    }
}

// Função para exibir uma mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    const mensagemElemento = document.createElement('div');
    mensagemElemento.textContent = mensagem;
    mensagemElemento.style.position = 'fixed';
    mensagemElemento.style.top = '10px';
    mensagemElemento.style.right = '10px';
    mensagemElemento.style.backgroundColor = '#28a745';
    mensagemElemento.style.color = '#fff';
    mensagemElemento.style.padding = '10px';
    mensagemElemento.style.borderRadius = '5px';
    mensagemElemento.style.zIndex = '1000';
    document.body.appendChild(mensagemElemento);

    // Remover a mensagem após 5 segundos
    setTimeout(() => {
        mensagemElemento.remove();
    }, 5000);
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
    tabela.innerHTML = '';
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

function exportarClientes() {
    const clientes = carregarClientes();
    const lixeira = carregarLixeira();
    const todosClientes = [...clientes, ...lixeira];
    const jsonClientes = JSON.stringify(todosClientes, null, 2);

    const blob = new Blob([jsonClientes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes_exportados.json';
    a.click();

    URL.revokeObjectURL(url);
}

function importarClientes(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const data = JSON.parse(e.target.result);
                let clientesImportados = [];
                let lixeiraImportada = [];

                if (Array.isArray(data)) {
                    clientesImportados = data;
                } else if (typeof data === 'object') {
                    clientesImportados = data.clientes || [];
                    lixeiraImportada = data.lixeira || [];
                    if (!clientesImportados.length && !lixeiraImportada.length) {
                        for (let key in data) {
                            if (key.toLowerCase().includes('cliente')) {
                                clientesImportados = data[key];
                            } else if (key.toLowerCase().includes('lixeira')) {
                                lixeiraImportada = data[key];
                            }
                        }
                    }
                }

                // 🔁 Normaliza nomes de todos os clientes para minúsculo
                clientesImportados = clientesImportados.map(cliente => ({
                    ...cliente,
                    nome: cliente.nome.toLowerCase()
                }));

                lixeiraImportada = lixeiraImportada.map(cliente => ({
                    ...cliente,
                    nome: cliente.nome.toLowerCase()
                }));

                const clientesAtuais = carregarClientes();
                const lixeiraAtual = carregarLixeira();
                const mapaClientes = new Map();

                clientesAtuais.forEach(cliente => {
                    mapaClientes.set(cliente.nome.toLowerCase(), cliente);
                });

                clientesImportados.forEach(clienteImportado => {
                    const nomeClienteImportado = clienteImportado.nome;
                    if (mapaClientes.has(nomeClienteImportado)) {
                        const clienteExistente = mapaClientes.get(nomeClienteImportado);
                        clienteExistente.telefone = clienteImportado.telefone;
                        clienteExistente.data = clienteImportado.data;
                    } else {
                        clientesAtuais.push(clienteImportado);
                    }
                });

                const mapaLixeira = new Map();
                lixeiraAtual.forEach(cliente => {
                    mapaLixeira.set(cliente.nome.toLowerCase(), cliente);
                });

                lixeiraImportada.forEach(clienteImportado => {
                    const nomeClienteImportado = clienteImportado.nome;
                    if (mapaLixeira.has(nomeClienteImportado)) {
                        const clienteExistente = mapaLixeira.get(nomeClienteImportado);
                        clienteExistente.telefone = clienteImportado.telefone;
                        clienteExistente.data = clienteImportado.data;
                    } else {
                        lixeiraAtual.push(clienteImportado);
                    }
                });

                salvarClientes(clientesAtuais);
                salvarLixeira(lixeiraAtual);

                // 🔄 Atualiza todos no Firebase com nomes já normalizados
                const promessasFirebase = clientesAtuais.map(cliente =>
                    atualizarDataNoFirebase(cliente)
                );
                await Promise.all(promessasFirebase);

                alert("Importação realizada com sucesso!");
                window.location.reload();
            } catch (error) {
                alert("Erro ao importar o arquivo: " + error.message);
            }
        };
        reader.readAsText(file);
    }
}

document.addEventListener('DOMContentLoaded', function() { document.getElementById('importarClientes').addEventListener('change', importarClientes);
    if (typeof displayClients === 'function') {
        displayClients();
    }
});

window.addEventListener('load', verificarBackupDiario);
setInterval(verificarBackupDiario, 60 * 60 * 1000);

document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.cliente-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

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
            clientesExcluidos = true;
        }
    });

    if (clientesExcluidos) {
        const somExclusao = new Audio('sounds/exclusao.mp3');
        somExclusao.play();
    }
    salvarClientes(clientes);
    salvarLixeira(lixeira);
    carregarLixeiraPagina();
    atualizarTabelaClientes();
    atualizarInfoClientes();
    carregarPagina();

    if (clientesExcluidos) {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.innerText = "Clientes excluídos com sucesso";
        feedbackElement.style.display = "block";
        setTimeout(() => {
            feedbackElement.style.display = "none";
        }, 4000);
    }
}

window.onload = function() {

    carregarPagina();
    carregarDarkMode();
    verificarBackupDiario();
    exibirClientesAlterados();
    window.onscroll();
};

function atualizarDataNoFirebase(cliente) {
    const id = gerarIdFirebase(cliente.nome);

    return firebase.database().ref('clientes/' + id).set({
        vencimento: new Date(cliente.data).toLocaleDateString('pt-BR'),
        telefone: cliente.telefone
    }).then(() => {
        console.log("✅ Cliente atualizado no Firebase:", id);
    }).catch((error) => {
        console.error("❌ Erro ao atualizar cliente no Firebase:", error);
    });
}