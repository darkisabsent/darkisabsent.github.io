<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$directory = __DIR__ . '/images/achievements'; 


if (!is_dir($directory)) {
    http_response_code(404);
    echo json_encode(["error" => "Directory not found: $directory"]);
    exit;
}


if (!is_readable($directory)) {
    http_response_code(403);
    echo json_encode(["error" => "Directory is not readable: $directory"]);
    exit;
}


$files = array_diff(scandir($directory), ['.', '..']); // Exclude '.' and '..'


$imageUrls = [];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'PNG' ,' JPEG']; // Allowed file extensions

foreach ($files as $file) {
    $filePath = $directory . '/' . $file;
    $fileExtension = pathinfo($file, PATHINFO_EXTENSION);

    
    if (is_file($filePath) && in_array(strtolower($fileExtension), $allowedExtensions)) {
        $imageUrls[] = 'images/achievements/' . $file; // Build relative URLs for images
    }
}


header('Content-Type: application/json');
echo json_encode($imageUrls);
?>