<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
define('GP_Local', 'sqlite:/Users/asmajma/Desktop/ReactJS/ravenclaw/PHP/Vaccine.db');


// get patient record from the DB.
// $dsn = 'sqlite:/Users/asmajma/Desktop/ReactJS/ravenclaw/PHP/vaccines.db';
try {
    $pdo = new PDO('sqlite:GP_Local.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["message" => "connection failed" . $e->getMessage()]);
    exit();
}


if(!isset($_GET['NHSNumber'])) {
    echo json_encode(["message" => "NHSNumber parameter is missing"]);
    exit();
}


$patient_id = $_GET['NHSNumber'];

if($_SERVER['REQUEST_METHOD']==='GET'){
    if(isset($_GET['NHSNumber'])) {
        $query = "SELECT * FROM vaccines WHERE NHSNumber =  :patientId";
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


?>