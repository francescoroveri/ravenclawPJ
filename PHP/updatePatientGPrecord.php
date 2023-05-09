 <?php
 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
//AUTHOR
//ASMA KAHSAY

// STUDENT ID:
// W17840066


//try block for error handling.
try {
    // Creates a new PDO object for connecting to a SQLite database named "GP_Local.db".
    $pdo = new PDO('sqlite:GP_Local.db');
    //Sets the error mode attribute of the PDO object to throw exceptions on errors.
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //Catches any PDO exceptions that occur.
} catch(PDOException $e) {
    //Outputs a JSON response with an error message indicating that the connection to the database failed and the specific error message.
    echo json_encode(["message" => "connection failed" . $e->getMessage()]);
    //Stops the script from running any further.
    exit();
}
// Checks if the request method is a PATCH request.
if($_SERVER['REQUEST_METHOD']==='PATCH') {
    // Retrieves the request payload as a string.
    $json = file_get_contents('php://input');
    //Decodes the JSON payload into an associative array.
    $patchVars = json_decode($json, true);
    //Retrieves the patient ID from the decoded payload.
    $patient_id = $patchVars['NHSNumber'];
    //Removes the patient ID from the decoded payload.
    unset($patchVars['NHSNumber']);
    
    //Creates an array of SQL update statements for each key-value pair in the decoded payload.
    //Combines the update statements into a single string.
    $updateFields = array_map(function($key) {
        return $key . ' = :' . $key;
    }, array_keys($patchVars));
    //Combines the update statements into a single string.
    $updateFieldsString = implode(', ', $updateFields);
    // Creates an SQL query to update the patient record in the database.
    $query = "UPDATE Patient SET $updateFieldsString WHERE NHSNumber = :patientId";
    //Prepares the SQL query for execution.
    $stmt = $pdo->prepare($query);
    //Binds the patient ID to the prepared SQL query.
    $stmt->bindValue(':patientId', $patient_id);
    //Binds the remaining values from the decoded payload to the prepared SQL query.
    foreach ($patchVars as $key => $value) {
        $stmt->bindValue(':' . $key, $value);
    }
    //Executes the prepared SQL query and checks if it was successful.
    if($stmt->execute()){
        // Outputs a JSON response indicating
        echo json_encode(["message" => "Patient record updated successfully"]);
    }else{
        echo json_encode(["message" => "Error updating patient record"]);
    }
}
?>


