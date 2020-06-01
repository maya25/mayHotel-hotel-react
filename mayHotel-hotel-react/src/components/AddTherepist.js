// AddTherepist

import React from "react";
import { connect } from "react-redux";
import { addTherepist } from "../actions";
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


class AddTherepist extends React.Component {
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
    await this.props.addTherepist(formValues);
    this.setState({ show: true })
  };

  hideAlert = () =>{
    this.setState({show:false})
  }
  render() {
    return (
      <div className="AddTherepist-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              הוסף לו"ז מטפל
              </Header>
            <Form
              size="large"
              error
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Segment stacked>
                <Field
                  name="date"
                  type="date"
                  icon="calendar alternate outline"
                  component={this.renderInput}
                />
                <Field
                  name="therepist"
                  type="text"
                  icon="user"
                  placeholder="שם מטפל"
                  component={this.renderInput}
                />
                <Button positive fluid size="large" type="submit">
                  אישור
                </Button>
              </Segment>
            </Form>
            <SweetAlert 
            show={this.state.show}
            success 
            title="הוספה בוצעה בהצלחה!"
            onConfirm={this.hideAlert}
            confirmBtnBsStyle
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.date) errors.date = "You must enter a date";
  if (!formValues.therepist) errors.therepist = "You must enter a therepist";

  return errors;
};

const formWarrped = reduxForm({
  form: "AddTherepist",
  validate
})(AddTherepist);

export default connect(
  null,
  { addTherepist }
)(formWarrped);
