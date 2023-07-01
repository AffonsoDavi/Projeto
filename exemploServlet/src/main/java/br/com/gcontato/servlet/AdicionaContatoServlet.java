package br.com.gcontato.servlet;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class AdicionaContatoServlet extends HttpServlet {

	private static final long serialVersionUID =1L;
	
	public AdicionaContatoServlet() {
		super();
	}
	
	
	
	@Override
	protected void service(HttpServletRequest request,
			HttpServletResponse response)
		throws ServletException, IOException{
		
		PrintWriter out = response.getWriter();
		String nome = request.getParameter("nome");
		String endereco = request.getParameter("endereco");
		String telefone = request.getParameter("telefone");
		
		out.println("<p>Nome: " + nome + "</p>"); 
		out.println("<p>Endereco: " + endereco + "</p>");
		out.println("<p>Telefone: " + telefone + "</p>");
		
	}
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response)
		throws ServletException, IOException{
		
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
		throws ServletException, IOException{
		
	}
		
	
}
