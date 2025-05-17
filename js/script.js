let produtosFixos = [
  // ,
  // {
  //   id: 2,
  //   nome: "Tomate",
  //   preco: "R$ 4,00",
  //   imagem: "img/tomate.jpg"
  // },
  // {
  //   id: 3,
  //   nome: "Ovos (dúzia)",
  //   preco: "R$ 7,00",
  //   imagem: "img/ovos.jpg"
  // },
  // {
  //   id: 4,
  //   nome: "Queijo artesanal",
  //   preco: "R$ 15,00",
  //   imagem: "img/queijo.jpg"
  // }
];

let carrinho = [];

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = "<li>Seu carrinho está vazio.</li>";
  } else {
    carrinho.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.preco}`;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.onclick = () => {
        carrinho.splice(index, 1);
        atualizarCarrinho();
        atualizarBotao();
      };

      li.appendChild(btnRemover);
      lista.appendChild(li);
    });
  }
}

function atualizarBotao() {
  document.getElementById("carrinhoBtn").textContent = `🛒 Carrinho (${carrinho.length})`;
}

function abrirCarrinho() {
  document.getElementById("modalCarrinho").style.display = "block";
  atualizarCarrinho();
}

function fecharCarrinho() {
  document.getElementById("modalCarrinho").style.display = "none";
}

document.getElementById("carrinhoBtn").addEventListener("click", abrirCarrinho);

document.getElementById("btnFinalizarCompra").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  fecharCarrinho();
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "pagamento.html";
});

const container = document.getElementById("produtos");

function exibirProdutos(filtro = "") {
  container.innerHTML = "";

  const produtosCustom = JSON.parse(localStorage.getItem("produtosCustom")) || [];
  const todosProdutos = produtosFixos.concat(produtosCustom);

  const filtrados = todosProdutos.filter(prod =>
    prod.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <p>Preço: ${prod.preco}</p>
    `;

    // Botão adicionar ao carrinho
    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";
    botao.onclick = () => {
      carrinho.push(prod);
      atualizarBotao();
    };
    div.appendChild(botao);

    // Botão pedir pelo WhatsApp
    const botaoWhatsApp = document.createElement("button");
    botaoWhatsApp.textContent = "Pedir pelo WhatsApp";

    const numeroWhatsApp = "5511942295280"; // Coloque o número real aqui
    const mensagem = `Olá, tenho interesse no produto ${prod.nome}`;
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    botaoWhatsApp.onclick = () => {
      window.open(link, "_blank");
    };

    botaoWhatsApp.style.backgroundColor = "#25D366";
    botaoWhatsApp.style.color = "white";
    botaoWhatsApp.style.marginTop = "6px";
    botaoWhatsApp.style.padding = "8px 12px";
    botaoWhatsApp.style.borderRadius = "25px";
    botaoWhatsApp.style.border = "none";
    botaoWhatsApp.style.cursor = "pointer";
    botaoWhatsApp.style.fontWeight = "600";

    div.appendChild(botaoWhatsApp);

    container.appendChild(div);
  });
}


exibirProdutos();

document.getElementById("filtro").addEventListener("input", (e) => {
  exibirProdutos(e.target.value);
});
