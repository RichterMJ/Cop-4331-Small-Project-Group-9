<?php
$inData = getRequestInfo();

$firstName = $inData["FirstName"];
$lastName = $inData["LastName"];
$login = $inData["Login"];
$pass = $inData["Password"];


$conn = new mysqli(getenv("DB_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));

if ($conn->connect_error) {
    returnWithError( $conn->connect_error );
} else {
    $stmt = $conn->prepare("SELECT Login FROM Users WHERE Login=?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = stmt->get_result();
    if ($result->num_rows > 0) {
      returnWithError("Username has already taken");
    }
    else {
      $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("ssss",$firstName, $lastName, $login, $pass);
      $stmt->execute();
      sendResultInfoAsJson($firstName, $lastName, $login, $pass);
    }
    $stmt->close();
    $conn->close();
    returnWithError("");

}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}
function returnWithResult($firstname, $lastName, $login, $password)
{
  $retVal = '{"firstName" : "' . $firstname . '", "lastName" : "' . $lastName . '", "login" : "' . $login . '","password" : "' . $password . '"}';
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
