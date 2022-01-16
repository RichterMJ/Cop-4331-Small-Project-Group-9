<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "apiUser", "group9apiUser", "COP4331");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("update Contacts set Name=?,PhoneNumber=?,Email=? where ID=?");
		$stmt->bind_param("ssss", $inData["Name"], $inData["PhoneNumber"], $inData["Email"], $inData["ContactID"]);
		$stmt->execute();

		returnNoError();	

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnNoError()
	{
		$retValue = '{"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
