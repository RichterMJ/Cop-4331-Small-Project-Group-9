<?php
   $inData = getRequestInfo();
   
   $firstName = $inData["FirstName"];
   $lastName = $inData["LastName"];
    $login = $inData["Login"];
    $pass = $inData["Password"];


   $conn = new mysqli("localhost", "apiUser", "group9apiUser", "COP4331");
   if ($conn->connect_error)
   {
       returnWithError( $conn->connect_error );
   }
   else
   {
       $stmt = $conn->prepare("INSERT into Users(FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
       $stmt->bind_param("ssss",$firstName, $lastName, $login, $pass);
       $stmt->execute();
       $stmt->close();
       $conn->close();
       returnWithError("");
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
       $retValue = '{"error":"' . $err . '"}';
       sendResultInfoAsJson( $retValue );
   }
   
?>

