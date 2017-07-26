import { 
  SEARCH_RESULTS_REQUEST,
  SEARCH_RESULTS_RETRIEVED,
  SEARCH_RESULTS_ERROR,
  SEARCH_INPUT_LOST_FOCUS,
  SEARCH_INPUT_GAINED_FOCUS,
  SEARCH_ITEM_CLICKED
} from '../constants/ActionTypes';

export default function counter(state = {
  searchText: '',
  searchResults: [],
  filterListIsVisible: false,
  isLoading: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case SEARCH_ITEM_CLICKED:
      return Object.assign({}, state, {
        searchText: action.searchText
      });

    case SEARCH_RESULTS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        filterListIsVisible: true,
        searchText: action.searchText
      });

    case SEARCH_RESULTS_RETRIEVED:
      return Object.assign({}, state, {
        searchResults: action.searchResults,
        isLoading: false
      });

    case SEARCH_RESULTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: action.errorMessage
      });

    case SEARCH_INPUT_LOST_FOCUS:
      return Object.assign({}, state, {
        filterListIsVisible: false
      });

    case SEARCH_INPUT_GAINED_FOCUS:
      return Object.assign({}, state, {
        filterListIsVisible: true
      });

    default:
      return state;
  }
}
