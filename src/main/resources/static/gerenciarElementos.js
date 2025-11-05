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

const setRemoverElementos = function(seletor) {
    document.querySelectorAll(seletor).forEach(function(elemento) {
        elemento.remove();
    })
}

/*const removeTabelaRepetida = function (className) {
    const elementClass = document.getElementsByClassName(className);
    while(elementClass.length > 0){
        elementClass[0].remove();
    }
}*/