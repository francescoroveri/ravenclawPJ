
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
header("Content-Type: application/json");

// Connect to the database
$dbFile = `sqlite:/User/armelacupi2019/Desktop/GP_Local-3.db`;
$pdo = new PDO("sqlite:$dbFile");

// Fetch appointments from the database
$stmt = $pdo->query("SELECT * FROM appointments");
$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Handle appointment cancellation
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $appointmentId = $_GET['id'] ?? null;

    if ($appointmentId) {
        // Delete the appointment with the given ID from the database
        $deleteStmt = $pdo->prepare("DELETE FROM appointments WHERE id = :appointmentId");
        $deleteStmt->bindValue(':appointmentId', $appointmentId, PDO::PARAM_INT);
        $deleteStmt->execute();

        // Return a success response
        $response = array(
            'status' => 'success',
            'message' => 'Appointment canceled successfully'
        );
        echo json_encode($response);
    };
};
?>;
