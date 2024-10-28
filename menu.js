function renderVeiculos() {
  
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

  
    const tbody = document.querySelector("#tabela-veiculos tbody");
    tbody.innerHTML = ''; 

    
    veiculos.forEach(veiculo => {
        const row = document.createElement('tr'); // Cria uma nova linha da tabela
        
        
        row.innerHTML = `
            <td>${veiculo.marca}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.ano}</td>
        `;
        
        tbody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', renderVeiculos);
