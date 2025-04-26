let produtos = [
  { nome: 'Maçã', preco: 4.99, imagem: null, imagemUrl: 'https://i.imgur.com/1NqlvPh.png' },
  { nome: 'Banana', preco: 3.49, imagem: null, imagemUrl: 'https://i.imgur.com/zg7N2fH.png' },
  { nome: 'Alface', preco: 2.99, imagem: null, imagemUrl: 'https://i.imgur.com/3l6Rgnf.png' },
  { nome: 'Tomate', preco: 5.49, imagem: null, imagemUrl: 'https://i.imgur.com/x4g8LPV.png' }
];

let carrinho = [];
let carrinhoAberto = false;

function preload() {
  // Carregar imagens
  for (let i = 0; i < produtos.length; i++) {
    produtos[i].imagem = loadImage(produtos[i].imagemUrl);
  }
}

function setup() {
  createCanvas(1200, 800);
  drawLayout();
}

function draw() {
  if (carrinhoAberto) {
    desenharCarrinho();
  }
}

function drawLayout() {
  background(255);

  // Topo
  fill(76, 175, 80);
  rect(0, 0, width, 80);
  
  fill(255);
  textSize(32);
  textAlign(LEFT, CENTER);
  text('🍏 HortiFresco', 20, 40);
  
  textSize(18);
  textAlign(RIGHT, CENTER);
  text('Home   Produtos   Ofertas   Sobre Nós   Contato', width - 120, 40);
  
  drawCarrinhoIcon();
  
  // Banner
  fill(255, 241, 118);
  rect(0, 80, width, 250);
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text('Sua saúde começa aqui.\nProdutos fresquinhos direto do campo!', width/2, 200);
  
  fill(76, 175, 80);
  rect(width/2 - 100, 280, 200, 40, 10);
  fill(255);
  textSize(20);
  text('Comprar Agora', width/2, 300);
  
  // Destaques
  fill(0);
  textSize(28);
  textAlign(LEFT);
  text('🍓 Destaques da Semana', 20, 360);
  
  // Produtos
  for (let i = 0; i < produtos.length; i++) {
    let x = 50 + (i * 270);
    let y = 400;
    fill(240);
    rect(x, y, 220, 220, 20);

    // Mostrar imagem da fruta
    if (produtos[i].imagem) {
      image(produtos[i].imagem, x + 10, y + 10, 200, 150);
    }
    
    fill(0);
    textAlign(CENTER);
    textSize(20);
    text(produtos[i].nome, x + 110, y + 180);
    textSize(16);
    text('R$ ' + produtos[i].preco.toFixed(2), x + 110, y + 210);
    
    fill(76, 175, 80);
    rect(x + 60, y + 230, 100, 30, 10);
    fill(255);
    textSize(14);
    text('Adicionar', x + 110, y + 245);
  }
  
  // Rodapé
  fill(76, 175, 80);
  rect(0, height-60, width, 60);
  
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('© 2025 HortiFresco - Todos os direitos reservados | Instagram | WhatsApp | Facebook', width/2, height-30);
}

function drawCarrinhoIcon() {
  fill(255);
  textSize(24);
  textAlign(RIGHT, CENTER);
  text('🛒 ' + carrinho.length, width - 20, 40);
}

function desenharCarrinho() {
  fill(255);
  stroke(0);
  rect(width/2 - 200, 100, 400, 500, 20);
  
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Seu Carrinho', width/2, 130);
  
  let yStart = 170;
  let total = 0;
  
  for (let i = 0; i < carrinho.length; i++) {
    let item = carrinho[i];
    textSize(18);
    textAlign(LEFT);
    text(item.nome + " - R$" + item.preco.toFixed(2), width/2 - 180, yStart + (i * 40));
    
    fill(255, 50, 50);
    rect(width/2 + 100, yStart - 10 + (i * 40), 80, 30, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Remover', width/2 + 140, yStart + 5 + (i * 40));
    
    total += item.preco;
  }
  
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Total: R$" + total.toFixed(2), width/2, yStart + (carrinho.length * 40) + 30);
  
  fill(76, 175, 80);
  rect(width/2 - 60, yStart + (carrinho.length * 40) + 70, 120, 40, 10);
  fill(255);
  textSize(18);
  text('Fechar', width/2, yStart + (carrinho.length * 40) + 90);
}

function mousePressed() {
  for (let i = 0; i < produtos.length; i++) {
    let x = 50 + (i * 270) + 60;
    let y = 400 + 230;
    let w = 100;
    let h = 30;
    
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      carrinho.push(produtos[i]);
      drawLayout();
    }
  }
  
  if (mouseX > width - 70 && mouseY > 20 && mouseX < width && mouseY < 60) {
    carrinhoAberto = true;
  }
  
  if (carrinhoAberto) {
    let yStart = 170;
    
    for (let i = 0; i < carrinho.length; i++) {
      let bx = width/2 + 100;
      let by = yStart - 10 + (i * 40);
      let bw = 80;
      let bh = 30;
      
      if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
        carrinho.splice(i, 1);
        drawLayout();
        return;
      }
    }
    
    let closeX = width/2 - 60;
    let closeY = yStart + (carrinho.length * 40) + 70;
    if (mouseX > closeX && mouseX < closeX + 120 && mouseY > closeY && mouseY < closeY + 40) {
      carrinhoAberto = false;
      drawLayout();
    }
  }
}
