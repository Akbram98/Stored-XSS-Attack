<?php
// submit_customer.php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "M0n0chromi@";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the JSON data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$date = date("Y-m-d H:i:s");

// Generate a salt and hash the password
$salt = bin2hex(random_bytes(16)); // Generate a 16-byte random salt
$hashedPassword = hash('sha256', $salt . $password); // Hash the password with the salt

// SQL query to insert data into the "customers" table
$sql = "INSERT INTO customers (name, email, password, salt, date) VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $hashedPassword, $salt, $date);

if ($stmt->execute()) {
    echo json_encode(["message" => "Customer registered successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close the connection
$stmt->close();
$conn->close();
?>
