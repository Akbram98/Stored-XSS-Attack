<?php
// Database connection settings
$host = 'localhost';
$dbname = 'ecommerce';
$username = 'root';
$password = '';

try {
    // Create a PDO connection to the MySQL server
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create the database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // Connect to the newly created database
    $pdo->exec("USE $dbname");

    // Create the reviews table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Query to retrieve reviews from the database
    $stmt = $pdo->prepare("SELECT customer_name, review, rating, created_at FROM reviews ORDER BY created_at DESC");
    $stmt->execute();

    // Fetch all reviews
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Send the reviews back as a JSON response
    echo json_encode($reviews);
} catch (PDOException $e) {
    // Send error message if there's an issue with the connection or query
    echo json_encode(['error' => $e->getMessage()]);
}
?>
