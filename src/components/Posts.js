import React from 'react';

import Post from './Post';
import Recipes from './Recipes';
import Search from './Search';

function Posts() {
  return (
    <div>
      <Search />

      <Recipes />

      <h3 className='title'>RECIPES</h3>

      <Post />
    </div>
  );
}

export default Posts;
