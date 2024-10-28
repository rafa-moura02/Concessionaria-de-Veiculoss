
document.addEventListener('DOMContentLoaded', function() {
    carregarOpcoesClientes();
    carregarOpcoesVeiculos();
    renderVendas();
});


function carregarOpcoesClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteSelect = document.getElementById('cliente-select');
    clienteSelect.innerHTML = ''; 

    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
}


function carregarOpcoesVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const veiculoSelect = document.getElementById('veiculo-select');
    veiculoSelect.innerHTML = ''; 

    veiculos.forEach((veiculo, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${veiculo.marca} ${veiculo.modelo} (${veiculo.ano}) - R$ ${parseFloat(veiculo.valor).toFixed(2)}`;
        veiculoSelect.appendChild(option);
    });
}

document.getElementById('form-venda').addEventListener('submit', function(e) {
    e.preventDefault();

    const clienteIndex = document.getElementById('cliente-select').value;
    const veiculoIndex = document.getElementById('veiculo-select').value;
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];

    const venda = {
        cliente: clientes[clienteIndex].nome,
        veiculo: `${veiculos[veiculoIndex].marca} ${veiculos[veiculoIndex].modelo}`,
        ano: veiculos[veiculoIndex].ano,
        valor: veiculos[veiculoIndex].valor,
        data: new Date().toLocaleDateString()
    };

    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));

    renderVendas();
    alert('Venda registrada com sucesso!');
});

function renderVendas() {
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    const tbody = document.querySelector("#tabela-vendas tbody");
    tbody.innerHTML = '';

    vendas.forEach(venda => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venda.cliente}</td>
            <td>${venda.veiculo}</td>
            <td>${venda.ano}</td>
            <td>R$ ${parseFloat(venda.valor).toFixed(2)}</td>
            <td>${venda.data}</td>
        `;
        tbody.appendChild(row);
    });
}
