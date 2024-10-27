// Carregar e renderizar os clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', renderClientes);

// Captura o evento de submissão do formulário e salva os dados do cliente no LocalStorage
document.getElementById('form-clientes').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = { nome, email, telefone };
    clientes.push(cliente);

    localStorage.setItem('clientes', JSON.stringify(clientes));

    document.getElementById('form-clientes').reset();
    renderClientes();
});

// Função para renderizar a tabela de clientes
function renderClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const tbody = document.querySelector("#tabela-clientes tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    clientes.forEach((cliente, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>
                <button class="edit-button" onclick="editCliente(${index})">Editar</button>
                <button class="delete-button" onclick="deleteCliente(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para editar cliente (exemplo)
function editCliente(index) {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    const cliente = clientes[index];

    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefone').value = cliente.telefone;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.className = 'edit-button';
    saveButton.onclick = function(e) {
        e.preventDefault();

        cliente.nome = document.getElementById('nome').value;
        cliente.email = document.getElementById('email').value;
        cliente.telefone = document.getElementById('telefone').value;

        localStorage.setItem('clientes', JSON.stringify(clientes));
        document.getElementById('form-clientes').reset();
        renderClientes();
        document.getElementById('form-clientes').replaceChild(cadastrarButton, saveButton);
    };

    const cadastrarButton = document.querySelector('#form-clientes button');
    document.getElementById('form-clientes').replaceChild(saveButton, cadastrarButton);
}

// Função para excluir cliente
function deleteCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes'));
    clientes.splice(index, 1); // Remove o cliente do array

    localStorage.setItem('clientes', JSON.stringify(clientes)); // Atualiza o LocalStorage
    renderClientes(); // Atualiza a tabela de clientes
}
