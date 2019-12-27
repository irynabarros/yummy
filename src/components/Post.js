import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

function Post() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('/yummy/API/read.php');
      setRecipes(response.data);
      console.log(response);
    };
    fetchData();
  }, []);
  console.log(Array.isArray(recipes));

  const totalPosts = recipes.length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = [...recipes.slice(indexOfFirstPost, indexOfLastPost)];

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className='posts' style={{ marginTop: '1rem' }}>
      {currentPosts.map(recipe => (
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

      <Pagination
        className='pagination post'
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
      />
    </div>
  );
}

export default Post;
