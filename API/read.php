<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://irinamatieva.com/');
header('Content-Type: application/json; charset=UTF-8');

include_once './database.php';
include_once './post.php';

$database = new Database();

$db = $database->connect();

$recipe = new Recipe($db);

$result = $recipe->read();

$num = $result->rowCount();

if ($num > 0) {
    $posts_arr = array();
    //$posts_arr['data'] = array();

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

        //array_push($posts_arr['data'], $post_item);
        array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
} else {
    echo json_encode(
        array('message' => 'No Posts Found')
    );
}