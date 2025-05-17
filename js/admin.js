function verificarSenha() {
  const senha = document.getElementById("senha").value;
  if (senha === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
  } else {
    alert("Senha incorreta!");
  }
}

document.getElementById("formProduto").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const imagem = document.getElementById("imagem").value;

  const novoProduto = { nome, preco, imagem };

  let produtos = JSON.parse(localStorage.getItem("produtosCustom")) || [];
  produtos.push(novoProduto);
  localStorage.setItem("produtosCustom", JSON.stringify(produtos));

  document.getElementById("msg").textContent = "Produto adicionado com sucesso!";
  this.reset();
});
