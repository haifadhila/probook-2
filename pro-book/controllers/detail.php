<?php
  (basename(__FILE__) !== basename($_SERVER['SCRIPT_NAME'])) or die;

  global $router_extrapath;
  $id = $router_extrapath;

  ini_set('soap.wsdl_cache_enabled', 0);
  ini_set('soap.wsdl_cache_ttl', 900);
  ini_set('default_socket_timeout', 600);

  $wsdl = 'http://localhost:8888/ws/probook?wsdl';

  $soap = new SoapClient($wsdl);
  $detail = $soap->getBookDetail($id);

// DATABASE CONNECT
  global $db_conn;
  $reviewstmt = $db_conn->prepare('select picture, username, comment, rating
    from Reviews natural join Transactions natural join Users
    where idBook = ?');
  $reviewstmt->execute([$id]);
  $reviews = $reviewstmt->fetchAll();
  $reviewCount = count($reviews) + $detail->ratingCount;
  if($reviewCount == 0) {
    $avgrating = 0;
  } else {
    $sumrating = $detail->ratingCount * $detail->rating;
    foreach ($reviews as $review) {
      $sumrating += floatval($review['rating']);
    }
    $avgrating = $sumrating / $reviewCount;
  }

  // INSERT BOOK DATA TO PROBOOK DB
  $reviewstmt = $db_conn->prepare("
  INSERT INTO Books (idBook, title, author, cover)
  SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp
  WHERE NOT EXISTS (
      SELECT idBook FROM Books WHERE idBook = ?
  ) LIMIT 1;
  ");
  $reviewstmt->execute([$detail->idBook, $detail->title, $detail->author, $detail->cover, $detail->idBook]);

  // Get book recommendations
  $rec = $soap->recommendBook($detail->category);

  require 'views/book-detail.php';

?>
