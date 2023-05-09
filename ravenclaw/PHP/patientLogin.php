<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
header("Content-Type: application/json");

// Define the database connection
$dsn = 'sqlite:GP_Local.db';
try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the patient record from the database
    $input_data = json_decode(file_get_contents('php://input'), true);
    $query = "SELECT * FROM GPPatient WHERE NHSNumber = :NHSNumber AND Password = :Password ";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':NHSNumber', $input_data["nhsNumber"]);
    $stmt->bindParam(':Password', $input_data["password"]);
    // echo json_encode(["message"=> "error"]);
    try {
        if($stmt->execute()){
            $patient = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($patient);
        }else{
            echo json_encode(["message"=> "error"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error fetching patient record: " . $e->getMessage()]);
    }
}
