<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066



 try {
     $pdo = new PDO('sqlite:GP_Local.db');
     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 } catch(PDOException $e) {
     echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
     exit();
 }

 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     // Fetch the patient record from the database
     $data = json_decode(file_get_contents('php://input'), true);

     $query = "SELECT * FROM GPPatient WHERE NHSNumber = :NHSNumber AND Password = :Password ";
     $stmt = $pdo->prepare($query);
     $stmt->bindParam(':NHSNumber', $data["nhsNumber"]);
     $stmt->bindParam(':Password', $data["password"]);
     try {
         if($stmt->execute()){
             $patient = $stmt->fetch(PDO::FETCH_ASSOC);
             if ($patient) {
                 // Login successful, return patient record
                 echo json_encode($patient);
             } else {
                 // Login credentials incorrect

                 echo json_encode(["message"=> "Invalid login credentials"]);
             }
         } else {
              //Error executing query

             echo json_encode(["message"=> "Error executing query"]);
         }
     } catch (PDOException $e) {

         echo json_encode(["message" => "Error fetching patient record: " . $e->getMessage()]);
     }
 }

