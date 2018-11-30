package bookservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Random;
import java.util.Set;

// For JSON
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

// For connection to MySQL
import java.sql.*;

import javax.jws.WebService;
import java.sql.*;

import bookservice.Book;

@WebService(endpointInterface = "bookservice.BookService")
public class BookServiceImpl implements bookservice.BookService {

    // GET BOOKS: TO RETURN BOOK RESULTS FROM SEARCHBOOK
    @Override
    public Book[] getBooks(String keyword) throws IOException, JSONException {
        return getBooksQuery("intitle", keyword);
    }

    protected Book[] getBooksQuery(String operator, String keyword) throws IOException, JSONException {

        // Replace whitespace to "+" for keyword
        keyword = keyword.replace(" ","+");

        // Define User
        String USER_AGENT = "Mozilla/5.0";
        // Define Google Books API URL
        String GET_URL = "https://www.googleapis.com/books/v1/volumes?q="+operator+":"+keyword;

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
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            try{
                // Convert string to JSON
                JSONObject booklist = new JSONObject(response.toString());
                JSONArray bookitems = booklist.getJSONArray("items");

                // Add data from googlebooksAPI to Books array
                Book[] bookArray = new Book[bookitems.length()];
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
                        b.setAuthor("Anonymous");
                    // book image
                    if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("imageLinks"))
                        b.setCover(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getJSONObject("imageLinks").getString("thumbnail"));
                    else
                        b.setCover("https://www.freeiconspng.com/uploads/no-image-icon-4.png");
                    // book category
                    if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("categories")){
                        String cat = bookitems.getJSONObject(i).getJSONObject("volumeInfo").getJSONArray("categories").getString(0);
                        cat = cat.replace("'","");
                        b.setCategory(cat);
                    }
                    else
                        b.setCategory("-");
                    // book description
                    if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("description"))
                        b.setDescription(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getString("description"));
                    else
                        b.setDescription("No description yet.");
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
                    //
                    if (bookitems.getJSONObject(i).getJSONObject("volumeInfo").has("ratingsCount"))
                        b.setRatingCount(bookitems.getJSONObject(i).getJSONObject("volumeInfo").getInt("ratingsCount"));
                    else
                        b.setRatingCount(0);
                    //

                    // TEST CONNECT TO MYSQL
                    if (!(b.getSaleability()).equals("NOT_FOR_SALE")){
                        try{
                            String query = String.format("INSERT INTO books values ('"+b.getIdBook()+"',"+b.getPrice()+",'"+b.getCategory()+"');");
                            System.out.println(query);
                            Connection conDB = DriverManager.getConnection(
                                                                           "jdbc:mysql://localhost:3306/booksvc",
                                                                           "root",""
                                                                           );
                            Statement stmt = conDB.createStatement();
                            stmt.executeUpdate(query);
                            // while(rs.next()){
                            //  System.out.println(rs.getString(1));
                            // }
                            conDB.close();
                        }
                        catch(Exception e){
                            System.out.println(e);
                        }
                    }

                    // assign to array
                    bookArray[i] = b;
                }
                return bookArray;
            }
            catch (JSONException e){
                System.out.println("NO BOOK");
                Book[] bookArray = new Book[1];
                return bookArray;
            }
        }
        else { // if not success
            Book[] bookArray = new Book[1];
            System.out.println("GET request failed");
            return bookArray;
        }
    }

    // GET BOOK DETAIL: TO RETURN BOOK DETAILS TO SHOW
    @Override
    public Book getBookDetail(String idBook) throws IOException{
        // Define User
        String USER_AGENT = "Mozilla/5.0";
        // Define Google Books API URL
        String GET_URL = "https://www.googleapis.com/books/v1/volumes/"+idBook;

        // Get URL and check connection
        URL obj = new URL(GET_URL);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);
        int responseCode = con.getResponseCode();
        System.out.println("GET Response Code :: " + responseCode);

        // If response code = 200, then success and read response
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Convert string to JSON
            JSONObject details = new JSONObject(response.toString());

            Book b = new Book();
            // get values, if string attributes are not present, set to "-"
            // idBook
            b.setIdBook(details.getString("id"));
            // book title
            b.setTitle(details.getJSONObject("volumeInfo").getString("title"));
            // book author
            if (details.getJSONObject("volumeInfo").has("authors"))
                b.setAuthor(details.getJSONObject("volumeInfo").getJSONArray("authors").getString(0));
            else
                b.setAuthor("Anonymous");
            // book image
            if (details.getJSONObject("volumeInfo").has("imageLinks"))
                b.setCover(details.getJSONObject("volumeInfo").getJSONObject("imageLinks").getString("thumbnail"));
            else
                b.setCover("https://www.freeiconspng.com/uploads/no-image-icon-4.png");
            // book category
            if (details.getJSONObject("volumeInfo").has("categories")){
                String cat = details.getJSONObject("volumeInfo").getJSONArray("categories").getString(0);
                cat = cat.replace("'","");
                b.setCategory(cat);
            }
            else
                b.setCategory("-");
            // book description
            if (details.getJSONObject("volumeInfo").has("description"))
                b.setDescription(details.getJSONObject("volumeInfo").getString("description"));
            else
                b.setDescription("No description yet.");
            // book saleability
            b.setSaleability(details.getJSONObject("saleInfo").getString("saleability"));
            // book price
            if (details.getJSONObject("saleInfo").has("retailPrice"))
                b.setPrice(details.getJSONObject("saleInfo").getJSONObject("retailPrice").getDouble("amount"));
            else
                b.setPrice(0);
            // book average rating
            if (details.getJSONObject("volumeInfo").has("averageRating"))
                b.setRating(details.getJSONObject("volumeInfo").getFloat("averageRating"));
            else
                b.setRating(0);
            // rating count
            if (details.getJSONObject("volumeInfo").has("ratingsCount"))
                b.setRatingCount(details.getJSONObject("volumeInfo").getInt("ratingsCount"));
            else
                b.setRatingCount(0);

            return b;
        }
        else { // if not success
            Book b = new Book();
            System.out.println("GET request failed");
            return b;
        }
    }

    // TO BUY BOOK
    @Override
    public boolean buyBook(String idBook, int qty, String senderNum) throws IOException {

        // Query book details dari database
        Book b = new Book();
        Connection connectToDB = null;
        try {
            connectToDB = DriverManager.getConnection("jdbc:mysql://localhost:3306/booksvc", //alamat localhost book
                                                                 "root","");
            try {
                String queryDB = String.format("SELECT idBook, price, category FROM transactions NATURAL JOIN books WHERE idBook='%s'",idBook); //input query
                Statement stat = connectToDB.createStatement();
                ResultSet res = stat.executeQuery(queryDB);

                while (res.next()){
                    b.setIdBook(res.getString(1));
                    b.setCategory(res.getString(3));
                    b.setPrice(res.getFloat(2)); //liat column berapa
                }
            } catch (Exception e){
                System.out.println(e);
                return false;
            }

            // Lakukan request ke webservice bank
            String USER_AGENT = "Mozilla/5.0";
            //    String POST_URL = "http://localhost..."; //localhost untuk transfer
            //    String POST_PARAM = "nomorPengirim=" + senderNum + "&nomorPenerima=" + 999999 + "&jumlah=" + qty*b.getPrice(); //masukkan hasil append + parameter
            String POST_URL = "http://localhost:3000/transfer"; //localhost untuk transfer
            String POST_PARAM = "nomorPengirim=" + senderNum + "&nomorPenerima=" + 999999 + "&jumlah=" + qty*b.getPrice(); //masukkan hasil append + parameter
            URL obj = new URL(POST_URL);

            HttpURLConnection APIconnect = (HttpURLConnection) obj.openConnection();
            APIconnect.setRequestMethod("POST");
            APIconnect.setRequestProperty("User-Agent", USER_AGENT);

            APIconnect.setDoOutput(true);
            OutputStream ostream = APIconnect.getOutputStream();
            ostream.write(POST_PARAM.getBytes());
            ostream.flush();
            ostream.close();

            int responseCode = APIconnect.getResponseCode(); //Kondisi sukses
            System.out.println("POST Response Code : " + responseCode);
            if (responseCode != HttpURLConnection.HTTP_OK) {
                System.out.println("POST Request aren't working");
                return false;
            }

            try {
                PreparedStatement st = connectToDB.prepareStatement("INSERT INTO transactions (idBook, quantity) VALUES (?, ?)");
                st.setString(1, b.getIdBook());
                st.setInt(2, qty);
                st.executeUpdate();
            } catch (Exception e) {
                System.out.println(e);
                return false;
            }

            return true;
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            if (connectToDB != null) {
                try {
                    connectToDB.close();
                } catch (SQLException e) { /* eat it */ }
            }
        }
    }

    // RECOMMEND BOOK: TO RETURN RECOMMENDED BOOK BASED ON CATEGORY
    @Override
    public Book recommendBook(String category) throws IOException {
        Connection conn = null;
        Random rand = new Random();
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/booksvc", //alamat localhost book
                                               "root","");
            PreparedStatement st = conn.prepareStatement("SELECT books.idBook, SUM(quantity) AS total FROM transactions JOIN books ON transactions.idBook = books.idBook WHERE books.category=? GROUP BY books.idBook ORDER BY total DESC LIMIT 1");
            st.setString(1, category);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                // we have a book!
                String idBook = rs.getString(1);
                rs.close();
                return getBookDetail(idBook);
            } else {
                // get a random book
                try {
                    Book books[] = getBooksQuery("subject", category);
                    return books[rand.nextInt(books.length)];
                } catch (JSONException e) {
                    return null;
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) { /* eat it */ }
            }
        }
    }

}
