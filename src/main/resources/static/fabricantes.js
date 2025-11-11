const criarTabela = function(dados) {

    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecalho = ["Nome", "País de Origem", "Deletar"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

    const trTitle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Fabricante";
    th.colSpan = cabecalho.length;
    trTitle.appendChild(th);
    thead.appendChild(trTitle);


    tabela.classList.add("table-dados");

    thead.appendChild(tr);
    tabela.appendChild(thead);

    dados.forEach(function(item){
        const tr = document.createElement("tr");
        
        //nome do Fabricante
        const tdFacricante = document.createElement("td");
        tdFacricante.textContent = item.nome;
        tr.appendChild(tdFacricante);

        //País de Origem
        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.paisOrigem;
        tr.appendChild(tdPaisOrigem);

        const deletar = document.createElement("td");
        deletar.innerHTML = '<button class="btn">Deletar</button>';
        deletar.addEventListener("click", async function () {
            const resultado = await setDelete(`http://localhost:8080/api/fabricantes/${item.id}`);

            if (resultado.status === 204) {
                this.parentElement.remove();
            } else {
                alert("Erro ao deletar fabricante")
            }
        });

        tr.appendChild(deletar)

        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
    
    return tabela;
}