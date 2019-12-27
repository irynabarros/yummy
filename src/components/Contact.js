import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    mailSent: false
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/yummy/API/contact.php', this.state)
      .then(response => {
        this.setState({ mailSent: true });
        console.log(response);
      })

      .catch(error => {
        console.log(error);
      });

    this.setState({
      name: '',
      email: '',
      message: ''
    });
  };
  render() {
    return (
      <div className='form-container'>
        <h3>Get in Touch</h3>
        <div className='alert'>
          {this.state.mailSent && (
            <h4 className='H4'>Thank you for your message.</h4>
          )}
        </div>
        <form
          className='form contact'
          method='POST'
          onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Name*'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <br />

          <input
            type='email'
            placeholder='Email*'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            required
          />
          <br />
          <textarea
            name='message'
            id='message'
            cols='60'
            rows='7'
            placeholder='Message*'
            required
            value={this.state.message}
            onChange={e =>
              this.setState({ message: e.target.value })
            }></textarea>
          <br />
          <button type='submit' value='submit'>
            Send
          </button>
        </form>
      </div>
    );
  }
}
export default Contact;
