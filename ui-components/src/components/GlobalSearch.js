import React, { Component, PropTypes } from 'react';
import FilteredList from './FilteredList';

export default class GlobalSearch extends Component {
  constructor(props, context) {
    super(props, context);
    // Using redux than than this.state = {searchText: ''};
  }

  handleSearchChange(event) {
    // Using redux rather than this.setState({searchText: event.target.value});
    this.props.actions.requestSearchResults(event.target.value);
  }

  handleBlurEvent() {
    this.props.actions.searchInputLostFocus();
  }

  handleFocusEvent() {
    this.props.actions.searchInputGainedFocus();
  }

  render() {
    const { globalSearch, actions, history } = this.props;
    return (
      <div className="search-container">
        <div className="input-container">
          <label htmlFor="search-input-field-1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="text"
            id="search-input-field-1"
            className="input-field"
            placeholder="Search..."
            value={globalSearch.searchText}
            onChange={this.handleSearchChange.bind(this)}
            onBlur={this.handleBlurEvent.bind(this)}
            onFocus={this.handleFocusEvent.bind(this)} />
        </div>
        <FilteredList globalSearch={globalSearch} actions={actions} />

        {/*<br />
        <div>Search Text: {globalSearch.searchText}</div>
        <div>Loading: {globalSearch.isLoading ? 'True' : 'False'}</div>
        <div>Error: {globalSearch.errorMessage}</div>*/}
      </div>
    );
  }
}

GlobalSearch.propTypes = {
  globalSearch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
