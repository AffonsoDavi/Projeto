COLDIGO.marcas = new Object();

 $(document).ready(function() {
	
	COLDIGO.marcas.cadastrar = function(){
		var marca = new Object();
		marca.nome = document.frmAddMarca.nomeMarca.value;
		
		if(marca.nome ==""){
			COLDIGO.exibirAviso("Preencha com o nome da Marca!"); 	
		
		}else{
			
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data: JSON.stringify(marca),
				success:function (msg){
					COLDIGO.exibirAviso(msg);
					$("#addMarca").trigger("reset");
					COLDIGO.marcas.buscar();
					
				},
				error: function(info){
					COLDIGO.exbirAviso("Erro ao cadastrar uma nova marca!" + info.status + " - " + info.statusText);
				}
			});
		}
	};
	
	COLDIGO.marcas.buscar = function(){
			
			var valorBusca = $("#campoBuscaMarca").val();
			
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data: "valorBusca="+valorBusca,
			success: function(marcas){
				$("#listaMarcas").html(COLDIGO.marcas.exibir(marcas));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
		});
	};

	COLDIGO.marcas.exibir = function(listaDeMarcas){
		var tabela = "<table>" +
			"<tr>" +
			"<th>Nome da Marca</th>" +
			"<th class='acoes'>Ações</th>" +
			"</tr>";
		
		if (listaDeMarcas !== undefined && listaDeMarcas.length > 0){
			for(var i=0; i< listaDeMarcas.length; i++){
				
				tabela += "<tr>" +
					"<td>"+listaDeMarcas[i].nome+"</td>" +
					"<td>" +
						"<a onclick=\"COLDIGO.marcas.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a> " +
						"<a onclick=\"COLDIGO.marcas.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a> " +
					"</td>" +
					"</tr>";
			}
		}else{
		tabela += "<tr><td>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</table>";
	
		return tabela;
		};
		
	//instacia a funcao ao carregar a pagina
	COLDIGO.marcas.buscar();

//exclui a marca selecionada
	COLDIGO.marcas.excluir = function(id){
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "marca/excluir/"+id,
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marcas.buscar();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao excluir uma marca: "+ info.status + " - " + info.statusText);
			}
		});
	};

	COLDIGO.marcas.exibirEdicao = function(id){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nomeMarca.value = marca.nome;
			
				var modalEditaMarca = {
					title: "Editar Marca",
					height:	200, 
					width: 500, 
					modal: true, 
					buttons:{
						"Salvar": function(){
							COLDIGO.marcas.editar();
						},
						"Cancelar": function(){
							$(this).dialog("close");
						}
					},
					close: function(){	
					}
				};
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marca para edição:"+ info.status + " - " + info.statusText);
			}
		});
	};

	COLDIGO.marcas.editar = function(){
		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nomeMarca.value;
		
		if(marca.nomeMarca==""){
			COLDIGO.exibirAviso("Preencha com o nome da marca atualizado!");
			return false;
		}
		
			$.ajax({
				type: "PUT",
				url: COLDIGO.PATH + "marca/alterar",
				data: JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					COLDIGO.marcas.buscar();
					$("#modalEditaMarca").dialog("close");
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao editar produtos: " + info.status + " - " + info.statusText);
				}
			});
		}
});