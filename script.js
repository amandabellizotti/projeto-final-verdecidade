function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === 'user' && senha === '123') {
        window.location.href = 'painel-controle.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}


// Lógica de Cadastro de Plantio
function novoPlantio() {
    // 1. Captura de dados
    const nome = document.getElementById('nome-plantio').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const area = parseFloat(document.getElementById('area').value);
    const localizacao = document.getElementById('localizacao').value;
    const data = document.getElementById('data-plantio').value;

    // 2. Validação simples
    if (!nome || !quantidade || !area || !localizacao || !data) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // 3. Cálculo de Densidade (Agrônomo Digital)
    // Densidade = Sementes / Área
    const densidade = (quantidade / area).toFixed(0);

    // 4. Criação do objeto de plantio
    const plantio = {
        nome,
        quantidade,
        area,
        localizacao,
        data,
        densidade
    };

    // 5. Salvar no LocalStorage (para persistência)
    const listaPlantios = JSON.parse(localStorage.getItem('plantios')) || [];
    listaPlantios.push(plantio);
    localStorage.setItem('plantios', JSON.stringify(listaPlantios));

    alert("Plantio registrado com sucesso!");
    window.location.href = 'painel-controle.html';
}

// 6. Função para carregar os cards dinamicamente no Painel de Controle
function carregarPlantios() {
    const container = document.getElementById('container-cards');
    if (!container) return; // Só executa se estiver na página do painel

    const lista = JSON.parse(localStorage.getItem('plantios')) || [];

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum canteiro cadastrado ainda.</p>";
        return;
    }

    container.innerHTML = ""; // Limpa o container antes de renderizar

    lista.forEach(plantio => {
        const card = document.createElement('div');
        card.className = 'card-horta'; // Usando a classe já definida no seu CSS
        card.innerHTML = `
            <h3>${plantio.nome}</h3>
            <p><strong>Local:</strong> ${plantio.localizacao}</p>
            <p><strong>Data:</strong> ${plantio.data}</p>
            <p><strong>Área:</strong> ${plantio.area} m²</p>
            <p style="color: #2e7d32;"><strong>Densidade: ${plantio.densidade} sementes/m²</strong></p>
        `;
        container.appendChild(card);
    });
}

// Executa a carga de dados quando a janela abre
window.onload = carregarPlantios;