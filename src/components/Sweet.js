import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';

function Sweet() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/yummy/API/group_read.php?tag=sweet');
      console.log(response);
      setRecipes(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Search />
      <h3 className='title'>Sweet</h3>

      <div className='posts'>
        {recipes.map(recipe => (
          <div
            className='post'
            style={{ paddingBottom: '0.5rem' }}
            key={recipe.id}
            tag={recipe.tag}>
            <Link to={`${process.env.PUBLIC_URL}/recipe/${recipe.id}`}>
              <img src={`${process.env.PUBLIC_URL}/${recipe.image}`} alt='' />

              <h3
                style={{
                  fontSize: '1.1rem',
                  color: '#646464',
                  fontWeight: '600'
                }}>
                {recipe.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sweet;
