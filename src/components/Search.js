import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './Search.css';
import axios from 'axios';

const Search = props => {
  const [keyWord, setKeyWord] = useState('');
  const [refresh, setRefresh] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [number, setNumber] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {}, [refresh]);
  const handleClick = e => {
    e.preventDefault();
    setRefresh(refresh + 1);
    const fetchData = async () => {
      // const response = await axios.post('/yummy/API/search.php', { keyword: keyWord}
      // );
      const response = await axios.get(`/yummy/API/search.php?s=${keyWord}`);
      console.log(response);
      setRecipes(response.data);
      setNumber(response.data.length);
    };
    if (keyWord.length > 2) {
      fetchData();
    }
    setKeyWord('');
  };

  const totalPosts = recipes.length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (recipes === 'No rows') {
    return (
      <div>
        <div className='search'>
          <input
            type='text'
            value={keyWord}
            placeholder='recipe search...'
            onChange={e => setKeyWord(e.target.value)}
          />
          <button onClick={handleClick}>Search</button>
        </div>

        <div className='new-post'>
          <h4 style={{ textAlign: 'center' }}>
            We found no recipes matching your search
          </h4>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <form className='search' onSubmit={handleClick}>
          <input
            type='text'
            value={keyWord}
            placeholder='recipe search...'
            onChange={e => setKeyWord(e.target.value)}
          />
          <button type='submit' value='submit'>
            Search
          </button>
        </form>
        <div>
          {number > 1 ? (
            <h4
              style={{
                textAlign: 'center',
                color: '#646464',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
              We found {number} recipes
            </h4>
          ) : number === 1 ? (
            <h4
              style={{
                textAlign: 'center',
                color: '#646464',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
              We found {number} recipe
            </h4>
          ) : null}

          <div className='posts'>
            {currentPosts.map(recipe => (
              <div className='post' key={recipe.id} tag={recipe.tag}>
                <Link to={`${process.env.PUBLIC_URL}/recipe/${recipe.id}`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/${recipe.image}`}
                    alt=''
                  />

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
              postsPerPage={postsPerPage}
              totalPosts={totalPosts}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    );
};
export default Search;
