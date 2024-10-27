// Função para renderizar os veículos cadastrados na tabela
function renderVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const tbody = document.querySelector("#tabela-veiculos tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    veiculos.forEach((veiculo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${veiculo.marca}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.ano}</td>
            <td>R$ ${parseFloat(veiculo.valor).toFixed(2)}</td>
            <td>
                <button class="edit-button" onclick="editVeiculo(${index})">Editar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para editar veículo (exemplo simples, expandir conforme necessário)
function editVeiculo(index) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos'));
    const veiculo = veiculos[index];

    // Exemplo de ação ao clicar em "Editar" (personalize conforme necessário)
    alert(`Editar veículo:\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nAno: ${veiculo.ano}\nValor: R$ ${veiculo.valor}`);
}

// Chama a função de renderização ao carregar a página
document.addEventListener('DOMContentLoaded', renderVeiculos);

