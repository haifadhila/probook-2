package com.journaldev.jaxws.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.jws.WebService;

import com.journaldev.jaxws.beans.Book;

@WebService(endpointInterface = "com.journaldev.jaxws.service.BookService")
public class BookServiceImpl implements BookService {

	@Override
	public Book[] getBooks(String keyword) {
		Book[] b = new Book[10];
		return b;
	}

	@Override
	public Book getBookDetail(int idBook){
		Book b = new Book();
		return b;
	}

	@Override
	public boolean buyBook(int id) {
		return true;
	}

	@Override
	public Book[] recommendBooks(String category){
		Book[] b = new Book[10];
		return b;
	}

}
