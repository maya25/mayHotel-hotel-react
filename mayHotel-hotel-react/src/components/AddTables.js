// AddTables

import React from "react";
import { connect } from "react-redux";
import { addTables } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class AddTables extends React.Component {
  state = {
    show: false
  }
  renderError = ({ error, touched }) => {
    if (touched && error) return <Message error={true} content={error} />;
  };

  //called in <Field>(redux-form tag) and render the input by the props
  //input is a field in the <Field> tag that handle the input behind the scenes
  renderInput = ({ icon, type, placeholder, input, meta }) => {
    const isError = meta.error && meta.touched ? true : false;
    return (
      <>
        <Form.Input
          error={isError}
          fluid
          icon={icon}
          iconPosition="left"
          type={type}
          placeholder={placeholder}
          {...input}
        />
        {this.renderError(meta)}
      </>
    );
  };

  //called by props.handleSubmit(redux-form properties)
  onSubmit = async formValues => {
    await this.props.addTables({ amount: Number(formValues.amount), seats: Number(formValues.seats) });
    this.setState({ show: true })
  };

  hideAlert = () => {
    this.setState({ show: false })
  }


  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            יצירת שולחנות
            </Header>
          <Form
            size="large"
            error
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Segment stacked>
              <Field
                name="amount"
                type="number"
                icon="sort numeric up"
                placeholder="מספר שולחנות ליצירה"
                component={this.renderInput}
              />
              <Field
                name="seats"
                type="number"
                icon="users"
                placeholder="כמות כסאות"
                component={this.renderInput}
              />
              <Button positive fluid size="large" type="submit">
                אישור
                </Button>
            </Segment>
          </Form>
          <SweetAlert
            show={this.state.show}
            position='top-end'
            type='success'
            title='Your work has been saved'
            onConfirm={this.hideAlert}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.amount) errors.amount = "You must enter a amount";
  if (!formValues.seats) errors.seats = "You must enter a seats";

  return errors;
};

const formWarrped = reduxForm({
  form: "addTables",
  validate
})(AddTables);

export default connect(
  null,
  { addTables }
)(formWarrped);
