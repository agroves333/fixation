import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import s from './LoginForm.module.css';

class LoginForm extends Component {
  
  renderError(field) {
    return this.props.touched[field]
      && this.props.errors[field]
      && (
        <div className="form-error">
          {this.props.errors[field]}
        </div>
      );
  }
  
  render() {
    const {
      handleSubmit,
      handleChange,
    } = this.props;
    return (
      <Form className={s.form}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" onChange={handleChange} />
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>Login</Button>{' '}
      </Form>
    );
  }
}

LoginForm.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  closeModal: PropTypes.func,
};

LoginForm.defaultProps = {
  values: {},
  onSubmit: () => {},
};

export default (
  connect()(
    withFormik({
      mapPropsToValues: () => ({
        email: '',
        password: '',
      }),
      validate: (values, props) => {
        const errors = {};
        return errors;
      },
      handleSubmit: (values, { props }) => {
        props.onSubmit(values);
        console.log(values)
      },
      displayName: 'LoginForm',
    })(LoginForm))
  );
