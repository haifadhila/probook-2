package com.journaldev.jaxws.service;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import java.io.IOException;

import com.journaldev.jaxws.beans.Book;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface BookService{

	@WebMethod
	public Book[] getBooks(String keyword) throws IOException;

	@WebMethod
	public Book getBookDetail(String idBook);

	@WebMethod
	public boolean buyBook(String idBook);

	@WebMethod
	public Book[] recommendBooks(String category);
}
