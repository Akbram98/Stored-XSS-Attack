<?php
// signin.php

header('Content-Type: application/json');

// Connect to the database
$mysqli = new mysqli("localhost", "root", "M0n0chromi@", "ecommerce");

if ($mysqli->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Check if email exists in the database
$stmt = $mysqli->prepare("SELECT name, password, salt FROM customers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Fetch the stored password hash, salt, and customer name
    $stmt->bind_result($name, $stored_hash, $salt);
    $stmt->fetch();

    // Hash the input password with the stored salt
    $hashed_input_password = hash("sha256", $salt . $password);

    // Compare hashed input password with stored hash
    if ($hashed_input_password === $stored_hash) {
        // Successful login; send name in the response
        echo json_encode(["success" => true, "name" => $name]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email not found."]);
}

$stmt->close();
$mysqli->close();
?>
