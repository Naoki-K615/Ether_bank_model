import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import { createAccount } from "../actions";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "Savings",
      isAdmin: false,
    };
  }

  handleAccountTypeChange = (event, index, value) => {
    this.setState({ accountType: value });
  };

  handleAdminCheckbox = (event, isChecked) => {
    this.setState({ isAdmin: isChecked });
  };

  onSignupClick() {
    const { dispatch } = this.props;
    let name = this.refs.name.input.value;
    let password = this.refs.password.input.value;
    let confirmPassword = this.refs.confirmPassword.input.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Give users $1000 starting balance
    dispatch(
      createAccount(
        name,
        1000,
        this.state.accountType,
        password,
        this.state.isAdmin
      )
    );
  }

  render() {
    const {
      nameValidationMessage,
    } = this.props;

    return (
      <div>
        <h3>Sign Up</h3>
        <h4>Create a new account</h4>

        <div>
          <TextField
            hintText="Full Name"
            floatingLabelText="Full Name"
            ref="name"
            errorText={nameValidationMessage}
          />
        </div>
        <div>
          <SelectField
            floatingLabelText="Account Type"
            value={this.state.accountType}
            onChange={this.handleAccountTypeChange}
          >
            <MenuItem value="Savings" primaryText="Savings" />
            <MenuItem value="Checking" primaryText="Checking" />
          </SelectField>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Checkbox
            label="Sign up as Admin"
            checked={this.state.isAdmin}
            onCheck={this.handleAdminCheckbox}
          />
        </div>
        <div>
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            ref="password"
          />
        </div>
        <div>
          <TextField
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            type="password"
            ref="confirmPassword"
          />
        </div>
        <RaisedButton
          label="Sign Up"
          primary={true}
          onClick={() => this.onSignupClick()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { createAccount } = state;
  return {
    nameValidationMessage: createAccount.nameValidationMessage,
  };
};

export default connect(mapStateToProps)(Signup);
