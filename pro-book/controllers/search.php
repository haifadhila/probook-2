<?php
(basename(__FILE__) !== basename($_SERVER['SCRIPT_NAME'])) or die;

if (!isset($_REQUEST['search'])) {
    require 'views/search-book.php';
} else {
    ini_set('soap.wsdl_cache_enabled', 0);
    ini_set('soap.wsdl_cache_ttl', 900);
    ini_set('default_socket_timeout', 600);

    $wsdl = 'http://localhost:8888/ws/probook?wsdl';

    $soap = new SoapClient($wsdl);
    $data = $soap->getBooks($_REQUEST['search']);

    // DATABASE CONNECT (to input reviews)
    global $db_conn;
    $reviewstmt = $db_conn->prepare('select rating
      from Reviews natural join Transactions natural join Users
      where idBook = ?');

    for ($i = 0; $i < sizeof($data->item); $i++) {
        $bookid = $data->item[$i]->idBook;
        $reviewstmt->execute([$bookid]);
        $reviews = $reviewstmt->fetchAll();
        $reviewCount = count($reviews) + $data->item[$i]->ratingCount;
        if($reviewCount == 0) {
          $avgrating = 0;
        }
        else {
          $sumrating = $data->item[$i]->ratingCount * $data->item[$i]->rating;
          foreach ($reviews as $review) {
            $sumrating += floatval($review['rating']);
          }
          $avgrating = $sumrating / $reviewCount;
        }
          $data->item[$i]->rating = $avgrating;
          $data->item[$i]->ratingCount = $reviewCount;
    }

    $result = json_encode($data);
    echo($result);
}
?>
