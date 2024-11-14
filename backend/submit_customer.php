<?php
// submit_customer.php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";

// Create table customers in the database if it doesn't exist
try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create the database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // Connect to the newly created database
    $pdo->exec("USE $dbname");

    // Create the customers table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(64) NOT NULL,
        salt VARCHAR(32) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

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