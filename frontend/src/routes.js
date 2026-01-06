import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import WelcomePage from "./containers/WelcomePage";
import AccountsPage from "./containers/AccountsPage";
import UserAccountsPage from "./containers/UserAccountPage";
import UserManagementPage from "./containers/UserManagementPage";
import TransactionsPage from "./containers/TransactionsPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={WelcomePage} />
    <Route path="accounts" component={AccountsPage} />
    <Route path="user-accounts" component={UserAccountsPage} />
    <Route path="user-management" component={UserManagementPage} />
    <Route
      path="accounts/:accountId/transactions"
      component={TransactionsPage}
    />
  </Route>
);
