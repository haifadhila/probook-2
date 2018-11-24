package com.journaldev.jaxws.service;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

import com.journaldev.jaxws.beans.Book;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface BookService {

	@WebMethod
	public boolean addBook(Book b);

	@WebMethod
	public boolean deleteBook(int idBook);

	@WebMethod
	public Book getBook(int idBook);

	@WebMethod
	public Book[] getAllBooks();
}
