<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
header("Content-Type: application/json");
header("Access-Control-Request-Headers: *");

$vaccine = 'sqlite:vaccines.db';
$local = 'sqlite:GP_Local.db';

try {
    $vaccine_pdo = new PDO($vaccine);
    $vaccine_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $local_pdo = new PDO($local);
    $local_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $inputUser = json_decode(file_get_contents("php://input"), true);
        $query = "SELECT NHSNumber, Forename, Surname, PersonDOB, GenderCode, Postcode
                  FROM patients 
                  WHERE Forename = :fName 
                  AND Surname = :sName";
        
        $stmt = $vaccine_pdo->prepare($query);
        $stmt->bindParam(':fName', $inputUser['fName']);
        $stmt->bindParam(':sName', $inputUser['sName']);
        
        if ($stmt->execute()) {
            $matchingPatient = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($matchingPatient) {
                // Prepare the SQL statement
                $insertStmt = $local_pdo->prepare("INSERT INTO Patient (Fname, Sname, DOB, GenderCode, Postcode, Email, Password, NHSNumber) 
                                        VALUES (:fName, :sName, :dob, :gender, :postcode, :email, :password, :NHSNumber)");

                // Bind the parameters with the values
                $insertStmt->bindParam(':fName', $matchingPatient['Forename']);
                $insertStmt->bindParam(':sName', $matchingPatient['Surname']);
                $insertStmt->bindParam(':dob', $matchingPatient['PersonDOB']);
                $insertStmt->bindParam(':gender', $matchingPatient['GenderCode']);
                $insertStmt->bindParam(':postcode', $matchingPatient['Postcode']);
                $insertStmt->bindParam(':email', $inputUser['email']);
                $insertStmt->bindParam(':password', $inputUser['password']);
                $insertStmt->bindParam(':NHSNumber', $matchingPatient['NHSNumber']);

                // Execute the statement
                if ($insertStmt->execute()) {
                    echo json_encode(["message" => "Patient information inserted into GP_Local.db"]);
                } else {
                    echo json_encode(["message" => "Failed to insert patient information into GP_Local.db"]);
                }
            } else {
                echo json_encode(["message" => "No matching patient found in the vaccine database"]);
            }
        } else {
            echo json_encode(["message" => "Error occurred while querying the vaccine database"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
        exit();
    }
}

// Handle patient deletion
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        $password = $data['password'];
        
        // Check if the password matches
        $selectStmt = $local_pdo->prepare("SELECT * FROM Patient WHERE password = :password");
        $selectStmt->bindParam(':password', $password);
        
        if ($selectStmt->execute()) {
            $matchingPatient = $selectStmt->fetch(PDO::FETCH_ASSOC);
            
            if ($matchingPatient) {
                // Delete the patient from GP_Local.db
                $deleteStmt = $local_pdo->prepare("DELETE FROM Patient WHERE password = :password");
                $deleteStmt->bindParam(':password', $password);
                
                if ($deleteStmt->execute()) {
                    echo json_encode(["message" => "Patient deleted from GP_Local.db"]);
                } else {
                    echo json_encode(["message" => "Failed to delete patient from GP_Local.db"]);
                }
            } else {
                echo json_encode(["message" => "No matching patient found in GP_Local.db"]);
            }
        } else {
            echo json_encode(["message" => "Error occurred while querying GP_Local.db"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
        exit();
    }
}


?>