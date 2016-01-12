import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
  render() {
    return (
      <div id="body-container">
        <MainNav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Star Wars Dice Roller</h1>

              {/*
               Since this is the app wrapper, we want to display the given children.
               */}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
