<?php

$inData = getRequestInfo();

$firstName = $inData["FirstName"];
$lastName = $inData["LastName"];
$login = $inData["Login"];
$pass = $inData["Password"];

# Doesn't seem to want to work =(
#$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));
$conn = new mysqli('localhost', 'apiUser', 'group9apiUser', 'COP4331');

if ($conn->connect_error) {
    returnWithError( $conn->connect_error );
} else {
    $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss",$firstName, $lastName, $login, $pass);
    $stmt->execute();

    if ($stmt->affected_rows >= 1) {
      returnNoError();
    } else {
      returnWithError('Username ' . $login . ' is already taken.');
    }
    $stmt->close();
    $conn->close();

}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function returnNoError()
{
  $retVal = '{"error":""}';
  sendResultInfoAsJson($retVal);
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
