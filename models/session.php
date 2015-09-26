<?php
require("../actions/session.php");

class Session
{
    
        public function iniciarSession($id){
            $.ajax({
              url: 'session.php',
              type: 'POST',
              data: {
                      'usuarioid' :  $id,
                      'funcion' : 'Add'
                    }
            });
        }

         public function borrarSession($id){        
            $.ajax({
              url: 'session.php',
              type: 'POST',
              data: {
                      'usuarioid' :  $id,
                      'funcion' : 'Delete'
                    }
            });
        }


}