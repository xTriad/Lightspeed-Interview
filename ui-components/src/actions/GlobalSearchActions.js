import axios from 'axios';
import { 
  SEARCH_RESULTS_REQUEST,
  SEARCH_RESULTS_RETRIEVED,
  SEARCH_RESULTS_ERROR,
  SEARCH_INPUT_LOST_FOCUS,
  SEARCH_INPUT_GAINED_FOCUS,
  SEARCH_ITEM_CLICKED
} from '../constants/ActionTypes';

export function searchInputLostFocus() {
  return dispatch => {
    setTimeout(() => {
      dispatch({type: SEARCH_INPUT_LOST_FOCUS })
    }, 300);
  }
}

export function searchInputGainedFocus(searchText) {
  return {
    type: SEARCH_INPUT_GAINED_FOCUS
  };
}

export function searchResultsRequest(searchText) {
  return {
    type: SEARCH_RESULTS_REQUEST,
    searchText: searchText
  };
}

export function searchResultsRetrieved(searchResults) {
  return {
    type: SEARCH_RESULTS_RETRIEVED,
    searchResults: searchResults
  };
}

export function searchResultsError(error) {
  return {
    type: SEARCH_RESULTS_ERROR,
    errorMessage: error.toString()
  };
}

export function searchItemClicked(item) {
  // window.location = '/users/1/show'; /[groups|users]/[id]/show
  return {
    type: SEARCH_ITEM_CLICKED,
    searchText: item.name
  };
}

export function requestSearchResults(searchText) {
  return (dispatch, getState) => {
    dispatch(searchResultsRequest(searchText));
    // const { globalSearch } = getState();
    axios.get('/api/globalsearch/get', {
      params: {
        searchtext: searchText
      }
    })
    .then(response => {
      dispatch(searchResultsRetrieved(response.data.searchResults))
    })
    .catch(error => dispatch(searchResultsError(error)));
  }
}
