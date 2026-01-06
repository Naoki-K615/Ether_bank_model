import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { fetchAccounts } from "../actions";
import formatMoney from "../formatMoney";

class UserManagementPage extends Component {
  componentDidMount() {
    const { dispatch, authenticated, userId } = this.props;
    
    // Only admin can access this page
    if (!authenticated || userId !== -1) {
      browserHistory.push("/");
      return;
    }
    
    dispatch(fetchAccounts());
  }

  render() {
    const { accounts } = this.props;
    const users = accounts.filter((acc) => acc.id !== -1);

    return (
      <div style={{ padding: "20px" }}>
        <h2>User Management</h2>
        <p>Total Users: {users.length}</p>

        <Paper style={{ marginTop: "20px" }}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Account Type</TableHeaderColumn>
                <TableHeaderColumn>Balance</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.accountType}</TableRowColumn>
                  <TableRowColumn>{formatMoney(user.balance)}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { accounts, login } = state;
  return {
    accounts: accounts.items || [],
    authenticated: login.authenticated,
    userId: login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);
