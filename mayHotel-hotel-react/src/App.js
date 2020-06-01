import React from "react";
import { Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import history from "./history";
import Home from "./components/Home";
import MenuItem from "./components/MenuItem";
import Login from "./components/Login";
import CallsList from "./components/CallsList";
import ReceptionView from "./components/ReceptionView";
import EventView from './components/EventView'
import SpaView from './components/SpaView'
import HotelView from './components/HotelView'

class App extends React.Component {
  render() {
    return (
      <Container fluid >
        <Router history={history}>
          <MenuItem />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/service" component={CallsList} />
            <Route path="/reception" component={ReceptionView} />
            <Route path="/event" component={EventView} />
            <Route path="/spa" component={SpaView} />
            <Route path="/hotel" component={HotelView} />
          </div>
        </Router>
      </Container>
    );
  }
}
export default App;
