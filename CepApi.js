function formatarCEP(input) {
    input.value = input.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substr(0, 9);
}

async function consultarCEP() {
    const cep = document.getElementById('cep').value.trim().replace("-","");
    const resultado = document.getElementById('container_resultado');

    // Limpar conteúdo anterior
    resultado.innerHTML = '';

    // Validação básica CEP
    if (!/^[0-9]{8}$/.test(cep)) {
        resultado.innerHTML = '<p class="erro">Por favor, insira CEP válido de 8 dígitos.</p>';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultado.innerHTML = '<p class="erro">CEP não encontrado.</p>';
        } else {
            resultado.innerHTML = `
                <p><strong>Endereço:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;
        }
    } catch (error) {
        resultado.innerHTML = '<p class="erro">Erro buscar CEP. Tente novamente tarde.</p>';
    }
}