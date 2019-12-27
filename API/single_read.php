<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://irinamatieva.com/');

include_once './database.php';
include_once './post.php';

$database = new Database();

$db = $database->connect();

$recipe = new Recipe($db);

$recipe->id = isset($_GET['id']) ? $_GET['id'] : die();

$recipe->read_single();

$post_arr = array(
    'id' => $recipe->id,
    'title' => $recipe->title,
    'tag' => $recipe->tag,
    'date' => $recipe->date,
    'post' => $recipe->post,
    'image' => $recipe->image
);



    
echo json_encode($post_arr);


