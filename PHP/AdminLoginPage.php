<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
header("Content-Type: application/json");
header("Access-Control-Request-Headers: *");

//Connecting to the SQLite database

$dbFile = `sqlite:/User/armelacupi2019/Desktop/GP_Local-3.db`;
$pdo = new PDO("sqlite:$dbFile");

//Retrieve admin Id and password from the POST request

$adminId = $_POST['adminId'] ?? '';
$password = $_POST['password'] ?? '';

//Prepare and execute a SELECT query to retrieve admin information

$stmt = $pdo->prepare('SELECT * FROM admins WHERE admin_id = :adminId');
$stmt->bindValue(':adminId', $adminId, PDO::PARAM_STR);
$stmt->execute();
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

//Check if admin exists and the password matches

if ($admin && password_verify($password, $admin['password'])) {
    // Admin authentication successful
    $response = array('status' => 'success', 'message' => 'Admin authentication successful');
  } else {
    // Admin authentication failed
    $response = array('status' => 'error', 'message' => 'Invalid admin credentials');
  }

  //Return the response as JSON

  echo json_encode($response);

  ?>