import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { resetErrorMessage, attemptLogout } from "../actions";
import "./app.css";
import Logout from "../components/Logout";
import Footer from "../components/Footer";

const styles = {
  title: {
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  content: {
    minHeight: "calc(100vh - 200px)",
    paddingBottom: "100px",
  },
};

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  componentDidMount() {
    const { dispatch, authenticated } = this.props;
    // Load accounts if user is authenticated (from localStorage)
    if (authenticated) {
      dispatch({ type: 'FETCH_ACCOUNTS_REQUEST' });
      const { fetchAccounts } = require('../actions');
      dispatch(fetchAccounts());
    }
  }

  goHome = () => {
    browserHistory.push("/");
  };

  goToAccounts = () => {
    browserHistory.push("/accounts");
  };

  goToUserAccounts = () => {
    browserHistory.push("/user-accounts");
  };

  goToUserManagement = () => {
    browserHistory.push("/user-management");
  };

  handleDismissClick = (e) => {
    this.props.resetErrorMessage();
    e.preventDefault();
  };

  renderErrorMessage() {
    const { errorMessage } = this.props;

    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: "#e99", padding: 10 }}>
        <b>{errorMessage}</b> (
        <a href="#" onClick={this.handleDismissClick}>
          Dismiss
        </a>
        )
      </p>
    );
  }

  renderNavigation() {
    const { authenticated, userId, onLogoutClick } = this.props;

    if (!authenticated) {
      return null;
    }

    const isAdmin = userId === -1;

    return (
      <div style={styles.navLinks}>
        <FlatButton
          label="Home"
          onClick={this.goHome}
          style={{ color: "white" }}
        />
        {isAdmin && (
          <div style={{ display: "flex", gap: "10px" }}>
            <FlatButton
              label="All Accounts"
              onClick={this.goToAccounts}
              style={{ color: "white" }}
            />
            <FlatButton
              label="User Management"
              onClick={this.goToUserManagement}
              style={{ color: "white" }}
            />
          </div>
        )}
        {!isAdmin && (
          <FlatButton
            label="My Account"
            onClick={this.goToUserAccounts}
            style={{ color: "white" }}
          />
        )}
        <Logout visible={authenticated} onClick={onLogoutClick} />
      </div>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div className="app">
        <AppBar
          title={<span style={styles.title}>Dev Stack Bank</span>}
          onTitleTouchTap={() => this.goHome()}
          showMenuIconButton={false}
          iconElementRight={this.renderNavigation()}
        />
        {this.renderErrorMessage()}
        <div style={styles.content}>{children}</div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    errorMessage: state.errorMessage,
    authenticated: login.authenticated,
    userId: login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(attemptLogout());
    },
    resetErrorMessage,
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
