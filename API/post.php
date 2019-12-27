<?php
class Recipe {
  private $conn;
  private $table = 'recipes';
  
  public $id;
  public $title;
  public $tag;
  public $date;
  public $post;
  public $image;
  
  

  
  public function __construct($db) {
    $this->conn = $db;
  }

  public function read() {
    
    $query = 'SELECT  id, title, tag, date, post, image FROM ' . $this->table . ' ORDER BY id ASC';
   
    $stmt = $this->conn->prepare($query);   
    $stmt->execute();
    return $stmt;
  }

  public function read_group() {
    $query = 'SELECT id, title, tag, image FROM ' . $this->table . ' WHERE tag = :tag';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':tag', $this->tag);
    $stmt->execute();
    
    return $stmt;
  }



  public function read_single() {
    $query = 'SELECT id, title, tag, date, post, image FROM ' . $this->table . ' WHERE id = ? LIMIT 0,1';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->title = $row['title'];
    $this->post = $row['post'];
    $this->tag = $row['tag'];
    $this->date = $row['date'];
    
    $this->image = $row['image'];
    
  }

  


  public function create() {
    
    $query = 'INSERT INTO ' . $this->table . ' SET title = :title, tag = :tag, date = :date, post = :post, image = :image';
    
    $stmt = $this->conn->prepare($query);
    
    
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':post', $this->post);
    $stmt->bindParam(':tag', $this->tag);
    
    $stmt->bindParam(':date', $this->date);
    $stmt->bindParam(':image', $this->image);
    
    if($stmt->execute()) {
      return true;
}

printf("Error: %s.\n", $stmt->error);
return false;
}


public function update() {
  
  $query = 'UPDATE ' . $this->table . '
                        SET title = :title, post = :post, tag = :tag, date = :date, image = :image
                        WHERE id = :id';
  
  $stmt = $this->conn->prepare($query);
  
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':post', $this->post);
    $stmt->bindParam(':tag', $this->tag);
    $stmt->bindParam(':date', $this->date);
    $stmt->bindParam(':image', $this->image);
  
  if($stmt->execute()) {
    return true;
  }
  
  printf("Error: %s.\n", $stmt->error);
  return false;
}

public function delete() {
  
  $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
 
  $stmt = $this->conn->prepare($query);
  
  
  $stmt->bindParam(':id', $this->id);
  
  if($stmt->execute()) {
    return true;
  }
  
  printf("Error: %s.\n", $stmt->error);
  return false;
}

public function search($keywords) {


  $keyword = str_word_count($keywords, 1);

  $query = "SELECT * FROM $this->table WHERE title LIKE '%$keyword[0]%' OR tag LIKE '%$keyword[0]%' OR post LIKE '%$keyword[0]%' ";

  for($i = 1; $i < count($keyword); $i++) {
    if(!empty($keyword[$i])) {
        $query .= " OR title LIKE '%$keyword[$i]%' OR tag LIKE '%$keyword[$i]%' OR post LIKE '%$keyword[$i]%'";
    }
  }
 
  $stmt = $this->conn->prepare($query);

  $stmt->execute();
  return $stmt;
  
}

}


