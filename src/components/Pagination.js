import React from 'react';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='pagination'>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => {
            paginate(number);
          }}>
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
