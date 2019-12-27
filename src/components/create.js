import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

class Create extends Component {
  state = {
    title: '',
    tag: '',
    date: '',
    file: null,
    post:
      '<h4>Ingredients</h4> \n  <p> \n  ... </br> \n ... </br> \n ... </br> \n </p> \n <h4>Preparation</h4> \n <p> STEP 1: </p> \n <p></p> \n <p>STEP 2:</p> \n <p></p> '
  };

  handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('tag', this.state.tag);
    formData.append('date', this.state.date);
    formData.append('post', this.state.post);
    formData.append('file', this.state.file);
    

    await axios

      .post('/yummy/API/create.php', formData)
      .then(response => {
        console.log(response);
      })

      .catch(error => {
        console.log(error);
      });
      
    this.setState({
      title: '',
      tag: '',
      date: '',
      post: '',
      file: null
    });

    this.props.history.push(`${process.env.PUBLIC_URL}/admin`);
  };
  render() {
    return (
      <div className='form-container'>
        <h3>Create new post</h3>
        <form
          className='form admin'
          method='POST'
          encType='multipart/form-data'
          onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type='text'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <br />
          <label>Tag</label>
          <select
            value={this.state.tag}
            name='tag'
            onChange={e => this.setState({ tag: e.target.value })}>
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
            value={this.state.date}
            onChange={e => this.setState({ date: e.target.value })}
          />
          <br />
          <label>Image</label>
          <input
            type='file'
            name='file'
            onChange={e => this.setState({ file: e.target.files[0] })}></input>
          <br />
          <label>Post</label>
          <textarea
            cols='30'
            rows='10'
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}></textarea>
          <br />
          <div className='publish-cancel'>
            <button type='submit' value='submit'>
              Publish
            </button>
            <button
              onClick={() =>
                this.props.history.push(`${process.env.PUBLIC_URL}/admin`)
              }>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Create;
