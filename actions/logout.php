<?php
	session_start();

 	if(isset($_COOKIE['usuarioid'])){        
        unset($_COOKIE['usuarioid']);
        setcookie('usuarioid',$_POST['usuarioid'],time() - 1);
    }

    session_destroy();

   	header('Location: ../index.php');
	//echo 'llego';
?>