var arquivoNome = process.argv[2];
var array = [];
var result = new Object();
result.uf = {};
result.valores = {};
var id = '';
var qtd = 0, valor = 0;
function getExtensao (arquivoNome) {
	var iniExt = arquivoNome.lastIndexOf(".");
	var extensao = arquivoNome.substring(iniExt + 1, arquivoNome.length);
	return extensao;
}
array = require(__dirname + '/' + arquivoNome);
console.log(array.valores[0].nome);
function getIDRN (array)
{
	for (var i = 0; i < array.valores.length; i++)
	{
		if (array.valores[i].nome == 'Rio Grande do Norte') 
		{
			result.uf.id = 0/*array.valores[i].id*/;
			result.uf.nome = array.valores[i].nome;
			id = array.valores[i].id;
		}
	}
	return id;
}
id = getIDRN(array);
var ClienteRest = require('node-rest-client').Client;
var rest = new ClienteRest();
var url = "http://api.pgi.gov.br/api/1/serie/27.json";
var processar_resposta = function(data, response) {
	imprimir_dados(data);
	var fs = require('fs');
	fs.writeFile('resultado.json', JSON.stringify(imprimir_dados(data)), function (err) {
		if (err) return console.log(err);
		console.log("Intervalos salvos")
	});
};
function imprimir_dados(dados) {
	result.fontes += url;
	result.fontes += array.url_origem;
	for (var i = 0; i < dados.valores.length; i++)
	{
		if (dados.valores[i].estado_ibge == 24)
		{
			result.valores.ano = dados.valores[i].ano;
			result.valores.municipios_atendidos = dados.valores[i].valor;
			valor += dados.valores[i].valor;
			qtd++;
//console.log(dados.valores[i].valor);
}
}
result.media = Math.round(valor/qtd);
return result;
//console.log(Math.round(valor/qtd));
}
rest.get(url, processar_resposta);

/*
function escreverResultado(api)
{
fs.writeFile('resultado.json', JSON.stringify(api), function (err) {
if (err) return console.log(err);
console.log("Intervalos salvos")
});
}
getArrayConjunto(arquivoNome);*/