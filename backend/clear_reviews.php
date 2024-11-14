<?php
// clear_reviews.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ecommerce";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Database connection failed"]);
        exit();
    }

    // SQL to delete all reviews
    $sql = "DELETE FROM reviews";

    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo json_encode(["message" => "All reviews cleared successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error clearing reviews: " . $conn->error]);
    }

    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>