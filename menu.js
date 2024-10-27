// Função para renderizar os veículos cadastrados na tabela
function renderVeiculos() {
    // Recupera a lista de veículos do LocalStorage ou inicializa como um array vazio
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

    // Seleciona o corpo da tabela onde os veículos serão listados
    const tbody = document.querySelector("#tabela-veiculos tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Itera sobre cada veículo e cria uma linha na tabela para cada um
    veiculos.forEach(veiculo => {
        const row = document.createElement('tr'); // Cria uma nova linha da tabela
        
        // Define o conteúdo da linha com os dados do veículo
        row.innerHTML = `
            <td>${veiculo.marca}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.ano}</td>
        `;
        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(row);
    });
}

// Chama a função de renderização ao carregar a página
document.addEventListener('DOMContentLoaded', renderVeiculos);
