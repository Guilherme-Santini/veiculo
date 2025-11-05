async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);                
        }

        const resultado = await response.json();
        return resultado;
    }catch (error){
        return error;
    }
}

function getMaskFormatMoney(valor){
    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        });
    return formatador.format(valor);
}

async function setDelete(url) {
    try {
        const response = await fetch(url, {method: "DELETE"});
        if (response.ok) {
            //throw new Error(`Response status: ${response.status}`);
            return response;
        }
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        return error;
    }
}

async function setPost(url, dados) {
    try {
        const response = await fetch(url, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (response.ok) {
            return response;
        }
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        return error;
    }
    
}