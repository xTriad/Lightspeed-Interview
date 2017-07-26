import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GlobalSearchActions from '../actions/GlobalSearchActions';
import GlobalSearch from '../components/GlobalSearch';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    const { globalSearch, actions, history } = this.props;
    return (
      <div className="app-container">
        <div className="header">LightSpeed UI Components</div>
        <h4>Global Search</h4>
        <GlobalSearch globalSearch={globalSearch} actions={actions} />
      </div>
    );
  }
}

App.propTypes = {
  globalSearch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    globalSearch: state.globalSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GlobalSearchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
