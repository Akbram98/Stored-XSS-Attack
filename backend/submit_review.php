<?php
// submit_review.php

header("Content-Type: application/json");

// Database connection details
$servername = "localhost";
$username = "root";
$password = ""; //TODO: add ur username password
$dbname = "ecommerce"; //TODO: whatever your database name is

// Check if data is posted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $customer_name = $_POST['customer_name'];
    $rating = intval($_POST['rating']);
    $comment = $_POST['comment'];
    $current_date = date('Y-m-d'); // Format: YYYY-MM-DD


    // Validate required fields
    if (!empty($customer_name) && !empty($rating) && !empty($comment)) {
        // Create connection to the database
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check for connection errors
        if ($conn->connect_error) {
            die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO reviews (customer_name, rating, review, created_at) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siss", $customer_name, $rating, $comment, $current_date);

        // Execute the statement and check for errors
        if ($stmt->execute()) {
            echo json_encode(["success" => "Review submitted successfully"]);
        } else {
            echo json_encode(["error" => "Error submitting review"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["error" => "All fields are required"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
