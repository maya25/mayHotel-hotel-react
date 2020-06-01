import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone'
import { Button, Item, Icon } from 'semantic-ui-react'

import { fatchCalls, deleteCall, handleCall } from '../actions';

class CallsList extends Component {

  componentDidMount() {
    this.props.fatchCalls()
  }

  // renderContent = (call)=>{

  // }

  renderButton = (is_handle, call_id, type) => {
    if (is_handle) {
      return <Button onClick={this.props.deleteCall(type, call_id)} negative floated='right'>complete</Button>
    } else {
      return <Button onClick={this.props.handleCall(type, call_id)} primary floated='right'>Handle</Button>
    }
  }

  renderList = () => {
    const calls = this.props.calls;
    return calls.map((call) => {
      return (
        <Item key={call.id}>
          <Icon color="orange" size="big" name="hand point right" />
          <Item.Content verticalAlign='middle'>
            <Item.Header>{call.type}</Item.Header>
            <Item.Description>
            {`Room Number: ${call.room_num}`} <br/>
             {`Opened at: ${moment.utc(call.date).format('DD/MM/YY')}`}
             </Item.Description>
            <Item.Extra>
              {this.renderButton(call.is_handle, call.id, call.type)}
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }

  render() {
    console.log(this.props.calls)
    return (
      <Item.Group divided>
        <h2>Service Calls</h2>
        {this.renderList()}
      </Item.Group>
    )
  }
}



const mapStateToProps = (state) => {
  const { auth } = state;
  return { calls: Object.values(state.calls), auth }; /// Object.values() is a bulid in javaScript function that accept an object and turn all his values to array  
};

export default connect(
  mapStateToProps,
  {
    fatchCalls,
    deleteCall,
    handleCall
  })(CallsList);