<?php

// Public: User assoc-array from DB
$auth_user = null;

// Public: called to authorize client for $uid
function set_token($uid) {
  set_auth_cookie(create_token($uid));
}

// Public: called to deauth client
function unset_token($cleanup = true) {
  unset_auth_cookie();
  destroy_token();
  if ($cleanup === true)
    cleanup_tokens();
}

// Public: called to check if the client is logged in and load $auth_user
function check_access() {
  global $auth_user;
  $token = get_auth_cookie();
  if (!isset($token))
    return false;
  $uid = validate_token($token);
  if (!isset($uid))
    return false;
  $user = get_user($uid);
  if (!$user) {
    unset_token(false);
    return false;
  }
  $auth_user = $user;
  return true;
}

// Validate token - Actual access checks; returns uid
function validate_token($token) {
  // Auth token should be exactly 24 characters long
  if (strlen($token ?? '') !== 24) {
    error_log('bad token len');
    unset_auth_cookie();
    return false;
  }
  $token_info = get_token_info($token);
  if (!$token_info) { // token not found
    error_log('token not found');
    unset_auth_cookie();
    return false;
  }
  // Check token expiry
  if ($token_info['expired']) {
    error_log('token expired');
    unset_token(false);
    return null;
  }
  // Check client IP
  if ($_SERVER['REMOTE_ADDR'] !== $token_info['clientIp']) {
    error_log('wrong ip');
    return null;
  }
  // Check client User-Agent
  // MD5 is fine because User-Agent is spoofable anyway
  $ua = base64_encode(md5($_SERVER['HTTP_USER_AGENT'] ?? '', true));
  if ($ua !== $token_info['userAgentHash']) {
    error_log('wrong ua');
    return null;
  }
  // Check idUser
  if (isset($token_info['idUser']))
    return intval($token_info['idUser']); // all OK
  else {
    error_log('user is null');
    return null;
  }
}

// Create token for $uid and insert it; returns idToken
function create_token($uid) {
  global $auth_token_max_age;
  $token_info = [];
  $token_info['idToken'] = base64_encode(openssl_random_pseudo_bytes(18));
  // This may be off by 1 second if PHP and DB time zones do not match
  // and there's a leap second coming
  $expiry = new DateTime(get_db_time());
  $expiry->add(new DateInterval("PT${auth_token_max_age}S"));
  $token_info['expiry'] = $expiry->format('Y-m-d H:i:s');
  $token_info['idUser'] = intval($uid);
  $token_info['clientIp'] = $_SERVER['REMOTE_ADDR'];
  $ua = base64_encode(md5($_SERVER['HTTP_USER_AGENT'] ?? '', true));
  $token_info['userAgentHash'] = $ua;
  insert_token_info($token_info);
  return $token_info['idToken'];
}

// Manipulate browser-side cookies

function get_auth_cookie() {
  return $_COOKIE['authToken'] ?? null;
}

function set_auth_cookie($token) {
  // Make this a session cookie
  setcookie('authToken', $token, 0, urlencode(make_url('')), '', false, true);
}

function unset_auth_cookie() {
  if (isset($_COOKIE['authToken']))
    setcookie('authToken', false, 1, urlencode(make_url('')), '', false, true);
}

// Get user from DB

function get_user($uid) {
  global $db_conn;
  if (!is_int($uid))
    return null;
  $stmt = $db_conn->prepare('select * from Users where idUser = ?');
  $stmt->execute([$uid]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  $user['idUser'] = intval($user['idUser']);
  return $user;
}

// Manipulate in-DB tokens

function get_db_time() {
  global $db_conn;
  $res = $db_conn->query('select current_timestamp');
  return $res->fetchColumn();
}

function insert_token_info($token_info) {
  global $db_conn;
  $stmt = $db_conn->prepare('insert into AuthTokens
      (idToken, expiry, idUser, clientIp, userAgentHash)
      values (:idToken, :expiry, :idUser, :clientIp, :userAgentHash)');
  $stmt->execute($token_info);
}

function get_token_info($token) {
  global $db_conn;
  $stmt = $db_conn->prepare('select
      idToken, expiry, idUser, clientIp, userAgentHash,
      expiry < current_timestamp as expired
      from AuthTokens
      where idToken = ?');
  $stmt->execute([$token]);
  $token_info = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$token_info) // token not found
    return null;
  $token_info['expired'] = boolval($token_info['expired']);
  return $token_info;
}

function destroy_token() {
  global $db_conn;
  $token = get_auth_cookie();
  if (!isset($token))
    return false;
  $stmt = $db_conn->prepare('delete from AuthTokens where idToken = ?');
  $stmt->execute([$token]);
  return true;
}

function cleanup_tokens() {
  global $db_conn;
  $num_deleted = $db_conn->exec('delete from AuthTokens
      where expiry < current_timestamp');
  return $num_deleted;
}
