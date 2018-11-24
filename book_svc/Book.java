
package com.journaldev.jaxws.beans;

import java.io.Serializable;

public class Book implements Serializable{

	private static final long serialVersionUID = -5577579081118070434L;

	private int idBook;
	private String title;
	private String author;
	private String cover;
	private String category;
	private String description;
	private double price;

	// Book ID
	public int getIdBook(){
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	// Book Title
	public String getTitle(){
		return title;
	}

	public void setTitle (String title){
		this.title = title;
	}

	// Book Author
	public String getAuthor(){
		return author;
	}

	public void setAuthor (String author){
		this.author = author;
	}

	// Book Cover Photo
	public String getCover(){
		return cover;
	}

	public void setCover (String cover){
		this.cover = cover;
	}

	// Book Category
	public String getCategory(){
		return category;
	}

	public void setCategory(String category){
		this.category = category;
	}

	// Book Description
	public String getDescription(){
		return description;
	}

	public void setDescription(String description){
		this.description = description;
	}

	// Book Price
	public double getPrice(){
		return price;
	}

	public void setPrice(double price){
		this.price = price;
	}

	@Override
	public String toString(){
		return idBook+"::"+title+"::"+author+"::"+price;
	}

}
