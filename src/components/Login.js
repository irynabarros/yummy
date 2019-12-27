import React, { Component } from 'react';
import auth from './auth';
import './Form.css';
import axios from 'axios';

class Login extends Component {
  state = {
    user: '',
    pass: '',
    msg: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    await axios
      .post('/yummy/API/login.php', this.state)
      .then(res => {
        if (res.data === 'Successful') {
          auth.login(() => {
            this.props.history.push(`${process.env.PUBLIC_URL}/admin`);
          });
        } else {
          this.setState({ msg: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ msg: true });
      });
  };

  render() {
    return (
      <div className='form-container'>
        <h3>Login</h3>

        {this.state.msg && (
          <h4 className='H4'>Username or password are incorrect</h4>
        )}
        <form className='form login' onSubmit={this.handleSubmit}>
          <input
            type='text'
            required
            placeholder='Username*'
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          />
          <br />

          <input
            type='password'
            placeholder='Password*'
            required
            value={this.state.pass}
            onChange={e => this.setState({ pass: e.target.value })}
          />
          <br />

          <button type='submit' value='submit'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
