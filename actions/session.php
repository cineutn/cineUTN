<?php
  
  if(isset($_POST['funcion'])){
  
    switch($_POST['funcion']){
    
      case 'Add':
      
        if(isset($_POST['usuarioid'])){
        
            setcookie('usuarioid',$_POST['usuarioid'],time() + 60);
        }
      
      break;
      
      case 'Delete':
        if(isset($_COOKIE['usuarioid'])){
          
            unset($_COOKIE['usuarioid']);
            setcookie('usuarioid',$_POST['usuarioid'],time() - 1);
        }
        
      break;
      
      default:
      break;
    }
          
  }
    
?>