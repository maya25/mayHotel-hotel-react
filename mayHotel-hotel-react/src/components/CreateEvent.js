import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../actions";
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

class CreateEvent extends React.Component {
  state={
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
    const array = await formValues.category.split(',');
    await this.props.createEvent({ ...formValues, category: array });
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
 
            יצירת אירוע
            </Header>
          <Form
            size="large"
            error
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Segment stacked>
              <Field
                name="name"
                type="text"
                icon="home"
                placeholder="שם אירוע"
                component={this.renderInput}
              />
              <Field
                name="category"
                type="text"
                icon="basketball ball"
                placeholder="קטוגריה 1, קטגוריה 2"
                component={this.renderInput}
              />
              <Field
                name="content"
                type="text"
                icon="content"
                placeholder="תוכן"
                component={this.renderInput}
              />
              <Field
                name="location"
                type="text"
                icon="location arrow"
                placeholder="מיקום"
                component={this.renderInput}
              />
              <Field
                name="capacity"
                type="number"
                icon="sort numeric up"
                placeholder="כמות איכלוס"
                component={this.renderInput}
              />
              <Field
                name="date"
                type="datetime-local"
                icon="calendar alternate outline"
                component={this.renderInput}
              />
              <Button positive fluid size="large" type="submit">
                צור אירוע
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

  if (!formValues.name) errors.name = "You must enter a name";
  if (!formValues.category) errors.category = "You must enter a category";
  if (!formValues.content) errors.content = "You must enter a content";
  if (!formValues.location) errors.location = "You must enter a location";
  if (!formValues.capacity) errors.capacity = "You must enter a capacity";
  if (!formValues.date) errors.date = "You must enter a date";

  return errors;
};

const formWarrped = reduxForm({
  form: "evant",
  validate
})(CreateEvent);

export default connect(
  null,
  { createEvent }
)(formWarrped);
