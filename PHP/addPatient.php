<?php 
header("Access-Control-Allow-Origin: *"); // allow requests from a specific domain
header("Access-Control-Allow-Headers: *"); // allow any headers in the request
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH"); // allow these HTTP methods
header("Content-Type: application/json"); // set the content type of the response to JSON
header("Access-Control-Request-Headers: *");

//Author: w1810699

try {
    $pdo = new PDO('sqlite:vaccines.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $vaccines_pdo = new PDO('sqlite:GP_Local.db');
    $vaccines_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" =>'Connection failed:' . $e->getMessage()]);
    exit();
} 

$NHSnumber = filter_input(INPUT_POST, 'NHSnumber');
$Email = filter_input(INPUT_POST, 'Email', FILTER_VALIDATE_EMAIL);
$password = filter_input(INPUT_POST, 'password');

if (!$NHSnumber || !$Email || !$password) {
    echo json_encode(["message" => "Invalid input parameters"]);
    exit();
}

$query = "SELECT * FROM patients WHERE NHSNumber = :NHSnumber";
$stmt = $vaccines_pdo->prepare($query);

if ($stmt) {
    $stmt->execute([':NHSnumber' => $NHSnumber]);
    $patient = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$patient) {
        echo json_encode(["message" => "Patient not found"]);
        exit();
    }

    $insertStmt = $pdo->prepare("INSERT INTO Patient (FName, SName, DOB, GenderCode, Postcode, EMail, password, NHSNumber) 
        VALUES (:fName, :sName, :dob, :gender, :postcode, :email, :password, :NHSnumber)");

    // Bind the parameters with the values
    $insertStmt->bindValue(':fName', $patient['Forename'], PDO::PARAM_STR);
    $insertStmt->bindValue(':sName', $patient['Surname'], PDO::PARAM_STR);
    $insertStmt->bindValue(':dob', $patient['PersonDOB'], PDO::PARAM_STR);
    $insertStmt->bindValue(':gender', $patient['GenderCode'], PDO::PARAM_STR);
    $insertStmt->bindValue(':postcode', $patient['Postcode'], PDO::PARAM_STR);
    $insertStmt->bindValue(':email', $Email, PDO::PARAM_STR);
    $insertStmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $insertStmt->bindValue(':NHSnumber', $patient['NHSNumber'], PDO::PARAM_STR);
} else {
    $insertStmt = $pdo->prepare("INSERT INTO Patient (NHSnumber, Email, password) VALUES (:NHSnumber, :Email, :password)");
    $insertStmt->bindValue(':NHSnumber', $NHSnumber, PDO::PARAM_STR);
    $insertStmt->bindValue(':Email', $Email, PDO::PARAM_STR);
    $insertStmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
}

try {
    $insertStmt->execute();
    echo json_encode(["message" => "Patient inserted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["message" => 'Insert failed']);
}
  ?>