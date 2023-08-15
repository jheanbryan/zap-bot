fetch(`https://viacep.com.br/ws/01001000/json/`)
    .then(response => response.json())
    .then(data => {
    var messageCep;
    if (data.logradouro != ''){
        console.log('tem logradouro')
        messageCep = data.logradouro;
    }
    if(data.complemento != ''){
        console.log('tem complemento')
        messageCep = messageCep + data.complemento;
    }
    if(data.bairro){
        console.log('tem bairro');
        messageCep = messageCep + data.bairro;
    }
    console.log(data)
    console.log(messageCep)
}).catch(error => {
    console.error("Ocorreu um erro:", error);
    console.error("Erro:", error.response);
});