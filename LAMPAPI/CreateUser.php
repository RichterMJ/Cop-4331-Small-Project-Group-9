<?php

$inData = getRequestInfo();

$isUsernameTaken =0;
$firstName = $inData["FirstName"];
$lastName = $inData["LastName"];
$login = $inData["Login"];
$pass = $inData["Password"];
$err = "";

# Doesn't seem to want to work =(
#$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));
$conn = new mysqli('localhost', 'apiUser', 'group9apiUser', 'COP4331');

if ($conn->connect_error) {
    returnWithError( $conn->connect_error );
} else {
    $stmt = $conn->prepare("SELECT Login FROM Users WHERE Login=?");
    $stmt->bind_param("s", $login);

    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $isUsernameTaken = 1;
      returnWithResult($isUsernameTaken, $firstName, $lastName, $login, $pass, $error = "Username is already taken");
    }
    else {
      $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("ssss",$firstName, $lastName, $login, $pass);
      $stmt->execute();
      returnWithResult($isUsernameTaken, $firstName, $lastName, $login, $pass, $err);
    }
    $stmt->close();
    $conn->close();

}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}
function returnWithResult($isUsernameTaken, $firstName, $lastName, $login, $password, $err)
{
  $retVal = '{"isUsernameTaken" :' . $isUsernameTaken . ',"firstName" : "' . $firstName . '", "lastName" : "' . $lastName . '", "login" : "' . $login . '","password" : "' . $password . '","error" : "' . $err . '"}';
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
