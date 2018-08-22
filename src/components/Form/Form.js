import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import s from './Form.module.css';

class TicketForm extends Component {
  
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
          <Label for="summary">Summary</Label>
          <Input type="text" name="summary" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="assignee">Assignee</Label>
          <Input type="text" name="assignee" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="reporter">Reporter</Label>
          <Input type="text" name="reporter" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="priority">Priority</Label>
          <Input type="select" name="priority" onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
        </FormGroup>
  
        <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
        <Button color="secondary" onClick={this.props.closeModal}>Cancel</Button>
      </Form>
    );
  }
}

TicketForm.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  closeModal: PropTypes.func,
};

TicketForm.defaultProps = {
  values: {},
  onSubmit: () => {},
};

export default (
  connect()(
    withFormik({
      mapPropsToValues: () => ({
        summary: '',
        description: '',
        assignee: '',
        reporter: '',
        priority: 1
      }),
      validate: (values, props) => {
        const errors = {};
        return errors;
      },
      handleSubmit: (values, { props }) => {
        props.onSubmit(values);
        props.closeModal();
        console.log(values)
      },
      displayName: 'TicketForm',
    })(TicketForm))
  );
