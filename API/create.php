<?php 
  
  header('Access-Control-Allow-Origin: *');
  //header('Access-Control-Allow-Origin: http://irinamatieva.com/');
  header('Content-Type: application/json');
  header('Content-Type: multipart/form-data; boundary=something');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
  
  include_once './database.php';
  include_once './post.php';
  
  $database = new Database();
  $db = $database->connect();
  
  $recipe = new Recipe($db);
  
  $data = json_decode(file_get_contents("php://input"));


  $file=!empty($_FILES["file"]["name"])
  ? basename($_FILES["file"]["name"])
  : "";

  if($file){
   
    $target_directory = "../public/";
    $target_file = $target_directory . $file;
    $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
 
    move_uploaded_file($_FILES['file']['tmp_name'], $target_file);
    
}


  $recipe->title = $_REQUEST['title'];
  $recipe->tag = $_REQUEST['tag'];
  $recipe->date = $_REQUEST['date'];
  $recipe->post = $_REQUEST['post'];
  $recipe->image = $file;

  
  if($recipe->create()) {
    echo json_encode(
      array('message' => 'Post Created')
    );
  } else {
    echo json_encode(
      array('message' => 'Post Not Created')
    );
  }
