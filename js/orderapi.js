let carrinho = [];
const api = axios.create({
  baseURL: "https://api-e-comerce.up.railway.app/",
});

const addPedidos = () => {
  const select = document.getElementById("produtos");
  const tamanho = select.value;
  const pedidos = {
    tamanho: tamanho,
  };

  carrinho.push(pedidos);
};

async function getProdutos() {
  try {
    const response = await api.get("produtos");
    const dados = response.data;
    const select = document.getElementById("produtos");
    let idOptions = 0
    dados.forEach((itens) => {
      const option = document.createElement("option");
      option.className = "optionList";
      option.value = itens.id; //TESTE ENVIO API
      option.name = itens.medidas;
      option.id = idOptions++
      option.setAttribute("name", itens.medidas);
      option.setAttribute("data-preco", itens.preco);
      option.setAttribute("data-nome", itens.nome_produto);
      option.textContent =
        itens.nome_produto + " - " + itens.medidas + " / R$: " + itens.preco;
      select.appendChild(option);
      return option;
    });
  } catch (err) {
    console.log("FALHO ERRO ->", err);
  }
}

async function getFrutas() {
  try {
    const containerFrutas = document.getElementById("checkFrutas");
    containerFrutas.className = "form-check d-flex flex-column";
    const frutas = await api.get("frutas");
    const dados = frutas.data;
    let idFrutas = 0
    dados.forEach((frutas) => {
      const checkBox = document.createElement("input");
      const labelFrutas = document.createElement("label");
      labelFrutas.className = "form-check-label labelCheck";
      labelFrutas.textContent = frutas.frutas;
      checkBox.type = "checkbox";
      checkBox.value = frutas.id; //TESTE ENVIO API
      checkBox.id = idFrutas ++;
      checkBox.setAttribute("data-nome", frutas.frutas);
      checkBox.name = "frutas";
      checkBox.setAttribute("data-nome", frutas.frutas);
      checkBox.className = "form-check-input border border-primary";
      containerFrutas.appendChild(checkBox);
      containerFrutas.appendChild(labelFrutas);
    });
  } catch (error) {
    console.log("FLHOU EM OBTER FRUTAS", error);
  }
}

async function getIngredientes() {
  try {
    const complementos = document.getElementById("checkComplementos");
    complementos.className = "form-check d-flex flex-column-reverse";
    const response = await api.get("ingredientes");
    const dados = response.data;
    dados.forEach((complemento) => {
      const checkbox = document.createElement("input");
      const label = document.createElement("label");
      label.textContent = complemento.ingrediente;
      checkbox.className = "form-check-input border border-primary";
      label.className = "form-check-label labelComplementos";
      checkbox.value = complemento.id; //TESTE ENVIO API
      checkbox.type = "checkbox";
      checkbox.name = "complementos";
      checkbox.setAttribute("data-nome", complemento.ingrediente);
      checkbox.id = complemento.id;
      complementos.appendChild(checkbox);
      complementos.appendChild(label);
    });
  } catch (error) {
    console.log("FALHOU EM OBTER INGREDIENTES", error);
  }
}

async function getCoberturas() {
  try {
    const response = await api.get("coberturas");
    const dados = response.data;
    const cobertura = document.getElementById("checkCoberturas");
    cobertura.className = "form-check d-flex flex-column";
    dados.forEach((coberturas) => {
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        label.textContent = coberturas.cobertura;
        checkbox.className = "form-check-input coberturasCheckAll border border-primary";
        label.className = "form-check-label labelCobertura";
        checkbox.value = coberturas.id; //TESTE ENVIO API
        checkbox.setAttribute("data-nome", coberturas.cobertura);
        checkbox.type = "checkbox";
        checkbox.name = "coberturas";
        checkbox.id = coberturas.id;
        cobertura.appendChild(checkbox);
        cobertura.appendChild(label);
    });
  } catch (error) {
    console.log("FALHOU EM OBTER COBERTURAS", error);
  }
}

let complementosFront = [];
let frutasFront = []
let coberturasFront;
let valorFront;
let medida;
let valor;
let coberturas = [];
let frutas = [];
let complementos = [];
let totalPrice = 0;
let idItem = 0;
const form = document.getElementById("personalizarForm");
const select = document.getElementById("produtos");
const aviso = document.getElementById("avisoCoberturas");
const avisoFrutas = document.getElementById("avisoFrutas");
const checkCoberturas = document.getElementById("checkCoberturas");
const checkFrutas = document.getElementById("checkFrutas");
const checkComplementos = document.getElementById("checkComplementos");
const showItens = document.getElementById("itemsList");
const cardTotal = document.getElementById("cartTotal");
//variaveis usadas na função
function addCarrinho() {

  select.addEventListener("change", (e) => {
    e.preventDefault();
    const selectOptions = e.target.options[e.target.selectedIndex];
    valorFront = selectOptions.dataset.preco
    nome_produtos = selectOptions.getAttribute("data-nome");
    boxValue = document.querySelectorAll(".box-value");

    if (nome_produtos === "Açaí de Garrafinha") {
      const avisoGarrafinha = document.getElementById("avisoGarrafinha");
      avisoGarrafinha.innerText = "Este item é feito com banana e leite condensado";
      avisoGarrafinha.style.display = "block";
      boxValue.forEach(remove => {
        remove.classList.add("d-none");
      })
    }else {
      const avisoGarrafinha = document.getElementById("avisoGarrafinha");
      avisoGarrafinha.style.display = "none";
      boxValue.forEach( add => {
        add.classList.remove("d-none");
      })
    }
    
    valor = selectOptions.value;
    medida = selectOptions.name;

    
  });

  checkCoberturas.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.checked) {
      coberturasFront= e.target.dataset.nome
      coberturas.push(e.target.value);
    } else {
      const index = coberturas.indexOf(e.target.value);
      
      if (index  > -1) {
        coberturas.splice(index, 1) 
      }
     
    }

    if (coberturas.length > 1) {
      aviso.classList.remove("d-none");
      aviso.innerText = "Selecione apenas uma cobertura.";
    } else {
      aviso.classList.add("d-none");
    }
  });

  
  checkFrutas.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.checked) {
      frutasFront.push(e.target.dataset.nome)
      frutas.push(e.target.value);
    } else {
      const index = frutas.indexOf(e.target.value);
      if (index > -1) {
        frutasFront.splice(index, 1);
        frutas.splice(index, 1);
      }
    }

    if (frutas.length > 2) {
      avisoFrutas.classList.remove("d-none");
      avisoFrutas.innerText = "Podem ser selecionados apenas 2 frutas.";
    } else {
      avisoFrutas.classList.add("d-none");
    }
  });

  checkComplementos.addEventListener("change", (e) => {
    
    if (e.target.checked) {
      complementos.push(e.target.value);
      complementosFront.push(e.target.dataset.nome)
    } else {
      const index = complementos.indexOf(e.target.value);
      if (index  > -1) {
        complementos.splice(index, 1);
        complementosFront.splice(index, 1)
        
        
        
      }
    }
  });

  

  showItens.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      // Identificar o botão clicado e o índice correspondente
      const buttons = Array.from(showItens.querySelectorAll('button'));
      const index = buttons.indexOf(e.target);
  
      // Remover o item do sessionStorage
      let produtos = JSON.parse(sessionStorage.getItem('carrinho')) || [];
      produtos.splice(index, 1);
      sessionStorage.setItem('carrinho', JSON.stringify(produtos));
  
      // Atualizar o DOM com os itens restantes
      atualizarCarrinho(produtos);
    }
  });
  
  // Função para atualizar o carrinho no DOM
  function atualizarCarrinho(produtos) {
    showItens.innerHTML = ''; // Limpar o conteúdo atual do carrinho
  
    produtos.forEach((itens, id) => {
      const orderCard = document.createElement('div');
      orderCard.className = 'd-flex flex-column order';
      orderCard.id = id;
      orderCard.innerHTML = `
        <div class="cart-item mb-3 p-3 shadow border rounded orderCards" id="orderCards">
          <h6>Açaí ${itens.medida}</h6>
          <p class="mb-1"><small>Coberturas: ${
            itens.coberturasFront || "Nenhuma"
          }</small></p>
          <p class="mb-1"><small>Frutas: ${
            itens.frutasFront.join(" / ") || "Nenhuma"
          }</small></p>
          <p class="mb-1"><small>Complementos: ${
            itens.complementosFront.join(" / ") || "Nenhum"
          }</small></p>
          <div class="d-flex justify-content-between align-items-center">
            <span>R$ ${itens.precoFront}</span>
            <button class="btn btn-sm btn-danger" id="btnRemover">Remover</button>
          </div>
        </div>
      `;
      showItens.appendChild(orderCard);
    });
  
    // Atualizar o valor total
    const totalPrice = produtos
      .map((itens) => +itens.precoFront)
      .reduce((acc, produto) => acc + produto, 0);
    document.getElementById('cartTotal').innerText = totalPrice;
  }

  showItens.addEventListener('change',() => {
    document.getElementById('cartTotal').innerText = totalPrice - totalPrice
    
  } )
}

function addForm(e){
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const frutasSelecionadas = [];
    document.querySelectorAll('input[name="frutas"]:checked').forEach((checkbox) => {
      frutasSelecionadas.push(parseInt(checkbox.value));  // Adiciona o ID da fruta
    });

    const coberturasSelecionadas = [];
    document.querySelectorAll('input[name="coberturas"]:checked').forEach( (checkbox)=> {
      coberturasSelecionadas.push(parseInt(checkbox.value));  // Adiciona o ID da cobertura
    }) 

    const complementosSelecionadas = [];
    document.querySelectorAll('input[name="complementos"]:checked').forEach( (checkbox)=> {
     complementosSelecionadas.push(parseInt(checkbox.value));  // Adiciona o ID da cobertura
    })
        
    //Criação do carrinho para enviar para SessionStorage
    let carrinho = {
      frutasFront: frutasFront,
      complementosFront: complementosFront,
      coberturasFront: coberturasFront,
      precoFront: valorFront,
      preco: valor,
      medida: medida,
      coberturas: coberturasSelecionadas,
      frutas: frutasSelecionadas,
      ingredientes: complementosSelecionadas,
    };


    //Transforma em arquivo Json
    let carrinhoList = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    carrinhoList.push(carrinho);


    sessionStorage.setItem('carrinho', JSON.stringify(carrinhoList));
    
    //Calcular e inserir o valor total no card
    totalPrice = cardTotal.innerText = carrinhoList.map(itens => +itens.precoFront).reduce((acc, currentValue)=> acc + currentValue, 0)
    

   

    const compras = JSON.parse(sessionStorage.getItem('carrinho'))
    
    //Montando os pedido para mostrar no frontend para o cliente
    showItens.innerHTML = ''
    compras.forEach((itens) => {
      const orderCard = document.createElement('div')
      orderCard.className = 'd-flex flex-column order'
      orderCard.id = idItem += 1
      orderCard.innerHTML = `
               <div class="cart-item mb-3 p-3 shadow border rounded orderCards" id="orderCards">
            <h6>Açaí ${itens.medida}</h6>
            <p class="mb-1"><small>Coberturas: ${
              itens.coberturasFront || "Nenhuma"
            }</small></p>
            <p class="mb-1"><small>Frutas: ${
              itens.frutasFront.join(" / ") || "Nenhuma"
            }</small></p>
            <p class="mb-1"><small>Complementos: ${
              itens.complementosFront.join(" / ") || "Nenhum"
            }</small></p>
            <div class="d-flex justify-content-between align-items-center">
                <span>R$ ${itens.precoFront}</span>
                <button class="btn btn-sm btn-danger" id="btnRemover">Remover</button>
            </div>
        </div>
         `;
      showItens.appendChild(orderCard);
    });
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    checkboxes.forEach((checkbox)=> {
      checkbox.checked = false;
    })
    
    coberturas = [];
    aviso.classList.add('d-none')

    frutas = []
    avisoFrutas.classList.add('d-none')

    complementos = []

    complementosFront = []
    
    frutasFront = []

    precoFront = []
   
  });
  
}

function selectGarrafa() {
  select.addEventListener('change', (e) => {
    const options = e.target.options[e.target.selectedIndex];
    const produtoNome = options.getAttribute('data-nome'); // Obtém o nome do produto do atributo data-nome

    const removeCheckbox = document.querySelectorAll('.box-value');
    const avisoGarrafinha = document.getElementById('avisoGarrafinha');

    if (produtoNome === 'garrafinha de açaí') {
      // Ocultar os campos de ingredientes, caldas e frutas
      removeCheckbox.forEach((remover) => {
        remover.classList.add('d-none');
      });

      // Exibir a mensagem
      avisoGarrafinha.innerText = "Este item é feito com banana e leite condensado";
      avisoGarrafinha.style.display = "block";
    } else {
      // Mostrar os campos novamente
      removeCheckbox.forEach((remover) => {
        remover.classList.remove('d-none');
      });

      // Ocultar a mensagem
      avisoGarrafinha.style.display = "none";
    }
  });
}

  



//CHAMANDO AS FUNÇÕES

addForm()
addCarrinho();
getCoberturas();
getProdutos();
getFrutas();
getIngredientes();


document.addEventListener("DOMContentLoaded", () => {
  const telefoneInput = document.getElementById("Telefone");

  // Formatar o telefone no campo de entrada
  telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Adiciona o código do país +55 se não estiver presente
    if (!value.startsWith("55")) {
      value = "55" + value;
    }

    // Formata o número com parênteses e traço
    value = value.replace(/^55(\d{2})(\d)/g, "+55 ($1) $2"); // Adiciona parênteses no DDD
    value = value.replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // Adiciona o traço no número

    e.target.value = value; // Atualiza o valor no campo de entrada
  });

  // Evento de clique no botão "Finalizar Pedido"
  const finalizarPedido = document.getElementById("finalizarPedido");
  finalizarPedido.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("Name").value;
    const telefoneInputValue = telefoneInput.value.replace(/\D/g, ""); // Remove a formatação para capturar apenas números
    const telefone = telefoneInputValue; // Número já contém o código do país 55
    const endereco = document.getElementById("Endereco").value;
    const order = sessionStorage.getItem("carrinho");
    const listOrder = JSON.parse(order);

    const pedidosData = {
      itens_pedido: listOrder.map((itens) => ({
        produto: itens.preco,
        ingredientes: itens.ingredientes || [],
        frutas: itens.frutas || [],
        coberturas: itens.coberturas || [],
      })),
      nome_cliente: name,
      telefone: telefone, // Telefone formatado com o código do país
      endereco: endereco,
      pagamento: "", // Preencha conforme necessário
    };

    // Enviar os dados para a API
    axios
      .post("https://api-e-comerce.up.railway.app/pedido/", pedidosData)
      .then((response) => {
        Swal.fire({
          title: "Pedido Anotado com Sucesso!",
          text: "Você será redirecionado para a página inicial.",
          icon: "success",
        });

        // Aguarda 5 segundos antes de redirecionar
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);

        sessionStorage.removeItem("carrinho");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "FALHA!",
          text: "Algo deu errado ao enviar o pedido.",
          footer: "Tente novamente mais tarde.",
        });
        console.log(error.response ? error.response.data : error.message);
      });
  });
});


