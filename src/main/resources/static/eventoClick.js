const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

/**
 * Cria e exibe a tabela de fabricantes na interface do usuário.
 *
 * Esta função é assíncrona e tem como objetivo buscar os dados de fabricantes 
 * a partir de uma API e renderizá-los dinamicamente em uma tabela na página.
 * 
 * O processo inclui:
 * 1. Exibir a seção onde a tabela será inserida.
 * 2. Remover elementos de tabelas anteriores (caso existam) para evitar duplicação.
 * 3. Fazer uma requisição à API de fabricantes.
 * 4. Criar e inserir dinamicamente uma nova tabela com os dados recebidos.
 *
 * @async
 * @function criarFabricante
 *
 * @returns {Promise<void>} Retorna uma Promise que é resolvida após a tabela ser criada e exibida.
 *
 * @example
 * // Exemplo de uso:
 * await criarFabricante();
 *
 * // Após a execução, a tabela de fabricantes será exibida dentro do elemento #fabricantes.
 *
 * @throws {Error} Pode lançar erros caso a requisição à API falhe ou se os elementos do DOM não forem encontrados.
 *
 * @requires getData
 * @requires criarTabela
 * @requires setMostrarOcultarElemento
 * @requires setRemoverElementos
 *
 * @see getData() Função responsável por buscar dados da API.
 * @see criarTabela() Função responsável por criar dinamicamente a tabela HTML.
 * @see setMostrarOcultarElemento() Função que controla a visibilidade de elementos.
 * @see setRemoverElementos() Função que remove elementos do DOM com base em um seletor CSS.
 */
async function criarFabricante() {
    setMostrarOcultarElemento(true, ".minha-section");
    // removeTabelaRepetida("table-fabricante");
    setRemoverElementos(".table-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dados = await getData("http://localhost:8080/api/fabricantes");
    if (dados) {
        document.querySelector("#fabricantes").appendChild(criarTabela(dados, "Fabricantes", "table-dados"));
    }
}

//click botão header fabricante
document.getElementById("bt-fabricantes").addEventListener("click", criarFabricante);

//Botão click novo fabricante
document.getElementById("novo-fabricante").addEventListener("click", async function (event) {
    setMostrarOcultarElemento(true, ".modal-content");

    //carregar json com nomes de paises do arquivo externo json
    const dadosPaises = await getData("http://localhost:8080/paises.json");
    const selectPais = document.getElementById("pais-fabricante");
    setRemoverElementos("#pais-fabricante option");


    dadosPaises.forEach(function (pais) {
        const option = document.createElement("option");
        option.value = pais.nome_pais;
        option.textContent = pais.nome_pais + " (" + pais.sigla + ")";
        selectPais.appendChild(option);
    });

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
});

//evento de click para salvar novo fabricante
document.getElementById("botao-enviar-fabricante").addEventListener("click", async function (event) {
    event.preventDefault();
    const nome_Fabricante = document.getElementById("nome-fabricante").value.trim();
    console.log(nome_Fabricante)
    const pais_Origem = document.getElementById("pais-fabricante").value;
    const dadosFabricanteJson = {
        "nome": nome_Fabricante,
        "paisOrigem": pais_Origem
    };

    if (!nome_Fabricante || !pais_Origem) {
        alert("Preencha todos os campos!");
        return;
    }

    const dadosFabricantes = await setPost("http://localhost:8080/api/fabricantes", dadosFabricanteJson);
    if (dadosFabricantes.status === 201) {
        alert("Fabricante adicionado com sucesso!")
        document.getElementById("nome-fabricante").value = "";
        document.getElementById("pais-fabricante").value = "";
        MODAL.style.display = "none";

        criarFabricante()

    } else {
        alert("Erro ao adicionar o Fabricante")
    }
});

//função deletar fabricante/modelo/veículo

const deletarFabricante = async (item, tableTittle, endPoint) => {

    const confirmacao = confirm("Deseja excluir o "+ tableTittle + " " + item.nome + "?");

    if (!confirmacao) return;

    try {
        const resultado = await setDelete(`http://localhost:8080/api/${endPoint}/${item.id}`);

        if (resultado.status === 204) {
            if (endPoint == "fabricantes") {
                criarFabricante()    
            } 
            if (endPoint == "modelos"){
                criarModelo()
            }
            return resultado;
        }

        

    } catch (error) {
        console.error("Erro ao deletar " + item.nome + ". Erro: "+ error)
    }

}


//MODELOS

//Funções mostra a tabela modelo
async function criarModelo() {
    setMostrarOcultarElemento(true, ".minha-section");
    // removeTabelaRepetida("table-modelos");
    setRemoverElementos(".table-dados");
    document.querySelector("#modelos").style.display = "block";
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    if (dadosModelos.ok === false) {
        document.querySelector("#modelos").innerHTML = `<p>Erro ao Carregar Dados do Modelo.<p>`;
        document.querySelector("#modelos").style.color = "red";

        return;
    }
    document.querySelector("#modelos").appendChild(criarTabelaModelo(dadosModelos, "Modelos", "table-dados"))
}

//click botão header modelo
document.getElementById("bt-modelos").addEventListener("click", criarModelo);


//Botão click novo modelo
document.getElementById("novo-modelo").addEventListener("click", async function (event) {
    setMostrarOcultarElemento(true, ".modal-content");
    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
    if (dadosFabricantes.status === 404 || dadosFabricantes.error) {
        alert("Erro ao carregas dados dos Fabricantes. Erro: " + dadosFabricantes.message);
        return;
    }
    setRemoverElementos("#fabricante-modelo option");

    document.getElementById("fabricante-modelo").appendChild(new Option("Selecione um fabricante", ""));
    dadosFabricantes.forEach(function (fabricante) {
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome + " (" + fabricante.paisOrigem + ")";
        document.getElementById("fabricante-modelo").appendChild(option);
    });

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");
});

//evento de click para salvar novo modelo
document.getElementById("botao-enviar-modelo").addEventListener("click", async function (event) {
    event.preventDefault();
    const nome_Modelo = document.getElementById("nome-modelo").value.trim();
    const fabricante_Modelo = document.getElementById("fabricante-modelo").value.trim();
    const dadosModeloJson = {
        "nome" : nome_Modelo,
        "fabricante":{
            "id": fabricante_Modelo,
        }
    };

    if (!nome_Modelo || !fabricante_Modelo) {
        alert("Preencha todos os campos!");
        return;
    }

    const dadosModelos = await setPost("http://localhost:8080/api/modelos", dadosModeloJson);
    if (dadosModelos.status === 201) {
        alert("Fabricante adicionado com sucesso!")
        document.getElementById("nome-modelo").value = "";
        document.getElementById("fabricante-modelo").value = "";
        MODAL.style.display = "none";

        criarModelo()

    } else {
        alert("Erro ao adicionar o Modelo")
    }
});


CLOSE_MODAL_BUTTON.addEventListener("click", function () {
    MODAL.style.display = "none";
});