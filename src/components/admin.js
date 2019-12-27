import React, { useEffect, useState } from 'react';
import auth from './auth';
import './admin.css';
import './Form.css';
import axios from 'axios';

const Admin = props => {
  const [recipes, setRecipes] = useState([]);
  const [Recipe, setRecipe] = useState([]);
  const [deleted, setDeleted] = useState(1);
  const [edited, setEdited] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [post, setPost] = useState('');
  const [file, setFile] = useState(null);
  const [id, setId] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/yummy/API/read.php');
      setRecipes(response.data);
      console.log(response.status);
    };
    fetchData();
  }, [deleted]);

  const deleteRecipe = async recipe => {
    await axios
      .post('/yummy/API/delete.php', { id: recipe.id })
      .then(res => console.log(res));

    setDeleted(deleted + 1);
  };

  const editRecipe = recipe => {
    setTitle(recipe.title);
    setTag(recipe.tag);
    setDate(recipe.date);
    setPost(recipe.post);
    setId(recipe.id);
    setImg(recipe.image);
    setEdited(true);


  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('date', date);
    formData.append('post', post);
    formData.append('file', file);
    formData.append('id', id);

    await axios
      .post('/yummy/API/update.php', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setEdited(false);
        setDeleted(deleted + 1);
  };

  if (!edited) {
    return (
      <div className='admin'>
        <div className='buttons'>
          <button
            onClick={() => {
              props.history.push(`${process.env.PUBLIC_URL}/create`);
            }}>
            New Post
          </button>
          <button
            onClick={() => {
              auth.logout(() => {
                props.history.push(`${process.env.PUBLIC_URL}/login`);
              });
            }}>
            Logout
          </button>
        </div>

        <table>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.id} id={recipe.id}>
                <td>{recipe.title} </td>
                <td>{recipe.tag}</td>
                <td>{recipe.date}</td>
                <td className='edit-delete'>
                  <button
                    onClick={() => {
                      editRecipe(recipe);
                    }}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteRecipe(recipe);
                    }}>
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className='form-container'>
        <h3>Edit post</h3>
        <form className='form admin' key={id} onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <label>Tag</label>
          <select name='tag' value={tag} onChange={e => setTag(e.target.value)}>
            <option>Select tag</option>
            <option value='sweet'>sweet</option>
            <option value='savory'>savory</option>
            <option value='salad'>salad</option>
            <option value='cocktail'>cocktail</option>
          </select>
          <br />
          <label>Date</label>
          <input
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <br />

          <label>Image</label>
          <div style={{ display: 'flex' }}>
            <img
              src={`${process.env.PUBLIC_URL}/${img}`}
              style={{ width: '100px', margin: '0.5rem' }}
              alt=''></img>
            <p
              style={{
                marginRight: '0.5rem',
                marginLeft: '0.5rem'
              }}>
              {img}
            </p>
          </div>
          <input
            type='file'
            name='file'
            onChange={e => setFile(e.target.files[0])}></input>

          <br />
          <label>Post</label>
          <textarea
            cols='30'
            rows='10'
            value={post}
            onChange={e => setPost(e.target.value)}></textarea>
          <br />
          <div className='publish-cancel'>
            <button type='submit' value='submit'>
              Publish
            </button>
            <button onClick={() => setEdited(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
};
export default Admin;
