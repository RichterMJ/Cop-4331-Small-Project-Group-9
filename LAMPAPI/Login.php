
<?php

    $inData = getRequestInfo();
    
    $id = 0;
    $firstName = "";
    $lastName = "";

    $conn = new mysqli("localhost", "apiUser", "group9apiUser", "COP4331");
    if( $conn->connect_error )
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM USERS WHERE Login=? AND Password=?");
        $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
      
        if($row['COUNT(*)'] == 1)
        {
              $stmt = $conn->prepare("SELECT ID FROM USERS WHERE Login=? AND Password=?");
            $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            returnTrue($row['ID']);
        }
        else
        {
            returnFalse();
        }

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
    
    function returnTrue($ID)
    {
        $retValue = '{"LoginSuccess":true, "ID": $ID}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnFalse()
    {
        $retValue = '{"LoginSuccess":false}';
        sendResultInfoAsJson( $retValue );
    }
    
?>
