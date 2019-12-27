import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Nav/Header';
import Posts from './components/Posts';
import Footer from './components/Footer';
import SideDrawer from './components/Nav/SideDrawer';
import Backdrop from './components/Nav/Backdrop';
import Admin from './components/admin';
import Create from './components/create';
import Login from './components/Login';
import Contact from './components/Contact';

import Recipe from './components/Recipe';
import Sweet from './components/Sweet';
import Savory from './components/Savory';
import Salad from './components/Salad';
import Cocktail from './components/Cocktail';

import { ProtectedRoute } from './components/ProtectedRoute';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };
  togglerClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className='blog'>
          <Header drawerClickHandler={this.togglerClickHandler} />

          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
            <Route
              path={`${process.env.PUBLIC_URL}/`}
              exact
              component={Posts}
            />

            <ProtectedRoute
              path={`${process.env.PUBLIC_URL}/admin`}
              component={Admin}
            />
            <ProtectedRoute
              path={`${process.env.PUBLIC_URL}/create`}
              component={Create}
            />

            <Route path={`${process.env.PUBLIC_URL}/sweet`} component={Sweet} />
            <Route
              path={`${process.env.PUBLIC_URL}/savory`}
              component={Savory}
            />
            <Route path={`${process.env.PUBLIC_URL}/salad`} component={Salad} />
            <Route
              path={`${process.env.PUBLIC_URL}/cocktail`}
              component={Cocktail}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/recipe/:id`}
              exact
              component={Recipe}
            />

            <Route
              path={`${process.env.PUBLIC_URL}/contact`}
              component={Contact}
            />
            <Route
              path='*'
              component={() => (
                <div style={{ textAlign: 'center', fontSize: '2rem' }}>
                  404 PAGE NOT FOUND
                </div>
              )}
            />
          </Switch>
          {backdrop}
          <SideDrawer
            show={this.state.sideDrawerOpen}
            click={this.backdropClickHandler}
          />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
