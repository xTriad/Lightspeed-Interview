import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
// import DevTools from './DevTools';
import {
  BrowserRouter as Router,
  Route,
  Link,
  browserHistory,
  Switch
} from 'react-router-dom';

const UserGroupPage = (props) => {
  return (
    <div className="app-container">
      <div className="header">{/users/i.test(props.location.pathname) ? 'User' : 'Group'} Page</div>
      <p>User has the id of {props.match.params.id}.</p>
      <Link to="/">Home</Link>
    </div>
  );
}

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/users/:id/show" component={UserGroupPage} />
            <Route path="/groups/:id/show" component={UserGroupPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
};
