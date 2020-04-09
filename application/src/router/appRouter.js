import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';

const mapStateToProps = (state) => ({ auth: state.auth });
const ProtectRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={ props => (
      !!auth.email && !!auth.token
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
);
const PrivateRoute = connect(mapStateToProps)(ProtectRoute);

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/order" exact component={OrderForm} />
        <PrivateRoute path="/view-orders" exact component={ViewOrders} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
