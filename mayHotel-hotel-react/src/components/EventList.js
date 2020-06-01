import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import styled from "styled-components";
import Loader from "react-loader";
import { Link } from "react-router-dom"
import { Header, Image, Card, Button, Container, Icon, Confirm } from 'semantic-ui-react';

import { fetchEvents, deleteEvent } from '../actions';


const CardWrapper = styled.div`
  position:absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1000;
  direction: rtl;
  font-size:18px;
`;

const confirm = {
  height: "100px",
  direction: "rtl",
  textAlign: "right"
}
const columns = [
  {
    Header: "אירוע",
    accessor: "name"
  },
  {
    Header: "מיקום",
    accessor: "location"
  },
  {
    Header: "נפח איכלוס",
    accessor: "capacity"
  },
  {
    Header: "תאריך",
    accessor: "string.date"
  },
  {
    Header: "שעה",
    accessor: "string.time"
  }
]

class EventList extends Component {
  state = {
    loading: true,
    eventIndex: null,
    open: false,
    confirmHeader: null,
    event_id: null
  }

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const event = this.props.events[rowInfo.index];
      return {
        onClick: (e) => {
          this.setState({ eventIndex: rowInfo.index, event_id: event._id })
        },
        style: {
          background:
            rowInfo.index === this.state.eventIndex ? '#2196f3' : rowInfo.index === 0 ? 'linear-gradient(to bottom,  #f2f2f2 0%, #ffffff 30%)' : 'white',
          color: rowInfo.index === this.state.eventIndex ? "white" : "black"
        }
      }
    }
    return {};
  }

  showConfirm = () => this.setState({ open: true })

  handleConfirm = async () => {
    this.props.deleteEvent(this.state.event_id)
    this.setState({ open: false, eventIndex: null, event_id: null })
  }

  handleCancel = () => this.setState({ open: false })

  async componentDidMount() {
    await this.props.fetchEvents()
    this.setState({ loading: false })
  };

  handleXclick = () => {
    this.setState({ eventIndex: null })
  }


  renderEventData = () => {
    const event = this.props.events[this.state.eventIndex]
    return (
      <CardWrapper key={event._id}>
        <Card fluid>
          <Icon onClick={this.handleXclick} borderd='false' size='large' corner='top right' name='times' color='grey' />
          <Card.Content>

            <Card.Header>{event.name}</Card.Header>
            <Card.Meta>
              {`קטגוריה: ` + event.category.map((cat) => { return `${cat} ` })}<br />
              {`מיקום: ${event.location}`}
            </Card.Meta><br />
            <Card.Description >
              <strong>{`תוכן: ${event.content}`}</strong><br />
              {`תאריך: ${event.string.date}`}<br />
              {` שעה:  ${event.string.time}`}<br />
              {`נפח איכלוס: ${event.capacity}`}<br />
              {` כמות הזמנות: ${event.counter}`}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Button color='blue' icon labelPosition='right'>
                <Icon name='edit' /> Edit
              </Button>
              <Link to={{ pathname: '/event/reservations', state: { event } }}>
                <Button positive icon labelPosition='left'>
                  <Icon name='search' /> View Reservations
                </Button>
              </Link>
              <Button onClick={this.showConfirm} color='red' icon labelPosition='left'>
                <Icon name='trash alternate' /> Delete
              </Button>
            </div>
            <Confirm
              style={confirm}
              cancelButton='ביטול'
              confirmButton='אישור'
              open={this.state.open}
              header={`מחק את ${event.name} ממאגר הנתונים לצמיתות`}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              content='האם את/ה בטוח/ה בהשלמת פעולה זו?'
            />
          </Card.Content>
        </Card>
      </CardWrapper >
    )
  };


  render() {
    return (
      <Container textAlign='center'>
        <Loader loaded={!this.state.loading}>
          <Header as="h2" color="blue" textAlign="center">

            אירועי המלון
         </Header>
          {this.state.eventIndex !== null ? this.renderEventData() : <></>}
          <ReactTable
            columns={columns}
            data={this.props.events}
            minRows={1}
            getTrProps={this.getTrProps}
          />
        </Loader>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: Object.values(state.events) };
}

export default connect(mapStateToProps, { fetchEvents, deleteEvent })(EventList)