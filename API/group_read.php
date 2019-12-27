<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://irinamatieva.com/');

include_once './database.php';
include_once './post.php';

$database = new Database();

$db = $database->connect();

$recipe = new Recipe($db);

$recipe->tag = isset($_GET['tag']) ? $_GET['tag'] : die();


$result = $recipe->read_group();

$num = $result->rowCount();

if ($num > 0) {
    $posts_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $post_item = array(
            'id' => $id,
            'title' => $title,
            'tag' => $tag,
            'image' => $image
        );

        array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
} else {
    echo json_encode(
        array('message' => 'No Posts Found')
    );
}