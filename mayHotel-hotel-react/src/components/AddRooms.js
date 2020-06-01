// AddRooms

import React from "react";
import { connect } from "react-redux";
import { addRooms } from "../actions";
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

class AddRooms extends React.Component {
state = {
  show:false
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
    let array = [];
    if(formValues.superstition){
      array = await formValues.superstition.split(',').map(Number);
    }
    await this.props.addRooms({...formValues, superstition: array});
    this.setState({ show: true })
  };

  
  hideAlert = () =>{
    this.setState({show:false})
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
            הוספת חדרים למלון
          </Header>
          <Form
            size="large"
            error
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Segment stacked>
              <Field
                name="min"
                type="number"
                icon="sort numeric down"
                placeholder="מספר חדר התחלה*"
                component={this.renderInput}
              />
              <Field
                name="max"
                type="number"
                icon="sort numeric up"
                placeholder="מספר חדר סיום*"
                component={this.renderInput}
              />
                            <Field
                name="capacity"
                type="number"
                icon="users"
                placeholder="כמות אכלוס*"
                component={this.renderInput}
              />
              <Field
                name="superstition"
                type="text"
                icon="snapchat ghost"
                placeholder="מס חדר 1, מס חדר 2"
                component={this.renderInput}
              />

              <Button positive fluid size="large" type="submit">
                אישור
              </Button>
            </Segment>
          </Form>
          <SweetAlert
              show={this.state.show}
              position= 'top-end'
              type= 'success'
              title= 'Your work has been saved'
              onConfirm={this.hideAlert}
            />
        </Grid.Column>
      </Grid>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.min) errors.min = "חייב להכניס מספר התחלה";
  if (!formValues.capacity) errors.capacity = "חייב להכניס כמות איכלוס";
  if (!formValues.max) errors.max = "חייב להכניס מספר סיום";

  return errors;
};

const formWarrped = reduxForm({
  form: "addRooms",
  validate
})(AddRooms);

export default connect(
  null,
  { addRooms }
)(formWarrped);
