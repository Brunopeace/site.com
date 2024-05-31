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
            const dia = data.getDate();
            let mes = data.getMonth() + 1; // Próximo mês
            let ano = data.getFullYear();

            if (mes > 11) {
                mes = 0;
                ano += 1;
            }

            let dataVencimento = new Date(ano, mes, dia);
            if (dataVencimento.getMonth() !== mes) {
                dataVencimento = new Date(ano, mes + 1, 0);
            }

            return new Date(dataVencimento.getTime() + data.getTimezoneOffset() * 60000);
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

    const btnEditar = criarBotao("Editar", function() {
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
    });
    celulaAcoes.appendChild(btnEditar);

    const btnExcluir = criarBotao("Excluir", function() {
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
    });
    celulaAcoes.appendChild(btnExcluir);

    const btnWhatsapp = criarBotao("WhatsApp", function() {
        const dataVencimentoDestacada = `\`${celulaData.innerText}\``;
        const mensagem = encodeURIComponent(
            `*Olá bom dia, seu plano de canais está vencendo, com data de vencimento dia ${dataVencimentoDestacada}. Caso queira renovar após esta data, favor entrar em contato.* \n \n *PIX EMAIL* \n \n *brunopeaceandlove60@gmail.com*`
        );
        const telefoneCliente = telefone.replace(/\D/g, '');
        abrirWhatsApp(telefoneCliente, mensagem);
    });
    celulaAcoes.appendChild(btnWhatsapp);

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
            document.getElementById('infoClientes').innerText = `Clientes vencidos: ${totalVencidos}\nClientes ativos: ${totalNaoVencidos}`;
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

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
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

            // Adicionar clientes na ordem corretta
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

window.onload = function() {
    carregarPagina();
    carregarDarkMode();
};