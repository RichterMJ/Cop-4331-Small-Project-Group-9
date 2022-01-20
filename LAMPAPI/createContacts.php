<?php
$inData = getRequestInfo();


$name = $inData["Name"];
$phoneNumber = $inData["PhoneNumber"];
$email = $inData["Email"];
$userId = $inData["UserID"];


# Doesn't seem to want to work =(
#$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));
$conn = new mysqli('localhost', 'apiUser', 'group9apiUser', 'COP4331');


if ($conn->connect_error) {
    returnWithError($conn->connect_error);

} else {
    $stmt = $conn->prepare("INSERT INTO Contacts (Name, PhoneNumber, Email, UserID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $phoneNumber, $email, $userId);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithInfo($name, $phoneNumber, $email, $userId);
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
function returnWithInfo($name, $phoneNumber, $email, $userId)
{
  $retVal = '{"name": "'.$name.'", "phoneNumber": "'.$phoneNumber.'","email": "'.$email.'","userID": '.$userId.'}';
  sendResultInfoAsJson($retVal);
}
function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

?>
