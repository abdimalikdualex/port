<?php
include 'connection.php';
if(isset($_POST['submit'])){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $message=$_POST['message'];

    $insertquery="INSERT INTO entry_details(name,email,message) 
    VALUES('$name','$email','$message')";

    $res=mysqli_query($con,$insertquery);

    if($res){
        ?>
        <script>
            alert('MESSAGE SENT,THANK YOU !');
        </script>
        <?php
    }else{
        ?>
        <script>
            alert('MESSAGE IS NOT SENT');
        </script>
        <?php
    }
}

?>