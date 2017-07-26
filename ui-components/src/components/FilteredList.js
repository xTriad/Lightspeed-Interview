import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';

export default class FilteredList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { globalSearch, actions } = this.props;
    const maxItemsPerGroup = 5;

    if(!globalSearch.filterListIsVisible) {
      return null;
    }

    let userList = [];
    let groupList = [];

    if(globalSearch.searchResults) {
      const searchText = globalSearch.searchText.toLowerCase();
      for(let i = 0; i < globalSearch.searchResults.length; i++) {
        let item = globalSearch.searchResults[i];
        let regex = new RegExp(searchText);
        if(regex.test(item.name.toLowerCase())) {
          item.id = i;
          if(item.type === 'User') {
            if(userList.length < maxItemsPerGroup) {
              userList.push(<ListItem key={i} item={item}
                searchItemClicked={actions.searchItemClicked} />);
            }
          } else {
            if(groupList.length < maxItemsPerGroup) {
              groupList.push(<ListItem key={i} item={item}
                searchItemClicked={actions.searchItemClicked} />);
            }
          }
        }
      }
    }

    return (
      <div className="filteredlist-container">
        {userList.length > 0 &&
          <div className="list-header">Users</div>
        }
        {userList.length > 0 && userList}

        {groupList.length > 0 &&
          <div className="list-header">Groups</div>
        }
        {groupList.length > 0 && groupList}
      </div>
    );
  }
}

FilteredList.propTypes = {
  globalSearch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
