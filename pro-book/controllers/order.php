<?php
(basename(__FILE__) !== basename($_SERVER['SCRIPT_NAME'])) or die;

global $db_conn;
global $auth_user;
global $router_extrapath;
$content = json_decode(file_get_contents('php://input'), true);

$orderDate = date('Y-m-d');
$orderstmt = $db_conn->prepare('insert into Transactions(idBook,
  idUser, orderDate, quantity)  
  values (?, ?, ?, ?)');
$orderstmt->execute([$content['idBook'], $auth_user['idUser'], $orderDate, $content['quantity']]);
if($orderstmt) {
  $last_id = $db_conn->lastInsertId();
}
$result = array("idTransaction"=>$last_id);

ini_set('soap.wsdl_cache_enabled', 0);
ini_set('soap.wsdl_cache_ttl', 900);
ini_set('default_socket_timeout', 600);

$wsdl = 'http://localhost:8888/ws/probook?wsdl';

$soap = new SoapClient($wsdl);
$soap->buyBook($content['idBook'], $content['quantity'], $auth_user['card_number']);
var_dump($content['idBook']);

header('content-type: application/json; charset=utf-8');
echo json_encode($result);
