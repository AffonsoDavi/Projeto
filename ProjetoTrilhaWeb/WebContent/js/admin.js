//cria o objeto COLDIGO, que sera usado como identificador do projeto
COLDIGO = new Object();

$(document).ready(function() {
	
	$("header").load("/_ProjetoTrilhaWeb/pages/admin/general/header.html");
	$("footer").load("/_ProjetoTrilhaWeb/pages/admin/general/footer.html");
	
	//funcao para carregamento de paginas de conteudo, que 
	//recebe como parametro o nome da pasta com a pagina a ser carregada
	COLDIGO.carregaPagina = function(pagename){
		//Limpa a tag section, excluindo todo o conteudo de dentro dela
		$("section").empty();
		//carrega a pagina solicitada dentro da tag section
		$("section").load(pagename+"/", function(response, status, info){
			if (status == "error"){
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("section").html(msg);
			}
		});
	}
});