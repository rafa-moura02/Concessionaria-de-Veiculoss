
document.addEventListener('DOMContentLoaded', renderTable);

document.getElementById('form-veiculos').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const valor = document.getElementById('valor').value;

    let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const veiculo = { marca, modelo, ano, valor };
    veiculos.push(veiculo);

    localStorage.setItem('veiculos', JSON.stringify(veiculos));

    document.getElementById('form-veiculos').reset();
    renderTable();
});

function renderTable() {
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
                <button class="action-button edit-button" onclick="editVeiculo(${index})">Editar</button>
                <button class="action-button delete-button" onclick="deleteVeiculo(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editVeiculo(index) {
    const veiculos = JSON.parse(localStorage.getItem('veiculos'));
    const veiculo = veiculos[index];

    document.getElementById('marca').value = veiculo.marca;
    document.getElementById('modelo').value = veiculo.modelo;
    document.getElementById('ano').value = veiculo.ano;
    document.getElementById('valor').value = veiculo.valor;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.className = 'action-button edit-button';
    saveButton.onclick = function(e) {
        e.preventDefault();

        veiculo.marca = document.getElementById('marca').value;
        veiculo.modelo = document.getElementById('modelo').value;
        veiculo.ano = document.getElementById('ano').value;
        veiculo.valor = document.getElementById('valor').value;

        localStorage.setItem('veiculos', JSON.stringify(veiculos));
        document.getElementById('form-veiculos').reset();
        renderTable();
        document.getElementById('form-veiculos').replaceChild(cadastrarButton, saveButton);
    };

    const cadastrarButton = document.querySelector('#form-veiculos button');
    document.getElementById('form-veiculos').replaceChild(saveButton, cadastrarButton);
}

function deleteVeiculo(index) {
    let veiculos = JSON.parse(localStorage.getItem('veiculos'));
    veiculos.splice(index, 1);
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
    renderTable();
}
