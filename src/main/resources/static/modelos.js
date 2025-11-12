const criarTabelaModelo = function(dados) {
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecalho = ["Nome", "Fabricante", "País de Origem", "Deletar"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

    //cria o cabeçalho da tabela
    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Modelos";
    th.colSpan = cabecalho.length; //faz a linha ter o tamanho de cabeçalho
    trTittle.appendChild(th);
    thead.appendChild(trTittle);


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

        const deletar = document.createElement("td");
        deletar.innerHTML = '<button class="btn">Deletar</button>';
        deletar.addEventListener("click", () => {
            const linha = deletar.parentElement;
            if(deletarFabricante(item, trTittle.textContent).ok){
                linha.remove();
            }

        });

        tr.appendChild(deletar)

        tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);

    return tabela;


}