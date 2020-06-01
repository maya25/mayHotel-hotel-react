// Home.js
import { Grid, Container, Item, ItemExtra } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom'
import spa from '../images/spa.png'
import reception from '../images/reception.png'
import events from '../images/events.png'
import service from '../images/service.png'
import settings from '../images/settings.png'
import meal from '../images/meal.png'

class Home extends React.Component {
  render() {
    return (
      <Container style={{ paddingTop: '50px' }}>
        <Grid textAlign="center" >
          <Grid.Row columns={3}>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#80e5ff' }}>
                <Link to='/spa'>
                  <Item.Image src={spa} size='small' />
                </Link>
                <ItemExtra ><h3>ספא</h3></ItemExtra>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#ffff99' }}>
                <Link to='/reception'>
                  <Item.Image src={reception} size='small' />
                </Link>
                <ItemExtra ><h3>קבלה</h3></ItemExtra>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#ff8c66' }}>
                <Link to='#'>
                  <Item.Image src={meal} size='small' />
                </Link>
                <ItemExtra ><h3>ארוחות</h3></ItemExtra>
              </Item>
            </Grid.Column>
           
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#ff6666' }}>
                <Link to='/event'>
                  <Item.Image src={events} size='small' />
                </Link>
                <ItemExtra ><h3>אירועים</h3></ItemExtra>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#66ffb3' }}>
                <Link to='/service'>
                  <Item.Image src={service} size='small' />
                </Link>
                <ItemExtra ><h3>שירות חדרים</h3></ItemExtra>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item style={{ borderRadius: 25, backgroundColor: '#4d79ff' }}>
                <Link to='/hotel'>
                  <Item.Image src={settings} size='small' />
                </Link>
                <ItemExtra ><h3>בניית מלון</h3></ItemExtra>
              </Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    )
  }
}

export default Home;