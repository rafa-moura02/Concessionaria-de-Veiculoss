
function renderVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const tbody = document.querySelector("#tabela-veiculos tbody");
    tbody.innerHTML = '';

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


function editVeiculo(index) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos'));
    const veiculo = veiculos[index];

    
    alert(`Editar veículo:\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nAno: ${veiculo.ano}\nValor: R$ ${veiculo.valor}`);
}


document.addEventListener('DOMContentLoaded', renderVeiculos);

