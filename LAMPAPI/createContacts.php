<?php
$inData = getRequestInfo();


$name = $inData[""];
$phoneNumber = $inData["PhoneNumber"];
$email = $inData["Email"];
$userId = $inData["UserID"];


$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));

if ($conn->connect_error) {
    returnWithError($conn->connect_error);

} else {
    $stmt = $conn->prepare("INSERT INTO Contacts (Name, PhoneNumber, Email, UserID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $phoneNumber, $email, $userId);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

?>

