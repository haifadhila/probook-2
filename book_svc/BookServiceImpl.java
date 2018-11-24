package com.journaldev.jaxws.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.jws.WebService;

import com.journaldev.jaxws.beans.Book;

@WebService(endpointInterface = "com.journaldev.jaxws.service.BookService")
public class BookServiceImpl implements BookService {

	private static Map<Integer,Book> books = new HashMap<Integer,Book>();

	@Override
	public boolean addBook(Book b) {
		if(books.get(b.getIdBook()) != null) return false;
		books.put(b.getIdBook(), b);
		System.out.println(b.getTitle()+" Added.");
		return true;
	}

	@Override
	public boolean deleteBook(int id) {
		if(books.get(id) == null) return false;
		books.remove(id);
		return true;
	}

	@Override
	public Book getBook(int id) {
		return books.get(id);
	}

	@Override
	public Book[] getAllBooks() {
		Set<Integer> ids = books.keySet();
		Book[] b = new Book[ids.size()];
		int i=0;
		for(Integer idBook : ids){
			b[i] = books.get(idBook);
			i++;
		}
		return b;
	}

}
