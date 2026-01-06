import React, { Component } from "react";
import { connect } from "react-redux";
// import { browserHistory } from "react-router";
// import FlatButton from "material-ui/FlatButton";
import Login from "./Login";
import Signup from "./Signup";
import RaisedButton from "material-ui/RaisedButton";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: false,
    };
  }

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };

  render() {
    const { authenticated } = this.props;
    return (
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Welcome to Dev Stack Bank</h2>

        {!authenticated && !this.state.showSignup && (
          <div>
            <Login />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p>Don't have an account?</p>
              <RaisedButton
                label="Sign Up"
                onClick={this.toggleSignup}
                secondary={true}
              />
            </div>
          </div>
        )}

        {!authenticated && this.state.showSignup && (
          <div>
            <Signup />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p>Already have an account?</p>
              <RaisedButton
                label="Back to Login"
                onClick={this.toggleSignup}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    authenticated: login.authenticated,
  };
};

export default connect(mapStateToProps)(WelcomePage);
