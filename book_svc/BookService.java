package com.journaldev.jaxws.service;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

import com.journaldev.jaxws.beans.Book;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface BookService{

	@WebMethod
	public Book[] getBooks(String keyword);

	@WebMethod
	public Book getBookDetail(int idBook);

	@WebMethod
	public boolean buyBook(int idBook);

	@WebMethod
	public Book[] recommendBooks(String category);
}
