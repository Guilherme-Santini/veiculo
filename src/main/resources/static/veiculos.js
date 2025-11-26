const criarTabelaVeiculos = function(dados) {
    
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecalho = ["Modelo", "Fabricante", "País de Origem", "Ano", "Cor", "Descrição", "Valor" ,"Placa","Deletar"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Veículo";
    th.colSpan = cabecalho.length;
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

    tabela.classList.add("table-dados");

    thead.appendChild(tr);
    tabela.appendChild(thead);

    dados.forEach(function(item) {
        const tr = document.createElement("tr")

        //Modelo
        const tdModelo = document.createElement("td");
        tdModelo.textContent = item.modelo.nome;
        tr.appendChild(tdModelo);

        //nome do Fabricante
        const tdFacricante = document.createElement("td");
        tdFacricante.textContent = item.modelo.fabricante.nome;
        tr.appendChild(tdFacricante);

        //País de Origem
        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.modelo.fabricante.paisOrigem;
        tr.appendChild(tdPaisOrigem);

        //Ano
        const tdAno = document.createElement("td");
        tdAno.textContent = item.ano;
        tr.appendChild(tdAno);

        //Cor
        const tdCor = document.createElement("td");
        tdCor.textContent = item.cor;
        tr.appendChild(tdCor);

        //Descrição
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = item.descricao;
        tr.appendChild(tdDescricao);

        //Valor
        const tdValor = document.createElement("td");
        tdValor.textContent = getMaskFormatMoney(item.valor);
        tr.appendChild(tdValor);

        //Placa
        const tdPlaca = document.createElement("td");
        tdPlaca.textContent = item.placa.substring(0, 3) + "**" + item.placa.substring(5, 7);
        tr.appendChild(tdPlaca);

        const tddeletar = document.createElement("td");
        tddeletar.innerHTML = '<button class="btn">Deletar</button>';
        tddeletar.addEventListener("click", async function () {
            if (confirm("Tem certeza que deseja excluir este veículo?")) {
                const resultado = await setDelete(`http://localhost:8080/api/veiculos/${item.id}`);

                if (resultado.ok === true) {
                    this.parentElement.remove();
                    alert("Veículo excluído com sucesso!")
                } else {
                    mostrarErro(resultado);
                }
            }
        });

        tr.appendChild(tddeletar)

        tbody.appendChild(tr);

    });

    tabela.appendChild(tbody);
    return tabela;
}

/**
 * CARREGA OS FABRICANTES DISPONÍVEIS NO SELECT DO FORMULÁRIO DE VEÍCULO
 */
const carregarFabricantesVeiculo = async function () {
    const selectFabricante = document.getElementById("fabricante-veiculo");
    const selectModelo = document.getElementById("modelo-veiculo");
    
    setRemoverElementos("#fabricante-veiculo option")
    setRemoverElementos("#modelo-veiculo option")

    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes")

    // Adiciona opção padrão
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione um fabricante";
    selectFabricante.appendChild(optionPadrao);

    // adiciona os fabricantes
    dadosFabricantes.forEach(function(fabricante) {
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome;
        selectFabricante.appendChild(option);
    });

    // Inicializa o select de modelo congelado
    const optionModeloPadrao = document.createElement("option");
    optionModeloPadrao.value = "";
    optionModeloPadrao.textContent = "Selecione um fabricante primeiro";
    selectModelo.appendChild(optionModeloPadrao);
    selectModelo.disabled = true; // Congela o select até selecionar um fabricante
}

/**
 * Carrega os modelos disponíveis no select baseado no fabricante selecionado
 */

const carregarModelosVeiculo = async function (fabricanteId) {
    const selectModelo = document.getElementById("modelo-veiculo");
    setRemoverElementos("#modelo-veiculo option");

    //se não selecionou fabricante, congela o select
    if (!fabricanteId) {
        const optionPadrao = document.createElement("option");
        optionPadrao.value = "";
        optionPadrao.textContent = "Selecione um fabricante primeiro";
        selectModelo.appendChild(optionPadrao);
        selectModelo.disabled = true; // congela o select
        return;
    }

    // busca e filtra os modelos
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    const modelosFiltrados = dadosModelos.filter(function(modelo){
        return modelo.fabricante.id == fabricanteId;
    });

    // Se não existem modelos para o fabricante, congela o select
    if (modelosFiltrados.length === 0) {
        const optionSemModelo = document.createElement("option");
        optionSemModelo.value = "";
        optionSemModelo.textContent = "Nenhum modelo para esse fabricante";
        selectModelo.appendChild(optionSemModelo);
        selectModelo.disabled = true; // congela o select
        return;
    }

    // habilita o select e adidciona a opção padrão
    selectModelo.disabled = false; // descongela o select
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione um modelo";
    selectModelo.appendChild(optionPadrao);

    // adiciona os modelos filtrados
    modelosFiltrados.forEach(function(modelo){
        const option = document.createElement("option");
        option.value = modelo.id;
        option.textContent = modelo.nome;
        selectModelo.appendChild(option);
    });
}

/**
 * atualiza a tabela de veículos na página
 * remove a tabela existente e cria uma nova com os dados atualizados
 */

const atualizarTabelaVeiculos = async function () {
    setRemoverElementos(".table-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculos(dadosVeiculos));
}


/**
 * valida o formato de placa do veículo
 */

const validarPlaca = function(placa) {

    if(placa === undefined && placa === null && placa === ""){
        return{valido: false,
        mensagem: "Deve conter uma placa"
        }
    }

    // remove espaços em branco e hífens
    placa = placa.trim().toUpperCase().replace(/-/g, '');

    //formato antigo: ABC1234 (3 letras + 4 números)
    const padraoAntigo = /^[A-Z]{3}[0-9]{4}/;

    //FORMATO MERCOSUL: ABC1D23 (3 LETRAS + 1 NÚMERO + 1 LETRA + 2 NÚMEROS)
    const padraoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if (padraoAntigo.test(placa) || padraoMercosul.test(placa)) {
        return {valido: true, mensagem: "" };
    }

    return {
        valido: false,
        mensagem: "Placa inválida. Use o formato ABC1234 (antigo) ou ABC1D23 (Mercosul)."
    };
}

/**
 * valida os dados do formulário do veículo
 * verifica se todos os campos obrigatórios foram preenchidos e se os valores estão dentro dos limites esperados
 */

const validarVeiculo = function(veiculo) {
    const anoAtual = new Date().getFullYear();
    const selectModelo = document.getElementById("modelo-veiculo");
    const selectFabricante = document.getElementById("fabricante-veiculo");

    //verifica se selecionou fabricante
    if (!selectFabricante.value) {
        return { valido: false, mensagem: "Por favor, selecione um fabricante"};
    }

    //verifica se o select do modelo está desabilitado
    if (selectModelo.disabled) {
        return { valido: false, mensagem: "Não há modelos disponíveis para o fabricante selecionado. Por favor, cadastre um modelo primeiro."};
    }

    //verifica se selecionou um modelo
    if (!veiculo.modelo || !veiculo.modelo.id) {
        return { valido: false, mensagem: "Por favor, selecione um modelo."};
    }

    //verifica o ano do veículo
    if (!veiculo.ano || veiculo.ano < 1900 || veiculo.ano > anoAtual + 1) {
        return { valido: false, mensagem: `O ano deve estar entre 1900 e ${anoAtual + 1}.`};
    }

    //verifica a placa do veículo
    if (!veiculo.placa || veiculo.placa.trim() === "") {
        return { valido: false, mensagem: "Por favor, informe a placa do veículo."};
    }

    const validacaoPlaca = validarPlaca(veiculo.placa);
    if (!validacaoPlaca.valido) {
        return { valido: false, mensagem: validacaoPlaca.mensagem};
    }

    //verifica a cor do veículo
    if (!veiculo.cor || veiculo.cor.trim() === "") {
        return { valido: false, mensagem: "Por favor, informe a cor do veículo."};
    }

    // verifica valor (aceita tanto 'preco' quanto 'valor' por compatibilidade)
    const valorVeiculo = veiculo.valor || veiculo.preco;
    if (!valorVeiculo || valorVeiculo <= 0) {
        return { valido: false, mensagem: "O preço deve ser maior que zero"};
    }

    return { valido: true, mensagem: ""};
}

/**
 * limpa todos os campos do formulário de veículo
 */
const limparFormularioVeiculo = function() {
    document.getElementById("fabricante-veiculo").value = "";
    document.getElementById("modelo-veiculo").value = "";
    document.getElementById("ano-veiculo").value = "";
    document.getElementById("placa-veiculo").value = "";
    document.getElementById("cor-veiculo").value = "";
    document.getElementById("descricao-veiculo").value = "";
    document.getElementById("valor-veiculo").value = "";
}

// =================================================================
// INICIALIZAÇÃO DOS EVENTOS DE VEÍCULOS
// =================================================================

/**
 * Inicializa todos os eventos de click relacionados a veículos
 * 
 * Esta função centraliza todos os event listeners dos botões e formulários
 * relacionados ao módulo de veículos, mantendo o código organizado
 * 
 * Eventos configurados:
 * - click no botão "veiculos" do menu (bt"veiculos)
 * - click no botão "novo veiculo" (novo-veiculo)
 * - change no select de fabricante do formulário
 * - input no campo de placa (formatação)
 * - blur no campo de placa (verificação de duplicidade)
 * - submit do formulário de veículo
 */
const inicializarEventosVeiculos = function() {

    // =============================================
    // Evento de click no menu "Veículos"
    // =============================================
    document.getElementById("bt-veiculos").addEventListener("click", async function (event) {
        setMostrarOcultarElemento(true, ".minha-section");
        setRemoverElementos(".table-dados");
        document.querySelector("#veiculos").style.display = "block";

        // carrega e exibe a tabela de veiculos
        const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
        if (dadosVeiculos.ok === false) {
            document.querySelector("#veiculos").innerHTML = "<p>Erro ao carregar dados dos veículos.</p>";
            document.querySelector("#veiculos").style.color = "red";
            return;
        }
        document.querySelector("#veiculos").appendChild(criarTabelaVeiculos(dadosVeiculos));
    });

    // =============================================
    // Evento de click no menu "Novo Veículo"
    // =============================================
    document.getElementById("novo-veiculo").addEventListener("click", async function (event) {
        setMostrarOcultarElemento(true, ".modal-content");

        //Carrega os fabricantes para o select de veículos
        await carregarFabricantesVeiculo();

        MODAL.style.display = "block";
        setMostrarOcultarElemento(false, ".modal-content-veiculo");
    });

    // =============================================
    // Evento: mudança do select do fabricante
    // =============================================
    document.getElementById("fabricante-veiculo").addEventListener("change", async function (event) {
        const fabricanteId = event.target.value;
        await carregarModelosVeiculo(fabricanteId);
    });

    // =============================================
    // Evento: formatação automática da placa
    // =============================================
    document.getElementById("placa-veiculo").addEventListener("input", function(event) {
        let valor = event.target.value.toUpperCase();

        // Remove caracteres não permitidos (mantém apenas letras e números)
        valor = valor.replace(/[^A-z0-9]/g, '');

        // Limita o tamanho em 7 caracteres (formato Mercosul ou antigo sem hífen)
        if (valor.length > 7) {
            valor = valor.substring(0, 7);
        }

        event.target.value = valor;
    });

    // =============================================
    // Evento: verificação de placa duplicada ao sair do campo
    // =============================================
    document.getElementById("placa-veiculo").addEventListener("blur", async function (event) {
        const placa = event.target.value.trim().toUpperCase().replace(/-/g, '');

        //só verifica se a placa tem formato válido
        if (placa.length >= 7) {
            const validacao = validarPlaca(placa);
            if (validacao.valido) {
                const existe = await getData(`http://localhost:8080/api/veiculos/existe/${placa}`);
                if (existe) {
                    event.target.style.borderColor = "red";
                    event.target.style.backgroundColor = "#ffe6e6";
                    alert(`Atenção!\n\nA Placa ${placa} já está cadastrada no sistema.\n\nPor favor, verifique se o veículo já existe antes de continuar`);
                } else {
                    event.target.style.borderColor = "";
                    event.target.style.backgroundColor = "";
                }
            }
        }
        
    });

    // =============================================
    // Evento: submissão do formulário de veículo
    // =============================================
    document.querySelector("#form-veiculo .botao-enviar").addEventListener("click", async function (event) {
        event.preventDefault();

        const modeloId = document.getElementById("modelo-veiculo").value;
        const ano = parseInt(document.getElementById("ano-veiculo").value);
        //Remove híden e espaços, converte para maiúsculas
        const placa = document.getElementById("placa-veiculo").value.trim().toUpperCase().replace(/-/g, '');
        const cor = document.getElementById("cor-veiculo").value.trim();
        const valor = parseFloat(document.getElementById("valor-veiculo").value);

        //cria o objeto veículo conforme o DTO do backend
        const novoVeiculo = {
            placa,
            cor,
            ano,
            valor,
            modelo: { id: modeloId}
        };

        // Valida os dados
        const validacao = validarVeiculo(novoVeiculo);
        if (!validacao.valido) {
            alert(validacao.mensagem);
            return;
        }
        
        // Envia para a API
        const resultado = await setPost("http://localhost:8080/api/veiculos", novoVeiculo);

        if (isSuccess(resultado)) {
            alert("Veículo cadastrado com sucesso!");
            limparFormularioVeiculo();
            MODAL.style.display = "none";
            await atualizarTabelaVeiculos();
        } else {
            //log do erro para debug
            console.error("Erro ao cadastrar veículo", resultado);

            // Tratamento específico para conflito
            if (resultado.status === 409) {
                //verifica se a mensagem menciona placa
                const mensagemBackend = resultado.mensagem || "";
                if (mensagemBackend.toLoweCase().includes("placa")) {
                    alert(`Placa Duplicada!\n\nA placa ${placa} já está cadastrada no sistema.\n\nVerifique se o veículo já existe ou se digitou a placa corretamente.`);
                } else {
                    //Pode ser outro tipo de conflito (ex: mesmo fabricante+modelo+ano)
                    alert(`Registro Duplicado!\n\n${mensagemBackend}\n\nEste veículo (ou uma combinação similar) já existe no sistema.\n\nVerifique os dados informados.`);
                }
                
            }else {
                mostrarErro(resultado);
            }
        }
    });

}

// ==========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ==========================================
//EXECUTA A INICIALIZAÇÃO QUANDO O DOM ESTIVER ESTIVER CARREGADO
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarEventosVeiculos);
} else {
    // DOM já está carregado
    inicializarEventosVeiculos();
}
