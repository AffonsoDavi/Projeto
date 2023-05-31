COLDIGO.produto = new Object();

$(document).ready(function() {
	
	//Carrega as marcas registradas no Bd no select do formulario de inserir
	COLDIGO.produto.carregarMarcas = function(){
		$.ajax({
			type: "GET",
			url: "/_ProjetoTrilhaWeb/rest/marca/buscar",
			sucess: function () {
			},
			error: function () {
			}
		})
	}
});