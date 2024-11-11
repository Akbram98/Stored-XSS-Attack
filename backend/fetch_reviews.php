<?php
// Database connection settings
$host = 'localhost';
$dbname = 'ecommerce';
$username = 'root';
$password = 'M0n0chromi@';

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
