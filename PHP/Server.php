<?php
header("Access-Control-Allow-Origin: *");  // Set the Access-Control-Allow-Origin header to allow cross-origin requests from any domain
header("Access-Control-Allow-Headers: *");  // Set the Access-Control-Allow-Headers header to allow all headers in the request
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");  // Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Content-Type: application/json");  // Set the Content-Type header to indicate that the response will be in JSON format
header("Access-Control-Request-Headers: *");  // Set the Access-Control-Request-Headers header to allow all headers in pre-flight requests

//set the connection for the databses
$vaccine = 'sqlite:vaccines.db';
$local = 'sqlite:GP_Local.db';

try {
    $vaccine_pdo = new PDO($vaccine);
    $vaccine_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $local_pdo = new PDO($local);
    $local_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]); // Output an error message if there's an exception while connecting to the databases
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $inputUser = json_decode(file_get_contents("php://input"), true);
        $query = "SELECT NHSNumber, Forename, Surname, PersonDOB, GenderCode, Postcode
                  FROM patients 
                  WHERE Forename = :fName 
                  AND Surname = :sName";  // Prepare the SQL query to select patient information from the 'patients' table based on first name and last name
        
        $stmt = $vaccine_pdo->prepare($query);
        $stmt->bindParam(':fName', $inputUser['fName']);// Bind the 'fName' parameter with the corresponding value
        $stmt->bindParam(':sName', $inputUser['sName']);  // Bind the 'sName' parameter with the corresponding value
        
        if ($stmt->execute()) {
            $matchingPatient = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the first row of the result as an associative array
            
            if ($matchingPatient) { // Check if a matching patient was found
                // Prepare the SQL statement for inserting patient information into the 'Patient' table in the 'GP_Local' database
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
                    echo json_encode(["message" => "Your account has been created"]);
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