<?php

$inData = getRequestInfo();

$name = $inData["Name"];
$phoneNumber = $inData["PhoneNumber"];
$email = $inData["Email"];
$userId = $inData["UserID"];


$conn = new mysqli('localhost', 'apiUser', 'group9apiUser', 'COP4331');


if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO Contacts (Name, PhoneNumber, Email, UserID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssd", $name, $phoneNumber, $email, $userId);
    $stmt->execute();

    if ($stmt->affected_rows == 1) {
        returnNoError();
    } else {
        returnWithError('Could not insert user with credentials: ' . $name . ', ' . $phoneNumber . ', ' . $email . ', ' . $userId);
    }

    $stmt->close();
    $conn->close();
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
function returnNoError()
{
    $retValue = '{"error":""}';
    sendResultInfoAsJson($retVal);
}
function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

?>