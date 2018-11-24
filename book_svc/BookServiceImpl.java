package com.journaldev.jaxws.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Set;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import javax.jws.WebService;

import com.journaldev.jaxws.beans.Book;

@WebService(endpointInterface = "com.journaldev.jaxws.service.BookService")
public class BookServiceImpl implements BookService {

	// GET BOOKS: TO RETURN BOOK RESULTS FROM SEARCHBOOK
	@Override
	public Book[] getBooks(String keyword) throws IOException, JSONException{
		// Replace whitespace to "+" for keyword
		keyword = keyword.replace(" ","+");

		// Define User
		String USER_AGENT = "Mozilla/5.0";
		// Define Google Books API URL
		String GET_URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+keyword;

		// Get URL and check connection
		URL obj = new URL(GET_URL);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("User-Agent", USER_AGENT);
		int responseCode = con.getResponseCode();
		System.out.println("GET Response Code :: " + responseCode);

		// If response code = 200, then success and read response
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			// Convert string to JSON
			JSONObject booklist = new JSONObject(response.toString());
			JSONArray bookitems = booklist.getJSONArray("items");

			// Add data from googlebooksAPI to Books array
			Book[] bookArray = new Book[bookitems.length()+1];
			for (int i=0; i<bookitems.length(); i++){
				Book b = new Book();
				// get values, if string attributes are not present, set to "-"
				// idBook
				b.setIdBook(bookitems.getJSONObject(i).getString("id"));
				// book title
				b.setTitle(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getString("title"));
				// book author
				if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("authors"))
					b.setAuthor(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getJSONArray("authors").getString(0));
				else
					b.setAuthor("-");
				// book image
				if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("imageLinks"))
					b.setCover(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getJSONObject("imageLinks").getString("thumbnail"));
				else
					b.setCover("-");
				// book category
				if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("categories"))
					b.setCategory(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getJSONArray("categories").getString(0));
				else
					b.setCategory("-");
				// book description
				if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("description"))
					b.setDescription(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getString("description"));
				else
					b.setDescription("-");
				// book saleability
				b.setSaleability(bookitems.getJSONObject(i).getJSONObject("saleInfo").getString("saleability"));
				// book price
				if (bookitems.getJSONObject(i).getJSONObject("saleInfo").has("retailPrice"))
					b.setPrice(bookitems.getJSONObject(i).getJSONObject("saleInfo").getJSONObject("retailPrice").getDouble("amount"));
				else
					b.setPrice(0);
				// book average rating
				if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("averageRating"))
					b.setRating(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getFloat("averageRating"));
				else
					b.setRating(0);

				// assign to array
				bookArray[i] = b;
			}
			return bookArray;
		}
		else { // if not success
			Book[] bookArray = new Book[1];
			System.out.println("GET request failed");
			return bookArray;
		}
	}

	// GET BOOK DETAIL: TO RETURN BOOK DETAILS TO SHOW
	@Override
	public Book getBookDetail(String idBook){
		Book b = new Book();
		return b;
	}

	// TO BUY BOOK
	@Override
	public boolean buyBook(String id) {
		return true;
	}

	// RECOMMEND BOOK: TO RETURN RECOMMENDED BOOK BASED ON CATEGORY
	@Override
	public Book[] recommendBooks(String category){
		Book[] b = new Book[10];
		return b;
	}

}
