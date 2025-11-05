const criarTabelaVeiculos = function(dados) {
    
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Veículo";
    th.colSpan = 9;
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

    const cabecalho = ["Modelo", "Fabricante", "País de Origem", "Ano", "Cor", "Descrição", "Valor" ,"Placa","Deletar"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

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
        tdPlaca.textContent = item.placa.substring(0, 3) + "**" + item.placa.substring(5, 7)
        tr.appendChild(tdPlaca);

        const deletar = document.createElement("td");
        deletar.innerHTML = '<button class="btn">Deletar</button>';
        deletar.addEventListener("click", async function () {
            const resultado = await setDelete(`http://localhost:8080/api/veiculos/${item.id}`);

            if (resultado.status === 204) {
                this.parentElement.remove();
            } else {
                alert("Erro ao deletar modelo")
            }
        });

        tr.appendChild(deletar)

        tbody.appendChild(tr);



    });

    tabela.appendChild(tbody);

    return tabela;


    //dados[0].placa.substring(0, 2) + "***" + dados[0].placa.substring(7, 5)


}