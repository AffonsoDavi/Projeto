COLDIGO.produto = new Object();

$(document).ready(function() {
	
	//Carrega as marcas registradas no Bd no select do formulario de inserir
	COLDIGO.produto.carregarMarcas = function(){
		alert("Tentando buscar marcas");
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			success: function (marcas) {
				
				if (marcas!=""){
					
					$("#selMarca").html("");
					var option = document.createElement("option");
					option.setAttribute ("value", "");
					option.innerHTML = ("Escolha");
					$("#selMarca").append(option);
					
					for (var i = 0; i < marcas.length; i++) {
						
						var option = document.createElement("option");
						option.setAttribute ("value", marcas[i].id);
						option.innerHTML = (marcas[i].nome);
						$("#selMarca").append(option);						
					}
					
				}else{
					
					$("#selMarca").html("");
					
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Cadastre uma marca primeiro!");
					$("#selMarca").append(option);
					$("#selMarca").addClass("aviso");
				}
				
			},
			error: function (info) {
				COLDIGO.exibirAviso("Erro ao buscar as marcas: "+ info.status + " - " + info.statusText);
				
				$("selMarca").html("");
				var option = document.createElement("option");
				option.setAttribute ("value", "");
				option.innerHTML = ("Erro ao carregar marcas!");
				$("#selMarca").append(option);
				$("#selMarca").addClass("aviso");
			}
		});
	}
	
	COLDIGO.produto.carregarMarcas();
	
	//carrega no BD o produto informado
	COLDIGO.produto.cadastrar = function(){
		var produto = new Object();
		produto.categoria = document.frmAddProduto.categoria.value;
		produto.marcaId = document.frmAddProduto.marcaId.value;
		produto.modelo = document.frmAddProduto.modelo.value;
		produto.capacidade = document.frmAddProduto.capacidade.value;
		produto.valor = document.frmAddProduto.valor.value;
		
		 //valida o campo valor
		// var expRegValor = new RegExp("^[0-9]{1,}[,]{1}[0-9]{2}$");
		// if(!expRegValor.test(produto.valor)){
		//	 alert("Preencha o campo Valor corretamente");
		//	 document.frmAddProduto.valor.focus();
		//	 return false;
		// }
		 
		//valida os outros campos do formulario
		if((produto.categoria=="")||(produto.marcaId=="")||(produto.modelo=="")
		||(produto.capacidade=="")){
			COLDIGO.exibirAviso("Preencha todos os campos!");
	
	
		
	console.log(produto.valor);
		}else{
			
			//trasforma a "," em "."
			produto.valor = produto.valor.replace(",",".");	
			
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "produto/inserir",
				data: JSON.stringify(produto),
				success: function (msg){
					COLDIGO.exibirAviso(msg);
					$("#addProduto").trigger("reset");
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar um novo produto:" + info.status + " - " + info.statusText);
				}
			});
		}
	}
});