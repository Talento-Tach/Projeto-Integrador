let produtos = [
  { nome: 'Maçã', preco: 4.99, tipo: 'Fruta', imagemUrl: 'https://i.imgur.com/1NqlvPh.png' },
  { nome: 'Banana', preco: 3.49, tipo: 'Fruta', imagemUrl: 'https://i.imgur.com/zg7N2fH.png' },
  { nome: 'Alface', preco: 2.99, tipo: 'Legume', imagemUrl: 'https://i.imgur.com/3l6Rgnf.png' },
  { nome: 'Tomate', preco: 5.49, tipo: 'Legume', imagemUrl: 'https://i.imgur.com/x4g8LPV.png' },
  { nome: 'Abacaxi', preco: 7.99, tipo: 'Fruta', imagemUrl: 'https://i.imgur.com/4z1F6K4.png' },
  { nome: 'Uva', preco: 6.49, tipo: 'Fruta', imagemUrl: 'https://i.imgur.com/VnFBY1h.png' },
  { nome: 'Manga', preco: 5.99, tipo: 'Fruta', imagemUrl: 'https://i.imgur.com/OM6BYKU.png' },
  { nome: 'Cenoura', preco: 4.29, tipo: 'Legume', imagemUrl: 'https://i.imgur.com/5eVQnVi.png' }
];

let carrinho = [];
let filtro = 'Todos';
let carrinhoAberto = false;
let animacoes = [];
let carregando = true;
let fadeInAlpha = 0;
let telaPagamento = false;

function preload() {
  for (let p of produtos) {
    p.imagem = loadImage(p.imagemUrl);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setTimeout(() => carregando = false, 3000);
}

function draw() {
  background(255);

  if (carregando) {
    drawLoading();
  } else if (telaPagamento) {
    drawPagamento();
  } else {
    if (fadeInAlpha < 255) fadeInAlpha += 5;
    push();
    tint(255, fadeInAlpha);
    drawLayout();
    pop();
    if (carrinhoAberto) desenharCarrinho();
    drawAnimacoes();
  }
}

function drawLoading() {
  background(255);
  fill(76, 175, 80);
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Carregando...', width/2, height/2);
}

function drawPagamento() {
  fill(76, 175, 80);
  textAlign(CENTER, CENTER);
  textSize(36);
  text('Pagamento Aprovado! ✅', width/2, height/2);
}

function drawLayout() {
  fill(76, 175, 80);
  rect(0, 0, width, 80);
  fill(255);
  textSize(32);
  textAlign(LEFT, CENTER);
  text('🍏 HortiFresco', 20, 40);
  drawCarrinhoIcon();

  drawFiltros();

  let produtosFiltrados = produtos.filter(p => filtro === 'Todos' || p.tipo === filtro);
  let cols = floor(width / 250);
  let spacing = width / cols;

  for (let i = 0; i < produtosFiltrados.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = spacing * col + 20;
    let y = 120 + row * 280;

    fill(240);
    rect(x, y, 200, 250, 20);

    image(produtosFiltrados[i].imagem, x + 10, y + 10, 180, 140);

    fill(0);
    textAlign(CENTER);
    textSize(18);
    text(produtosFiltrados[i].nome, x + 100, y + 170);
    text('R$ ' + produtosFiltrados[i].preco.toFixed(2), x + 100, y + 200);

    fill(76, 175, 80);
    rect(x + 50, y + 210, 100, 30, 10);
    fill(255);
    textSize(14);
    text('Adicionar', x + 100, y + 225);
  }
}

function drawFiltros() {
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text('Filtrar:', 20, 100);

  let filtros = ['Todos', 'Fruta', 'Legume'];
  for (let i = 0; i < filtros.length; i++) {
    fill(filtro === filtros[i] ? color(76, 175, 80) : 200);
    rect(100 + i*110, 85, 100, 30, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    text(filtros[i], 150 + i*110, 100);
  }
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
  rect(width/2 - 100, yStart + (carrinho.length * 40) + 70, 200, 40, 10);
  fill(255);
  textSize(18);
  text('Finalizar Compra', width/2, yStart + (carrinho.length * 40) + 90);

  fill(100);
  rect(width/2 - 60, yStart + (carrinho.length * 40) + 120, 120, 30, 10);
  fill(255);
  textSize(14);
  text('Fechar Carrinho', width/2, yStart + (carrinho.length * 40) + 135);
}

function drawAnimacoes() {
  for (let i = animacoes.length - 1; i >= 0; i--) {
    let a = animacoes[i];
    fill(76, 175, 80, a.alpha);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('💚', a.x, a.y);
    a.y -= 1;
    a.alpha -= 3;
    if (a.alpha <= 0) animacoes.splice(i, 1);
  }
}

function mousePressed() {
  if (carregando) return;
  
  let filtros = ['Todos', 'Fruta', 'Legume'];
  for (let i = 0; i < filtros.length; i++) {
    if (mouseX > 100 + i*110 && mouseX < 200 + i*110 && mouseY > 85 && mouseY < 115) {
      filtro = filtros[i];
      return;
    }
  }

  let cols = floor(width / 250);
  let spacing = width / cols;
  let produtosFiltrados = produtos.filter(p => filtro === 'Todos' || p.tipo === filtro);

  for (let i = 0; i < produtosFiltrados.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = spacing * col + 20 + 50;
    let y = 120 + row * 280 + 210;

    if (mouseX > x && mouseX < x + 100 && mouseY > y && mouseY < y + 30) {
      carrinho.push(produtosFiltrados[i]);
      animacoes.push({x: mouseX, y: mouseY, alpha: 255});
      return;
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
      if (mouseX > bx && mouseX < bx + 80 && mouseY > by && mouseY < by + 30) {
        carrinho.splice(i, 1);
        return;
      }
    }

    let pagarX = width/2 - 100;
    let pagarY = yStart + (carrinho.length * 40) + 70;
    if (mouseX > pagarX && mouseX < pagarX + 200 && mouseY > pagarY && mouseY < pagarY + 40) {
      telaPagamento = true;
      setTimeout(() => { telaPagamento = false; carrinho = []; carrinhoAberto = false; }, 3000);
      return;
    }

    let fecharX = width/2 - 60;
    let fecharY = yStart + (carrinho.length * 40) + 120;
    if (mouseX > fecharX && mouseX < fecharX + 120 && mouseY > fecharY && mouseY < fecharY + 30) {
      carrinhoAberto = false;
      return;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
