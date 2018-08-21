import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import classnames from 'classnames';

import { login } from "../../actions/auth";

import s from './Login.module.css';

class Login extends Component {
  
  renderErrors() {
    const errors = this.props.errors.map((error, key) => {
      return <div key={`error-${key}`} className="error">{error}</div>
    });
    
    return (
      <div className="row text-danger p-3">
        {errors}
      </div>
    )
  }
  
  render() {
    return (
      <div className={classnames(s.login, 'container')}>
        <div className='text-center'>Login</div>

        <div className="row">
          <div className="col-xs-10 offset-xs-1 col-sm-4 offset-sm-4">
            <LoginForm onSubmit={this.props.login}/>
            {this.renderErrors()}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.array,
};

Login.defaultProps = {
  errors: [],
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  redirectToReferrer: state.auth.redirectToReferrer,
});

export default connect(mapStateToProps, { login })(Login);
