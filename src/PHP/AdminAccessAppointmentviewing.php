<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
header("Content-Type: application/json");

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Retrieve the doctor ID from the POST request
    $doctorId = $_POST['doctorId'] ?? '';

    // Perform any necessary validation on the received data
    if (empty($doctorId)) {
        // Prepare an error response if the doctor ID is empty
        $response = array(
            'status' => 'error',
            'message' => 'Doctor ID is required'
        );
        echo json_encode($response);
        exit; // Stop further execution
    }

    // Connect to the SQLite database
    $database = new SQLite3('/User/armelacupi2019/Desktop/GP_Local-3.db');

    // Prepare the SQL statement to retrieve upcoming appointments
    $stmt = $database->prepare('SELECT * FROM appointments WHERE doctor_id = :doctorId');
    $stmt->bindValue(':doctorId', $doctorId, SQLITE3_TEXT);

    // Execute the query and fetch the results
    $result = $stmt->execute();
    
    // Fetch all the rows from the result set
    $appointments = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $appointments[] = $row;
    }

    // Close the database connection
    $database->close();

    // Prepare the response based on the fetched appointments
    if (!empty($appointments)) {
        // Construct a success response if appointments are found
        $response = array(
            'status' => 'success',
            'message' => 'Upcoming appointments retrieved successfully',
            'data' => $appointments
        );
    } else {
        // Construct an error response if no appointments are found
        $response = array(
            'status' => 'error',
            'message' => 'No upcoming appointments found'
        );
    }
} else {
    // Prepare an error response for invalid request method
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method'
    );
}

// Return the response as JSON
echo json_encode($response);
?>

