// leitura do arquivo de entrada, nesse caso, dados.json
var arquivoNome = process.argv[2];

// array no qual ficarão salvos os dados em dados.json
var array = [];

// objeto que será escrito em resultado.json e algumas de suas propriedades
var result = new Object();
result.uf = {};
result.fontes = [];
result.valores = [];

// variável onde ficará guardado o ID do Estado do RN
var id = '';

// variáveis para cálculo de média
var qtd = 0, valor = 0;

array = require(__dirname + '/' + arquivoNome);

//função para pegar ID do RN
function getIDRN (array)
{
	for (var i = 0; i < array.valores.length; i++)
	{
		if (array.valores[i].nome == 'Rio Grande do Norte') 
		{
			// instanciamento da propriedade uf do objeto result
			result.uf.id = array.valores[i].id;
			result.uf.nome = array.valores[i].nome;
			// id do RN
			return id = array.valores[i].id;
		}
	}
	return 0;
}

id = getIDRN(array);

// função para manipulação do objeto result
function get_result(dados) {
	// instaciamento da propriedade fontes do objeto restul
	result.fontes[0] = url;
	result.fontes[1] = array.url_origem;
	for (var i = 0; i < dados.valores.length; i++)
	{
		if (dados.valores[i].estado_ibge == id)
		{
			// instaciamento da propriedade valores
			// é importante destacar que valores é um array de objetos, cujas propriedades são ano e municipios_atendidos
			result.valores[qtd] = {};
			result.valores[qtd].ano = dados.valores[i].ano;
			result.valores[qtd].municipios_atendidos = dados.valores[i].valor;

			// incremento no somatória do valor e quantidade
			valor += dados.valores[i].valor;
			qtd++;
		}
	}
	//instaciamento da propriedade media
	result.media = Math.round(valor/qtd);
	return result;
}


// não consigo explicar muito bem essa parte, mas o que entendi foi o seguinte
// ClienteRest é uma variável que guarda os dados da biblioteca node-rest-client, que, por sua vez,
// permite a conexão com api para obter, como resultado, objetos json
var ClienteRest = require('node-rest-client').Client;
var rest = new ClienteRest();

// variavel que guarda url da api
var url = "http://api.pgi.gov.br/api/1/serie/27.json";

//função de escrita no arquivo resultado.json
var processar_resposta = function(data, response) {
	var fs = require('fs');
	// no método stringify, os atributos null e 4 servem para fazer a formatação do json, mas não entendi 100% como
	// para entender melhor, retire esse atributos e veja como ficará o arquivo resultado.json
	fs.writeFile('resultado.json', JSON.stringify(get_result(data), null, 4), function (err) {
		if (err) return console.log(err);
		console.log("Arquivo salvo")
	});
};

// como não é necessária nenhuma chave, o método a se usar é get
rest.get(url, processar_resposta);