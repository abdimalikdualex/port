<?php
$username="root";
$password="";
$server="localhost";
$db='database123';

$con=mysqli_connect($server,$username,$password,$db);
if($con){
    //echo "CONNECTION SUCCESS";
    ?>
    <script>
        alert('connction success');
    </script>
    <?php
}else{
    //echo "NO SUCCESS";
    die("NO SUCCESS" . mysqli_connect_error());
}

?>