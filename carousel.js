// carousel.js

let usuarioAtual = JSON.parse(localStorage.getItem('logado')) || null;

// Armazenar os itens do carrossel.
// Inicialmente, carregue os itens padrão se não houver nada no localStorage.
let carouselItems = [
    { name: "Tomate", price: 5.49, image: "img/tomate.jpg" },
    { name: "Cenoura", price: 3.89, image: "img/cenoura.jpg" },
    { name: "Laranja", price: 2.49, image: "img/laranja.jpg" },
    { name: "Limão", price: 1.89, image: "img/limao.jpg" },
    { name: "Tomate Cereja", price: 6.99, image: "img/tomate-cereja.jpg" },
    { name: "Maçã", price: 4.29, image: "img/maça.webp" },
    { name: "Uva Verde", price: 9.99, image: "img/uva verde.jpg" },
    { name: "Morango", price: 12.50, image: "img/morango.jpg" },
    { name: "Uva", price: 8.90, image: "img/uva.jpg" },
    { name: "Alface", price: 3.20, image: "img/salada1.jpg" }
];

// Variáveis para armazenar a imagem temporariamente no modal de adição
let newProductImageBase64 = null;
let currentEditingImageElement = null; // Para saber qual <img> está sendo editada

// Função para carregar itens do localStorage (se existirem)
function loadCarouselItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('carouselItems');
    if (storedItems) {
        carouselItems = JSON.parse(storedItems);
    }
}

// Função para salvar itens no localStorage
function saveCarouselItemsToLocalStorage() {
    localStorage.setItem('carouselItems', JSON.stringify(carouselItems));
}

// Função para renderizar o carrossel dinamicamente
function renderCarousel() {
    const carouselContainer = document.getElementById('carousel-items-container');
    if (!carouselContainer) return;

    carouselContainer.innerHTML = ''; // Limpa os itens existentes

    carouselItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        // Usamos data-item-id para identificar unicamente o item no carrossel para edições futuras
        itemDiv.dataset.itemId = item.name.toLowerCase().replace(/\s/g, '-') + '-' + new Date().getTime(); // ID único
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name.toLowerCase()}" data-id="img-${item.name.toLowerCase().replace(/\s/g, '-')}" data-img-editavel="true">
    <h3 data-id="nome-${item.name.toLowerCase().replace(/\s/g, '-')}" data-editavel="true">${item.name}</h3>
    <p class="price" data-id="preco-${item.name.toLowerCase().replace(/\s/g, '-')}" data-editavel="true">R$${item.price.toFixed(2)}</p>
    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Peça agora</button>
<a 
  href="https://wa.me/5511942295280?text=${encodeURIComponent(`Olá! Gostaria de pedir o produto: ${item.name} - R$${item.price.toFixed(2)}`)}" 
  class="btn btn-success mt-2 w-100" 
  target="_blank">
  Pedir pelo WhatsApp
</a>
    ${isEditing ? `<button class="btn btn-danger btn-sm btn-remover mt-2">Remover</button>` : ''}
`;
        carouselContainer.appendChild(itemDiv);
    });

    // Re-vincular os botões "Peça agora" após a renderização
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.removeEventListener('click', handleAddToCartClick);
        button.addEventListener('click', handleAddToCartClick);
    });
    if (isEditing) {
        carouselContainer.querySelectorAll('.btn-remover').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja remover este item?')) {
                    carouselItems.splice(index, 1); // Remove da lista
                    saveCarouselItemsToLocalStorage(); // Atualiza localStorage
                    renderCarousel(); // Atualiza visualmente
                    marcarComoEditado(); // Marca como editado para salvar
                }
            });
        });
    }


    // Se estiver no modo de edição, re-aplicar o estilo e listeners para imagens
    if (isEditing) {
        // Aplica apenas nas imagens do carrossel
        document.querySelectorAll('#carousel-items-container [data-img-editavel="true"]').forEach(img => {
            applyAdminImageEditing(img);
        });

        // Aplica nas imagens fora do carrossel (como seção de produtos)
        document.querySelectorAll('.produtos [data-img-editavel="true"]').forEach(img => {
            applyAdminImageEditing(img);
        });

        // 🔧 Novo trecho necessário:
        document.querySelectorAll('[data-editavel="true"]').forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.style.border = '1px solid blue';
            el.style.padding = '2px';
            el.addEventListener('input', marcarComoEditado);
        });
    }

    console.log("Renderizando carrossel - isEditing:", isEditing);

}

function handleAddToCartClick() {
    const nome = this.dataset.name;
    const preco = this.dataset.price;
    adicionarAoCarrinho(nome, preco);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCarouselItemsFromLocalStorage();
    renderCarousel();

    atualizarUsuarioNaNavbar();

    const carousel = document.querySelector('.carousel');
    const nextBtn = document.querySelector('.carousel-btn.right');
    const prevBtn = document.querySelector('.carousel-btn.left');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // --- Lógica para Adicionar Novo Item (para admin) ---
    const addNewItemButton = document.getElementById('btn-add-new-item');
    const addNewItemModalElement = document.getElementById('addNewItemModal');
    const addNewItemModal = new bootstrap.Modal(addNewItemModalElement); // Inicializa o modal

    if (addNewItemButton) {
        addNewItemButton.addEventListener('click', () => {
            // Limpa prévias e variáveis de imagem ao abrir o modal
            document.getElementById('newItemImageFile').value = '';
            document.getElementById('newItemImagePreview').style.display = 'none';
            document.getElementById('newItemImagePreview').src = '';
            newProductImageBase64 = null;
            addNewItemModal.show();
        });
    }

    const addNewItemForm = document.getElementById('addNewItemForm');
    const newItemImageFile = document.getElementById('newItemImageFile');
    const dropAreaNewItem = document.getElementById('drop-area-new-item');
    const newItemImagePreview = document.getElementById('newItemImagePreview');

    // Manipulador de upload de arquivo para novo item
    if (newItemImageFile) {
        newItemImageFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                readImageFile(file, (base64) => {
                    newProductImageBase64 = base64;
                    newItemImagePreview.src = base64;
                    newItemImagePreview.style.display = 'block';
                });
            }
        });
    }

    // Manipuladores de arrastar e soltar para novo item
    if (dropAreaNewItem) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropAreaNewItem.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropAreaNewItem.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropAreaNewItem.addEventListener(eventName, unhighlight, false);
        });

        dropAreaNewItem.addEventListener('drop', handleDropNewItem, false);
        dropAreaNewItem.addEventListener('click', () => newItemImageFile.click()); // Abre o seletor de arquivos ao clicar
    }





    function handleDropNewItem(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file && file.type.startsWith('image/')) {
            readImageFile(file, (base64) => {
                newProductImageBase64 = base64;
                newItemImagePreview.src = base64;
                newItemImagePreview.style.display = 'block';
            });
        } else {
            alert('Por favor, solte apenas arquivos de imagem.');
        }
    }

    // Função para ler arquivo de imagem e converter para Base64


    if (addNewItemForm) {
        addNewItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newItemName').value.trim();
            const price = parseFloat(document.getElementById('newItemPrice').value);

            if (name && !isNaN(price) && price > 0 && newProductImageBase64) {
                const newItem = { name, price, image: newProductImageBase64 };
                carouselItems.push(newItem);
                saveCarouselItemsToLocalStorage();
                renderCarousel(); // Re-renderiza o carrossel com o novo item
                addNewItemForm.reset();
                newProductImageBase64 = null; // Limpa a variável
                newItemImagePreview.style.display = 'none'; // Esconde a prévia
                newItemImagePreview.src = '';
                addNewItemModal.hide();
                alert('Item adicionado com sucesso!');
                marcarComoEditado();
            } else {
                alert('Por favor, preencha todos os campos e selecione uma imagem.');
            }
        });
    }
});


let cart = [];

function atualizarBadge() {
    document.querySelector('.badge').textContent = cart.length;
}

function abrirCarrinho() {
    document.getElementById('cart-sidebar').style.right = '0';
    renderizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('cart-sidebar').style.right = '-300px';
}

function adicionarAoCarrinho(nome, preco) {
    const existente = cart.find(item => item.nome === nome);
    if (existente) {
        existente.qtd++;
    } else {
        cart.push({ nome, preco: parseFloat(preco), qtd: 1 });
    }
    atualizarBadge();
    renderizarCarrinho();
}

function removerDoCarrinho(index) {
    cart.splice(index, 1);
    renderizarCarrinho();
    atualizarBadge();
}

function renderizarCarrinho() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.preco * item.qtd;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item d-flex justify-content-between align-items-center mb-2">
                <span>${item.nome}</span>
                <div class="quantity-controls d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="alterarQuantidade(${index}, -1)">−</button>
                    <span>${item.qtd}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-2" onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
                <span>R$${(item.preco * item.qtd).toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ms-2" onclick="removerDoCarrinho(${index})">🗑</button>
            </div>
        `;
        cartList.appendChild(li);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function alterarQuantidade(index, delta) {
    cart[index].qtd += delta;
    if (cart[index].qtd <= 0) {
        cart.splice(index, 1);
    }
    renderizarCarrinho();
    atualizarBadge();
}

function finalizarCompra() {
    if (cart.length === 0) {
        alert("O carrinho está vazio. Adicione itens antes de finalizar a compra.");
        return;
    }

    localStorage.setItem('carrinho', JSON.stringify(cart));
    window.location.href = 'pagamento.html';
}

function filtrarSugestoes() {
    const input = document.getElementById("campoBusca").value.toLowerCase();
    const sugestoes = document.getElementById("sugestoes");
    sugestoes.innerHTML = "";

    if (input === "") return;

    const produtos = carouselItems.map(item => ({ nome: item.name.toLowerCase(), preco: item.price }));
    const resultados = produtos.filter(produto => produto.nome.includes(input));

    resultados.forEach(produto => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";

        const nome = document.createElement("span");
        nome.textContent = produto.nome;

        const botao = document.createElement("button");
        botao.className = "btn btn-sm btn-success";
        botao.textContent = "+";
        botao.onclick = (e) => {
            e.stopPropagation();
            const originalProductName = carouselItems.find(p => p.name.toLowerCase() === produto.nome).name;
            adicionarAoCarrinho(originalProductName, produto.preco);
            sugestoes.innerHTML = "";
        };

        item.appendChild(nome);
        item.appendChild(botao);
        sugestoes.appendChild(item);
    });
}

function entrar() {
    const user = document.getElementById('loginUsuario').value.trim();
    const pass = document.getElementById('loginSenha').value;

    const contas = JSON.parse(localStorage.getItem('usuarios')) || [];

    const encontrado = contas.find(c => c.usuario === user && c.senha === pass);

    if (encontrado) {
        alert(`Bem-vindo, ${user}!`);
        usuarioAtual = encontrado;
        localStorage.setItem('logado', JSON.stringify(encontrado));
        location.reload();
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function criarConta() {
    const user = document.getElementById('loginUsuario').value.trim();
    const pass = document.getElementById('loginSenha').value;

    if (!user || !pass) {
        alert("Preencha todos os campos!");
        return;
    }

    const contas = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (contas.some(c => c.usuario === user)) {
        alert("Usuário já existe!");
        return;
    }

    const novaConta = { usuario: user, senha: pass, admin: user === 'admin' };
    contas.push(novaConta);
    localStorage.setItem('usuarios', JSON.stringify(contas));
    alert("Conta criada com sucesso!");
}

function atualizarUsuarioNaNavbar() {
    const logado = JSON.parse(localStorage.getItem('logado'));
    const nomeSpan = document.getElementById('nomeUsuario');
    const dropdown = document.getElementById('usuarioArea');
    const menu = dropdown.querySelector('.dropdown-menu');
    const adminAddItemControls = document.getElementById('admin-add-item-controls');

    if (logado) {
        nomeSpan.textContent = `${logado.usuario}`;
        menu.querySelectorAll('.admin-link').forEach(link => link.remove());

        if (logado.admin) {
            const adminPanelLi = document.createElement('li');
            const adminPanelLink = document.createElement('a');
            adminPanelLink.className = 'dropdown-item admin-link';
            adminPanelLink.href = '#';
            adminPanelLink.textContent = 'Painel Admin';
            adminPanelLink.onclick = habilitarEdicaoAdmin;
            adminPanelLi.appendChild(adminPanelLink);
            menu.prepend(adminPanelLi);
            if (adminAddItemControls) {
                adminAddItemControls.style.display = 'block';
            }
        } else {
            if (adminAddItemControls) {
                adminAddItemControls.style.display = 'none';
            }
        }

        if (!menu.querySelector('a[onclick="logout()"]')) {
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.className = 'dropdown-item';
            logoutLink.href = '#';
            logoutLink.textContent = 'Sair';
            logoutLink.onclick = logout;
            menu.appendChild(logoutLi);
        }

    } else {
        nomeSpan.textContent = 'Login';
        menu.innerHTML = `
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Entrar</a></li>
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal" onclick="document.getElementById('tab-cadastro').click();">Criar Conta</a></li>
        `;
        if (adminAddItemControls) {
            adminAddItemControls.style.display = 'none';
        }
    }
}

function logout() {
    localStorage.removeItem('logado');
    location.reload();
}


// --- Funções de Edição de Conteúdo (para Admin) ---
let isEditing = false; // Flag para controlar o modo de edição

function habilitarEdicaoAdmin() {
    const logado = JSON.parse(localStorage.getItem('logado'));
    if (!logado || !logado.admin) {
        alert("Você não tem permissão para editar esta página.");
        return;
    }

    isEditing = !isEditing; // Alterna o modo de edição
    console.log("Modo de edição está ativo?", isEditing);


    const elementosEditaveis = document.querySelectorAll('[data-editavel="true"]');
    const imagensEditaveis = document.querySelectorAll('[data-img-editavel="true"]');
    const adminControls = document.getElementById('admin-controls');

    if (isEditing) {
        elementosEditaveis.forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.style.border = '1px solid blue';
            el.style.padding = '2px';
            el.addEventListener('input', marcarComoEditado);
        });

        imagensEditaveis.forEach(img => {
            applyAdminImageEditing(img); // Aplica a nova lógica de edição de imagem
        });

        if (!adminControls) {
            const newAdminControls = document.createElement('div');
            newAdminControls.id = 'admin-controls';
            newAdminControls.style.position = 'fixed';
            newAdminControls.style.bottom = '20px';
            newAdminControls.style.left = '20px';
            newAdminControls.style.backgroundColor = 'white';
            newAdminControls.style.padding = '15px';
            newAdminControls.style.borderRadius = '8px';
            newAdminControls.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            newAdminControls.style.zIndex = '9999';
            newAdminControls.innerHTML = `
                <button id="save-editions" class="btn btn-success me-2">Salvar Edições</button>
                <button id="reset-content" class="btn btn-warning">Resetar Conteúdo</button>
                <button id="toggle-edit-mode" class="btn btn-info ms-2">Sair do Modo Edição</button>
            `;
            document.body.appendChild(newAdminControls);

            document.getElementById('save-editions').addEventListener('click', salvarAlteracoesAdmin);
            document.getElementById('reset-content').addEventListener('click', resetarConteudoPadrao);
            document.getElementById('toggle-edit-mode').addEventListener('click', habilitarEdicaoAdmin);
        } else {
            adminControls.style.display = 'block';
        }

        alert("Modo de edição ativado! Clique nos textos ou nas imagens para editar. Para imagens, clique para abrir o seletor ou arraste/solte.");

    } else {
        // Desativa o modo de edição
        elementosEditaveis.forEach(el => {
            el.removeAttribute('contenteditable');
            el.style.border = '';
            el.style.padding = '';
            el.removeEventListener('input', marcarComoEditado);
        });

        imagensEditaveis.forEach(img => {
            removeAdminImageEditing(img); // Remove a nova lógica de edição de imagem
        });

        if (adminControls) {
            adminControls.style.display = 'none';
        }
        alert("Modo de edição desativado.");
        location.reload();
    }
    renderCarousel();
}



function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function readImageFile(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
}

function highlight() {
    this.style.borderColor = 'blue';
}

function unhighlight() {
    this.style.borderColor = '#ccc';
}
// Nova função para aplicar os manipuladores de imagem para admins
function applyAdminImageEditing(img) {
    img.style.border = '1px solid red';
    img.style.cursor = 'pointer';

    // Cria um input de arquivo oculto para cada imagem
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    img.parentNode.appendChild(fileInput); // Adiciona o input ao pai da imagem

    // Listener para o clique na imagem (abre o seletor de arquivos)
    img.adminClickHandler = () => { // Armazena a função para poder removê-la depois
        fileInput.click();
    };
    img.addEventListener('click', img.adminClickHandler);

    // Listener para a mudança no input de arquivo
    fileInput.adminChangeHandler = (event) => { // Armazena a função
        const file = event.target.files[0];
        if (file) {
            readImageFile(file, (base64) => {
                img.src = base64;
                marcarComoEditado();
            });
        }
    };
    fileInput.addEventListener('change', fileInput.adminChangeHandler);

    // Manipuladores de arrastar e soltar para a imagem
    img.adminDragOverHandler = preventDefaults;
    img.adminDropHandler = (e) => {
        preventDefaults(e);
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file && file.type.startsWith('image/')) {
            readImageFile(file, (base64) => {
                img.src = base64;
                marcarComoEditado();
            });
        } else {
            alert('Por favor, solte apenas arquivos de imagem.');
        }
    };

    img.addEventListener('dragover', img.adminDragOverHandler);
    img.addEventListener('drop', img.adminDropHandler);
    img.addEventListener('dragenter', highlight); // Reutiliza a função highlight
    img.addEventListener('dragleave', unhighlight); // Reutiliza a função unhighlight

    // Armazenar o fileInput associado à imagem para removê-lo depois
    img.associatedFileInput = fileInput;
}

// Nova função para remover os manipuladores de imagem para admins
function removeAdminImageEditing(img) {
    img.style.border = '';
    img.style.cursor = '';

    // Remove event listeners
    if (img.adminClickHandler) {
        img.removeEventListener('click', img.adminClickHandler);
        img.adminClickHandler = null;
    }
    if (img.associatedFileInput && img.associatedFileInput.adminChangeHandler) {
        img.associatedFileInput.removeEventListener('change', img.associatedFileInput.adminChangeHandler);
        img.associatedFileInput.adminChangeHandler = null;
    }

    if (img.adminDragOverHandler) {
        img.removeEventListener('dragover', img.adminDragOverHandler);
        img.removeEventListener('drop', img.adminDropHandler);
        img.removeEventListener('dragenter', highlight);
        img.removeEventListener('dragleave', unhighlight);
        img.adminDragOverHandler = null;
        img.adminDropHandler = null;
    }

    // Remove o input de arquivo oculto
    if (img.associatedFileInput && img.associatedFileInput.parentNode) {
        img.associatedFileInput.parentNode.removeChild(img.associatedFileInput);
        img.associatedFileInput = null;
    }
}


function salvarAlteracoesAdmin() {
    const conteudoEditado = {};

    document.querySelectorAll('[data-editavel="true"]').forEach(el => {
        const id = el.dataset.id;
        conteudoEditado[id] = el.textContent;
    });
    document.querySelectorAll('[data-img-editavel="true"]').forEach(img => {
        const id = img.dataset.id;
        conteudoEditado[id] = img.src;
    });

    // Para as imagens, atualizamos o array carouselItems
    document.querySelectorAll('.carousel .item').forEach(itemDiv => {
        const imgElement = itemDiv.querySelector('img[data-img-editavel="true"]');
        const nameElement = itemDiv.querySelector('h3[data-editavel="true"]');
        const priceElement = itemDiv.querySelector('p[data-editavel="true"]');

        if (imgElement && nameElement && priceElement) {
            const itemName = nameElement.textContent;
            const itemPrice = parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.'));
            const itemImage = imgElement.src;

            // Encontra o item correspondente no array e o atualiza
            const existingItemIndex = carouselItems.findIndex(item => item.name === itemName);
            if (existingItemIndex !== -1) {
                carouselItems[existingItemIndex].image = itemImage;
                carouselItems[existingItemIndex].price = itemPrice;
                // O nome já deve ter sido editado via contenteditable
            } else {
                // Se o nome foi alterado de forma que não encontramos,
                // ou se é um novo item adicionado, adicione-o (com precaução para evitar duplicação)
                // Uma melhor abordagem aqui seria usar um data-item-id único para cada item.
                // Por enquanto, vamos re-adicionar se não for encontrado (simplificado)
                // Se o item foi editado e o nome alterado, ele pode não ser encontrado.
                // A melhor forma é usar um ID persistente para cada item do carrossel.
                // Para fins de demonstração, se um item não for encontrado, ele será adicionado como novo.
                // É por isso que adicionei o data-item-id na renderCarousel.
                // Vamos refinar a busca:
                const itemId = itemDiv.dataset.itemId;
                const existingItemById = carouselItems.findIndex(item => item.id === itemId);
                if (existingItemById !== -1) {
                    carouselItems[existingItemById].image = itemImage;
                    carouselItems[existingItemById].name = itemName;
                    carouselItems[existingItemById].price = itemPrice;
                } else {
                    // Isso pode acontecer se for um item novo que ainda não tem um ID persistente ou erro.
                    // Para evitar duplicação em caso de nome editado, é crucial o ID.
                    // Se você não implementou o ID, pode haver problemas aqui.
                    console.warn(`Item com nome '${itemName}' não encontrado ou ID inconsistente.`);
                    // Considerar adicionar como novo, ou um modal de resolução.
                }
            }
        }
    });

    localStorage.setItem('conteudoEditado', JSON.stringify(conteudoEditado));
    saveCarouselItemsToLocalStorage(); // Salva também os itens do carrossel no localStorage
    alert("Alterações salvas com sucesso!");
    const saveButton = document.getElementById('save-editions');
    if (saveButton) {
        saveButton.classList.remove('btn-danger');
        saveButton.classList.add('btn-success');
        saveButton.textContent = 'Edições Salvas!';
        setTimeout(() => {
            saveButton.textContent = 'Salvar Edições';
        }, 2000);
    }
}

function carregarAlteracoesAdmin() {
    const conteudoEditado = JSON.parse(localStorage.getItem('conteudoEditado'));
    if (conteudoEditado) {
        for (const id in conteudoEditado) {
            const el = document.querySelector(`[data-id="${id}"]`);
            if (el) {
                if (el.tagName === 'IMG') {
                    el.src = conteudoEditado[id];
                } else {
                    el.textContent = conteudoEditado[id];
                }
            }
        }
    }
    // Re-renderiza o carrossel após carregar as edições, para garantir que as imagens persistam
    // Mas note que `renderCarousel` já carrega do localStorage.
    // Se você estiver salvando as URLs base64 no `carouselItems` array,
    // o `renderCarousel` já vai puxar a imagem correta.
}

function marcarComoEditado() {
    const saveButton = document.getElementById('save-editions');
    if (saveButton) {
        saveButton.classList.remove('btn-success');
        saveButton.classList.add('btn-danger');
        saveButton.textContent = 'Salvar Edições (pendente)';
    }
}

function resetarConteudoPadrao() {
    if (confirm("Tem certeza que deseja resetar todo o conteúdo editado para o padrão? Isso incluirá os itens do carrossel.")) {
        localStorage.removeItem('conteudoEditado');
        localStorage.removeItem('carouselItems'); // Reseta também os itens do carrossel
        alert("Conteúdo resetado. A página será recarregada.");
        location.reload();
    }
}

// Chamadas iniciais
document.addEventListener('DOMContentLoaded', carregarAlteracoesAdmin); // Carrega edições ao carregar a página

function enviarCarrinhoPorWhatsapp() {
    if (cart.length === 0) {
        alert("O carrinho está vazio.");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";

    cart.forEach(item => {
        mensagem += `- ${item.qtd}x ${item.nome} - R$${(item.qtd * item.preco).toFixed(2)}%0A`;
    });

    let total = cart.reduce((sum, item) => sum + item.qtd * item.preco, 0);
    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    const numero = "5511942295280"; // Troque pelo seu número (sem +, parênteses ou traços)
    const url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
}
