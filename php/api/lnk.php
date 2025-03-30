<?php

include_once dirname(__FILE__) . "/../corsheaders.php";
include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../trackerconfig.php";
include_once dirname(__FILE__) . "/ipinfo.php";

// Get the shortcode from the URL path
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', $path);
$shortCode = end($pathParts);

// If no shortcode is provided, return an error
if (empty($shortCode)) {
  http_response_code(400);
  echo json_encode(["error" => "No shortcode provided"]);
  exit;
}

// Connect to the database
$mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

if ($mysqli->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]);
  exit;
}

// Look up the shortcode in the links table
$query = "SELECT id, campaign_id, short_code, destination, title, click_limit, expires_at FROM links WHERE short_code = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("s", $shortCode);
$stmt->execute();

// Bind result variables
$linkId = null;
$campaignId = null;
$shortCodeResult = null;
$destination = null;
$title = null;
$clickLimit = null;
$expiresAt = null;

$stmt->bind_result($linkId, $campaignId, $shortCodeResult, $destination, $title, $clickLimit, $expiresAt);
$linkFound = $stmt->fetch();
$stmt->close();

// If the shortcode doesn't exist, return an error
if (!$linkFound) {
  http_response_code(404);
  echo json_encode(["error" => "Link not found"]);
  $mysqli->close();
  exit;
}

// Check if the link has expired
if ($expiresAt && strtotime($expiresAt) < time()) {
  http_response_code(410);
  echo json_encode(["error" => "Link has expired"]);
  $mysqli->close();
  exit;
}

// Check if the link has reached its click limit
if ($clickLimit) {
  $query = "SELECT COUNT(*) FROM clicks WHERE link_id = ?";
  $stmt = $mysqli->prepare($query);
  $stmt->bind_param("i", $linkId);
  $stmt->execute();
  
  $clickCount = 0;
  $stmt->bind_result($clickCount);
  $stmt->fetch();
  $stmt->close();

  if ($clickCount >= $clickLimit) {
    http_response_code(410);
    echo json_encode(["error" => "Link has reached its click limit"]);
    $mysqli->close();
    exit;
  }
}

// Get IP address and other information
$ipAddress = $_SERVER['REMOTE_ADDR'];
$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null;
$referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;

// Add a new record to the clicks table
$query = "INSERT INTO clicks (link_id, ip_address, user_agent, referrer) VALUES (?, ?, ?, ?)";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("isss", $linkId, $ipAddress, $userAgent, $referrer);
$stmt->execute();
$stmt->close();

// Use the updateIpAddress function from ipinfo.php to save IP information
updateIpAddress($ipAddress);

// Close the database connection
$mysqli->close();

// Redirect to the destination URL
header("Location: " . $destination);
exit;
?>
