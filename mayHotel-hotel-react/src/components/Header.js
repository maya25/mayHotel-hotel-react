// Header

import React from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import background from '../images/mayHotel_logo.png';
import { connect } from 'react-redux';

const logo = {
  backgroundSize: "contain",
  backgroundImage: `url(${background})`,
  width: "50px",
  height: "50px"
}

class Header extends React.Component {

  renderLoginButton = () => {
    return (
      <Link to='/login'>
        <Button primary>Login</Button>
      </Link>
    )
  };

  renderLogoutButton = () => {
    return (

      <Button color="red">Logout</Button>
    )
  };
  
  render() {
    return (
      <Menu fluid>
        <Link to="/">
          <Menu.Item>
            <div style={logo}></div>
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            {this.props.isSignedIn ? this.renderLogoutButton() : this.renderLoginButton()}
          
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps
)(Header);