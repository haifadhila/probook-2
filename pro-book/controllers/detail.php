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

  require 'views/book-detail.php';

?>
