// Carregar clientes, veículos e vendas ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarOpcoesClientes();
    carregarOpcoesVeiculos();
    renderVendas();
});

// Função para carregar opções de clientes no seletor de vendas
function carregarOpcoesClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteSelect = document.getElementById('cliente-select');
    clienteSelect.innerHTML = ''; // Limpa opções anteriores

    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
}

// Função para carregar opções de veículos no seletor de vendas
function carregarOpcoesVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const veiculoSelect = document.getElementById('veiculo-select');
    veiculoSelect.innerHTML = ''; // Limpa opções anteriores

    veiculos.forEach((veiculo, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${veiculo.marca} ${veiculo.modelo} (${veiculo.ano}) - R$ ${parseFloat(veiculo.valor).toFixed(2)}`;
        veiculoSelect.appendChild(option);
    });
}

// Registrar a venda ao enviar o formulário de vendas
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

// Função para renderizar a tabela de vendas
function renderVendas() {
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    const tbody = document.querySelector("#tabela-vendas tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

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
