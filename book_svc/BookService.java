package bookservice;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import java.io.IOException;

import bookservice.Book;
import org.json.JSONException;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface BookService{

	@WebMethod
	public Book[] getBooks(String keyword) throws IOException, JSONException;

	@WebMethod
	public Book getBookDetail(String idBook) throws IOException;

	@WebMethod
	public boolean buyBook(String idBook, int qty, String senderNum) throws IOException;

	@WebMethod
	public Book[] recommendBooks(String category);
}
