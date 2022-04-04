function change(elemento, grupo){

	let selecionado = document.querySelector("#sessao-"+ grupo +" .selected");

  if (selecionado == null) {

    elemento.classList.add("selected");

  }else{
    
    selecionado.classList.remove("selected");
    elemento.classList.add("selected"); 	

  }

  updateBtn();
}

function updateBtn(){

  let botao = document.querySelector(".barra-inferior .botao");

  if ( document.getElementsByClassName("selected").length >=3 ){

    botao.innerHTML = "Fechar pedido";
    botao.classList.remove("disabled");

  }else{
    botao.classList.add("disabled");
    botao.innerHTML = "Selecione os 3 itens<br> para fechar o pedido";
  }
}

function fechaPedido(botao){

  if( !botao.classList.contains("disabled") ){

    openModalConfirmacao();
  }
}

function openModalConfirmacao(){

    let items = document.getElementsByClassName("selected");
    let valorTotal = 0;
    let mensagem = "";

    /* Percorre todas os pratos selecionados */
    for (var i = 0; i < items.length; i++) {

      valorTotal +=  parseFloat( items.item(i).querySelector(".preco span").innerHTML.replace(',', '.') );
      
      /* Atualiza o modal com informações dos pratos selecionados */
      document.querySelector(".modal-confirma .item-"+ i +" .nome").innerHTML = items.item(i).querySelector(".nome").innerHTML;
      document.querySelector(".modal-confirma .item-"+ i +" .preco").innerHTML = items.item(i).querySelector(".preco span").innerHTML;
    }

    /* Atualiza mensagem para o pedido no whats */
    mensagem = "Olá, gostaria de fazer o pedido: %0a - Prato: "+ items.item(0).querySelector(".nome").innerHTML +"%0a - Bebida: "+ items.item(2).querySelector(".nome").innerHTML +"%0a - Sobremesa: "+ items.item(2).querySelector(".nome").innerHTML +" %0a Total: "+ valorTotal.toFixed(2);


    /* Atualiza valor total no modal */
    document.querySelector(".modal-confirma .total-preco").innerHTML = valorTotal.toFixed(2).replace('.', ',');

    /* Atualiza botão do whats com mensagem */
    document.querySelector(".btn-fechar-pedido").href="https://wa.me/5541992419365?text="+ mensagem;


    /* Abre o modal */
    document.querySelector(".modal-confirma").classList.add("open");

}

function fecharModal(){
  document.querySelector(".modal-confirma").classList.remove("open");
}
