/*

*/

const criarTabela = function(dados, nome) {
    const tabela = document.createElement("table");
    tabela.className = nome;
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecalho = Object.keys(dados[0]);
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    tabela.appendChild(thead);

    dados.forEach(function(item){
        const tr = document.createElement("tr");
        cabecalho.forEach(function(campo) {
            const td = document.createElement("td");
            td.textContent = item[campo];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
    
    return tabela;
}


/*
Função para mostrar ou ocultar elementos
Parâmetros:
esconter: booleano - true para ocultar, false para mostrar
elemento: string - classe ou id do elemento a ser manipulado
Exemplo de uso:
setMostrarOcultarElemento(true, ".section")
*/
const setMostrarOcultarElemento = function (esconder, elemento) {
    document.querySelectorAll(elemento).forEach(function(section){
        section.style.display = esconder ? "none" : "block";
    });
}

const removeTabelaRepetida = function (className) {
    const tabela = document.getElementsByClassName(className);
    while(tabela.length > 0){
        tabela[0].remove();
    }
}