<?php
(basename(__FILE__) !== basename($_SERVER['SCRIPT_NAME'])) or die;

global $db_conn;
global $router_extrapath;
$id = intval($router_extrapath);
echo $id;
echo "Hello";
$book = $id;

if($book == false) {
  http_response_code(404);
  require 'views/not-found.php';
  die;
}

// $reviews = $reviewstmt->fetchAll();
// if(count($reviews) == 0) {
//   $avgrating = 0;
// } else {
//   $sumrating = 0;
//   foreach ($reviews as $review) {
//     $sumrating += floatval($review['rating']);
//   }
//   $avgrating = $sumrating / count($reviews);
// }
require 'views/book-detail.php';
