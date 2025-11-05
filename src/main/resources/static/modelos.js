const criarTabelaModelo = function(dados) {
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    //cria o cabeçalho da tabela
    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Modelos";
    th.colSpan = 3; //faz a linha ter o tamanho de 3 colunas
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

    const cabecalho = ["Modelo", "Fabricante", "País de Origem"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

    //adiciona classe para estilizar a tabela
    tabela.classList.add("table-dados");

    thead.appendChild(tr);
    tabela.appendChild(thead);

    //cria o corpo da tabela
    dados.forEach(function(item){
        const tr = document.createElement("tr");
        //Modelo
        const tdModelo = document.createElement("td");
        tdModelo.textContent = item.nome;
        tr.appendChild(tdModelo);

        //nome do Fabricante
        const tdFacricante = document.createElement("td");
        tdFacricante.textContent = item.fabricante.nome;
        tr.appendChild(tdFacricante);

        //País de Origem
        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.fabricante.paisOrigem;
        tr.appendChild(tdPaisOrigem);

        tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);

    return tabela;


}