<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
define('GP_Local', 'sqlite:/Users/asmajma/Desktop/ReactJS/ravenclaw/PHP/GP_Local.db');
//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066


// This code block contains database connection and error handling code using PDO.
try {
    $pdo = new PDO('sqlite:GP_Local.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["message" => "connection failed" . $e->getMessage()]);
    exit();
}

// This code block checks if the 'NHSNumber' parameter is missing and exits if it is.
if(!isset($_GET['NHSNumber'])) {
    echo json_encode(["message" => "NHSNumber parameter is missing"]);
    exit();
}

// This line assigns the value of the "NHSNumber" parameter to a variable named $patient_id.
$patient_id = $_GET['NHSNumber'];


// This block of code checks if the request method is "GET" and if the "NHSNumber" parameter is set in the GET request. 
//If it is set, a SQL query is executed to retrieve patient data from the database based on the "NHSNumber" value. If the query is successful, the patient data is returned in JSON format. If the query fails, an error message is displayed.
if($_SERVER['REQUEST_METHOD']==='GET'){
    if(isset($_GET['NHSNumber'])) {
        $query = "SELECT * FROM GPPatient WHERE NHSNumber =  :patientId";
        $stmt = $pdo->prepare($query);
        $patient_id= $_GET['NHSNumber']; 
        $stmt->bindParam(':patientId',$patient_id);
        if($stmt->execute()){
            $patient = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($patient);
        }else{
            echo json_encode(["message" => "error happened"]);
        }
    } else {
        echo json_encode(["message" => "NHSNumber parameter is missing"]);
    }
}



