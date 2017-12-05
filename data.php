<?php
if(!empty($_GET["command"])){

    $servername = "localhost";
    $username = "root";
    $password = "";
    $db = "hhm";
    $conn = new mysqli($servername, $username, $password, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    if($_GET["command"] == 'get'){
        $sql = "SELECT * FROM comments";
        $result = $conn->query($sql);
        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        } 
        print json_encode($rows, JSON_UNESCAPED_UNICODE);
    } else if($_GET["command"] == 'set' && !empty($_GET['name']) && !empty($_GET['email']) && !empty($_GET['comment']) ){
        $name = $_GET['name'];
        $email = $_GET['email'];
        $comment = $_GET['comment'];
        $sql = "INSERT INTO comments ( name, email, comment ) VALUES ('$name', '$email', '$comment')";
        $result = $conn->query($sql);
    }

    $conn->close();
}

