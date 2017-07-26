import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';

class ListItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick() {
    const { item, history } = this.props;
    this.props.searchItemClicked(item);
    this.props.history.push(`/${item.type.toLowerCase()}s/${item.id}/show`);
  }

  render() {
    return (
      <div className="list-item" onClick={this.handleClick.bind(this)}>
        {this.props.item.name}
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  searchItemClicked: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// Provides us this.props.history
export default withRouter(ListItem);
