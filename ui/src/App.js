import React from "react";
import Dashboard from './pages/dashboard/index';
import SignIn from './pages/login/index';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import PrivateRoute from './routers/PrivateRoute'
import PublicRoute from './routers/PublicRouter'
export default function App() {
  return (
    <Router>
      <Route>
        <Switch>
          <PublicRoute restricted={true} component={SignIn} path="/" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </Route>
    </Router>);
}
