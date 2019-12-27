<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://irinamatieva.com/');
header('Content-Type: application/json; charset=UTF-8');

include_once './database.php';
include_once './post.php';

 

$database = new Database();

$db = $database->connect();

$recipe = new Recipe($db);

$keywords = isset($_GET["s"]) ? $_GET["s"] : "";


$result = $recipe->search($keywords);
$num = $result->rowCount();
if ($num > 0) {
    $posts_arr = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $post_item = array(
            'id' => $id,
            'title' => $title,
            'tag' => $tag,
            'date' => $date,
            'post' => html_entity_decode($post),
            'image' => $image
        );
        array_push($posts_arr, $post_item);
          
    }
    

    //$posts_arr = implode(" ", $posts_arr);

    //echo $posts_arr;

     echo json_encode($posts_arr);

     //print_r($posts_arr);
  
  
} else {
    echo json_encode('No rows');
}

