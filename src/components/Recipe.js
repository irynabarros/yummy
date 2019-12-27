import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewPost.css';

const Recipe = ({ match }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const ID = match.params.id;
      const response = await axios.get(`/yummy/API/single_read.php?id=${ID}`);
      console.log(response);
      setRecipe(response.data);
    };
    fetchData();
  }, []);

  if (recipe !== null) {
    return (
      <div className='new-post'>
        <h3>{recipe.title} </h3>
        <div className='recipe'>
          <div>
            <img src={`${process.env.PUBLIC_URL}/${recipe.image}`} alt='' />
          </div>
          <div dangerouslySetInnerHTML={{ __html: recipe.post }} />
        </div>
      </div>
    );
  } else return <div></div>;
};
export default Recipe;
