const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

document.getElementById("bt-fabricantes").addEventListener("click", async function(event) {
    setMostrarOcultarElemento(true, ".minha-section");
    // removeTabelaRepetida("table-fabricante");
    setRemoverElementos(".table-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dados = await getData("http://localhost:8080/api/fabricantes");
    if (dados) {
        document.querySelector("#fabricantes").appendChild(criarTabela(dados, "Fabricante", "table-dados"));
    }    
});

CLOSE_MODAL_BUTTON.addEventListener("click", function() {
    MODAL.style.display = "none";
})

document.getElementById("novo-fabricante").addEventListener("click", function(event) {
    setMostrarOcultarElemento(true, ".modal-content");
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
});

document.getElementById("novo-modelo").addEventListener("click", async function (event) {
    setMostrarOcultarElemento(true, ".modal-content");
    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
    if (dadosFabricantes.status === 404 || dadosFabricantes.error) {
        alert("Erro ao carregas dados dos Fabricantes. Erro: " + dadosFabricantes.message);
        return;
    }
    setRemoverElementos("#fabricante-modelo option");

    document.getElementById("fabricante-modelo").appendChild(new Option("Selecione um fabricante", ""));
    dadosFabricantes.forEach(function(fabricante){
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome + " (" + fabricante.paisOrigem + ")";
        document.getElementById("fabricante-modelo").appendChild(option);
    });

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");    
});

document.getElementById("bt-modelos").addEventListener("click", async function(event) {
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
});

document.getElementById("bt-veiculos").addEventListener("click", async function(event) {
    setMostrarOcultarElemento(true, ".minha-section");
    // removeTabelaRepetida("table-veiculos");
    setRemoverElementos(".table-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    if (dadosVeiculos) {
        document.querySelector("#veiculos").appendChild(criarTabelaVeiculos(dadosVeiculos, "Veiculos", "table-dados"));
    }
});

document.getElementById("botao-enviar-fabricante").addEventListener("click", async function(event) {
    event.preventDefault();
    const nome_Fabricante = document.getElementById("nome-fabricante").value.trim();
    console.log(nome_Fabricante)
    const pais_Origem = document.getElementById("pais-fabricante").value;
    const dadosFabricanteJson = {
        "nome": nome_Fabricante,
        "paisOrigem": pais_Origem
    };


    if(!nome_Fabricante || !pais_Origem){
        alert("Preencha todos os campos!");
        return;
    }

    const dadosFabricantes = await setPost("http://localhost:8080/api/fabricantes", dadosFabricanteJson);

    if(dadosFabricantes.status === 201){
        alert("Fabricante adicionado com sucesso!")
    }else {
        alert("Erro ao adicionar o Fabricante DWFWFWED")
    }
});
