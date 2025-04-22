<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$directory = __DIR__ . '/images/achievements'; // Use forward slashes for consistency

// Check if the directory exists
if (!is_dir($directory)) {
    http_response_code(404);
    echo json_encode(["error" => "Directory not found: $directory"]);
    exit;
}

// Check if the directory is readable
if (!is_readable($directory)) {
    http_response_code(403);
    echo json_encode(["error" => "Directory is not readable: $directory"]);
    exit;
}

// Get all files in the directory
$files = array_diff(scandir($directory), ['.', '..']); // Exclude '.' and '..'

// Filter valid image files
$imageUrls = [];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif',]; // Allowed file extensions

foreach ($files as $file) {
    $filePath = $directory . '/' . $file;
    $fileExtension = pathinfo($file, PATHINFO_EXTENSION);

    // Check if the file is a valid image
    if (is_file($filePath) && in_array(strtolower($fileExtension), $allowedExtensions)) {
        $imageUrls[] = 'images/achievements/' . $file; // Build relative URLs for images
    }
}

// Return the list of image URLs as JSON
header('Content-Type: application/json');
echo json_encode($imageUrls);
?>