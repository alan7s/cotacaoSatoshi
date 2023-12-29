async function calcularCotacao() {
    // Obter os valores digitados pelo usuário
    var quantidadeCompra = document.getElementById("quantidadeCompra").value;

    // Validar se os campos foram preenchidos corretamente
    if (quantidadeCompra === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    try {
        document.getElementById("resultado").innerHTML = "Pesquisando..."
        // Obter a taxa de câmbio atual usando a API do CoinGecko
        var response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        var data = await response.json();
        var valorBTCReal = data.bitcoin.brl;

        var response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        var data = await response.json();
        var valorBTCDolar = data.bitcoin.usd;

        // Calcular o valor em Reais
        var sats = (quantidadeCompra / 100000000);
        var valorEmReais = sats * valorBTCReal;
        var valorEmDolar = sats * valorBTCDolar;

        // Exibir o resultado
        valorEmReais = valorEmReais.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        valorEmDolar = valorEmDolar.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'USD'
        });

        valorBTCReal = valorBTCReal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        valorBTCDolar = valorBTCDolar.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'USD'
        });

        // Exibir o resultado formatado em Real
        document.getElementById("resultado").innerHTML = valorEmReais + " @ " + valorBTCReal + "<br/>" + valorEmDolar + " @ " + valorBTCDolar;

    } catch (error) {
        document.getElementById("resultado").innerHTML = "Calma... dê um tempo e consulte novamente."
        console.error('Erro ao obter dados da API do CoinGecko', error);
    }
}
