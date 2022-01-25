<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

# Doesn't seem to want to work =(
#$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));
$conn = new mysqli('localhost', 'apiUser', 'group9apiUser', 'COP4331');

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("delete from Contacts where ID=?");
    $stmt->bind_param("s", $inData["ContactID"]);
    $stmt->execute();

    returnNoError();

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

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnNoError()
{
    $retValue = '{"error":""}';
    sendResultInfoAsJson($retValue);
}

?>
