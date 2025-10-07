document.getElementById("bt-fabricantes").addEventListener("click", async function(event) {
    setMostrarOcultarElemento(true, ".section");
    removeTabelaRepetida("table-fabricante");
    document.querySelector("#fabricantes").style.display = "block";
    const dados = await getData("http://localhost:8080/api/fabricantes");
    if (dados) {
        document.querySelector("#fabricantes").appendChild(criarTabela(dados, "table-fabricante"));
    }    
});

document.getElementById("bt-modelos").addEventListener("click", async function(event) {
    setMostrarOcultarElemento(true, ".section");
    removeTabelaRepetida("table-modelos");
    document.querySelector("#modelos").style.display = "block";
    const dados = await getData("http://localhost:8080/api/modelos");
    if (dados) {
        document.querySelector("#modelos").appendChild(criarTabela(dados, "table-modelos"));
    }
});

document.getElementById("bt-veiculos").addEventListener("click", async function(event) {
    setMostrarOcultarElemento(true, ".section");
    removeTabelaRepetida("table-veiculos");
    document.querySelector("#veiculos").style.display = "block";
    const dados = await getData("http://localhost:8080/api/veiculos");
    if (dados) {
        document.querySelector("#veiculos").appendChild(criarTabela(dados, "table-veiculos"));
    }
    
});