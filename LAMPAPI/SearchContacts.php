<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

$conn = new mysqli(getenv("API_HOST"), getenv("API_USER"), getenv("API_PASS"), getenv("API_DB"));

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE Name LIKE ? AND UserID=?");
    $contactSearch = "%" . $inData["search"] . "%";
    $stmt->bind_param("ss", $contactSearch, $inData["UserID"]);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        if ($searchCount > 0) {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '{"ID": "' . $row["ID"] . '","Name" : "'. $row["Name"] . '","PhoneNumber" : "'. $row["PhoneNumber"] .'","Email" : "'. $row["Email"] .'"}';
    }

    if ($searchCount == 0) {
        returnWithError("No Records Found");
    } else {
        returnWithInfo($searchResults);
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

function returnWithError($err)
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($searchResults)
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson($retValue);
}

?>
