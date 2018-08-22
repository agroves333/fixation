import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import firebase, { db } from '../../firebase.js';
import classnames from 'classnames';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

import { updateUser } from "../../actions/auth";

import s from './App.module.css';

function PrivateRoute ({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => !isLoggedIn
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
  
  state = {
    loading: true,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).onSnapshot(doc => {
          this.props.updateUser(doc.data());
          this.setState({ loading: false });
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  
  componentWillUnmount () {
    this.removeListener();
  }
  
  render() {
    return (
      <div className={classnames(s.App)}>
        {this.state.loading ? <Spinner/> :
          <BrowserRouter>
            <div>
              <Header/>
              <div className="container">
                <Switch>
                  <PublicRoute isLoggedIn={this.props.user} path='/login' component={Login}/>
                  <PublicRoute isLoggedIn={this.props.user} path='/register' component={Register}/>
                  <PublicRoute exact isLoggedIn={this.props.user} path='/' component={Home}/>
                  <PrivateRoute isLoggedIn={this.props.user} path='/dashboard' component={Dashboard}/>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(App);
