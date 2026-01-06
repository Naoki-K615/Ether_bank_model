import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { fetchAccounts } from "../actions";

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
  },
  hero: {
    padding: "60px 40px",
    marginBottom: "40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "8px",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  feature: {
    width: "250px",
    padding: "30px",
    margin: "10px",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "30px",
  },
};

class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAccounts());
  }

  goToLogin = () => {
    browserHistory.push("/login");
  };

  goToMyAccount = () => {
    const { userId } = this.props;
    if (userId === -1) {
      browserHistory.push("/accounts");
    } else {
      browserHistory.push("/user-accounts");
    }
  };

  render() {
    const { authenticated } = this.props;

    return (
      <div style={styles.container}>
        <Paper style={styles.hero} zDepth={2}>
          <h1 style={{ fontSize: "48px", margin: "0 0 20px 0" }}>
            Welcome to Dev Stack Bank
          </h1>
          <p style={{ fontSize: "20px", margin: "0" }}>
            Your trusted partner for modern banking solutions
          </p>
          <div style={styles.buttonContainer}>
            {!authenticated ? (
              <RaisedButton
                label="Get Started"
                primary={true}
                onClick={this.goToLogin}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <RaisedButton
                label="Go to My Account"
                primary={true}
                onClick={this.goToMyAccount}
              />
            )}
          </div>
        </Paper>

        <h2>Why Choose Us?</h2>
        <div style={styles.features}>
          <Paper style={styles.feature} zDepth={1}>
            <h3>💰 $1000 Welcome Bonus</h3>
            <p>Start with $1000 in your account when you sign up today!</p>
          </Paper>
          <Paper style={styles.feature} zDepth={1}>
            <h3>🔒 Secure Banking</h3>
            <p>Your money is safe with our advanced security measures</p>
          </Paper>
          <Paper style={styles.feature} zDepth={1}>
            <h3>⚡ Instant Transfers</h3>
            <p>Transfer money between accounts instantly and easily</p>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    authenticated: login.authenticated,
    userId: login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
