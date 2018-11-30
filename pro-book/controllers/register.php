<?php
(basename(__FILE__) !== basename($_SERVER['SCRIPT_NAME'])) or die;

function check_username($username) {
  global $db_conn;
  if (strlen($username) > 20 || strlen($username) < 1)
    return false;
  $stmt = $db_conn->prepare('select count(*) as c from Users where username=?');
  $stmt->execute([$username]);
  $num = intval($stmt->fetchColumn());
  return !($num > 0);
}

function check_email($email) {
  global $db_conn;
  if (strlen($email) < 1)
    return false;
  if (filter_var($email, FILTER_VALIDATE_EMAIL) !== $email)
    return false;
  $stmt = $db_conn->prepare('select count(*) as c from Users where email=?');
  $stmt->execute([$email]);
  $num = intval($stmt->fetchColumn());
  return !($num > 0);
}

function check_cardnumber($cardnumber){
    global $bank_svc_url;
    $curl = curl_init();
    $url = "$bank_svc_url/card/$cardnumber";
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
    $info = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    return ($info == 200);
}

global $router_extrapath;

if ($router_extrapath === 'validate') {
  require 'controllers/register-validate.php';
} else if($_SERVER['REQUEST_METHOD'] === 'GET') {
  require 'views/user-register.php';
} else {
  require 'controllers/register-create.php';
}
