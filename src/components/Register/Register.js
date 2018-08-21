import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import classnames from 'classnames';

import { register } from "../../actions/auth";

import s from './Register.module.css';

class Register extends Component {
  
  state = {
    redirectToReferrer: false
  };
  
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
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    const { redirectToReferrer } = this.props;
  
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className={classnames(s.register, 'container')}>
        <div>
          <h3 className='text-center'>Register</h3>
  
          <div className="row">
            <div className="col-xs-10 offset-xs-1 col-sm-4 offset-sm-4">
              <RegisterForm onSubmit={this.props.register}/>
              {this.renderErrors()}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.array,
};

Register.defaultProps = {
  errors: [],
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { register })(Register);
