const criarTabela = function(dados) {

    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecalho = ["Nome", "País de Origem", "Ações"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo) {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Fabricante";
    th.colSpan = cabecalho.length;
    trTittle.appendChild(th);
    thead.appendChild(trTittle);


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
                
        //Coluna de ações com botões editar e excluir
        const tdAcoes = document.createElement("td");
        tdAcoes.style.display = "flex";
        tdAcoes.style.gap = "5px";

        // Botão Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn", "edit");
        btnEditar.style.cursor = "pointer";
        btnEditar.addEventListener("click", async function (event) {
            await abrirModalEdicaoFabricante(item);
        })


        //Botão excluir
        const deletar = document.createElement("button");
        deletar.textContent = "Deletar";
        deletar.classList.add("btn", "delet");
        deletar.addEventListener("click", () => {
            const linha = deletar.parentElement;
            if(deletarFabricante(item, trTittle.textContent, "fabricantes").ok){
                linha.remove();
            }

        });

        tdAcoes.appendChild(btnEditar)
        tdAcoes.appendChild(deletar)
        tr.appendChild(tdAcoes)
        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
    
    return tabela;
}