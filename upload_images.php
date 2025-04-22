<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = __DIR__ . '/images/achievements/';
    $uploadFile = $uploadDir . basename($_FILES['image']['name']);

    // Ensure the directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Validate the uploaded file by extension
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $fileExtension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid file type. Only JPG, PNG, and GIF are allowed."]);
        exit;
    }

    // Check for upload errors
    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["error" => "File upload error: " . $_FILES['image']['error']]);
        exit;
    }

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        echo json_encode(["success" => true, "url" => 'images/achievements/' . basename($_FILES['image']['name'])]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to upload the image."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request."]);
}
?>