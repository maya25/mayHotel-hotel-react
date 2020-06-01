// AddMeals

import React from "react";
import { connect } from "react-redux";
import { addMeals } from "../actions";
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

class AddMeals extends React.Component {
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
    await this.props.addMeals(formValues);
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
              הוספת ארוחות
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
                  placeholder="ארוחה"
                  component={this.renderInput}
                />
                <Field
                  name="startTime"
                  type="text"
                  placeholder="שעת התחלה"
                  component={this.renderInput}
                />
                <Field
                  name="endTime"
                  type="text"
                  placeholder="שעת סיום"
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

  if (!formValues.name) errors.name = "You must enter a name";
  if (!formValues.startTime) errors.startTime = "You must enter a startTime";
  if (!formValues.endTime) errors.endTime = "You must enter a endTime";

  return errors;
};

const formWarrped = reduxForm({
  form: "addMeals",
  validate
})(AddMeals);

export default connect(
  null,
  { addMeals }
)(formWarrped);
