import { combineReducers } from 'redux';
import { types as t } from './actions';

const users = [
  {
    id: 1,
    first_name: 'Jeanette',
    last_name: 'Penddreth',
    email: 'jpenddreth0@census.gov',
    gender: 'Female',
    ip_address: '26.58.193.2'
  },
  {
    id: 2,
    first_name: 'Giavani',
    last_name: 'Frediani',
    email: 'gfrediani1@senate.gov',
    gender: 'Male',
    ip_address: '229.179.4.212'
  },
  {
    id: 3,
    first_name: 'Noell',
    last_name: 'Bea',
    email: 'nbea2@imageshack.us',
    gender: 'Female',
    ip_address: '180.66.162.255'
  }
];

const initialState = {
  items: []
};

export const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOAD_STORIES:
      return {
        items: [...users]
      };
    case t.CLEAR_STORIES:
      return {
        items: []
      };
    default:
      return state;
  }
};

const initialUsersState = {
  items: ['shakyshane', 'sindresorhus', 'substack'],
  current: null,
  loading: false
};

const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case t.FETCH_USER:
      return {
        ...state,
        current: null,
        loading: true
      };
    case t.FETCH_USER_FULLFILLED:
      return {
        ...state,
        current: payload,
        loading: false
      };
    default:
      return state;
  }
};


const articlesInitialState = {
  data: [],
  loading: false
}

const articlesReducer = (state = articlesInitialState, { type, payload }) => {
  switch (type) {
    case t.FETCH_ARTICLES:
      return {
        data: [],
        loading: true
      };
    case t.FETCH_ARTICLES_FULLFILLED:
      return {
        data: payload,
        loading: false
      };
      default:
        return state;
  }
}

const beersInitalState = {
  data: [],
  loading: false
};

const beersReducer = (state = beersInitalState, { type, payload}) => {
  switch (type) {
    case t.SEARCH_BEERS_LOADING:
      return {
        ...state,
        loading: payload
      }
    case t.SEARCH_BEERS:
      return {
        ...state,
        error: null
      };
    case t.SEARCH_BEERS_ERROR:
      return {
        ...state,
        data: [],
        error: payload,
        loading: false
      }
    case t.RECEIVED_BEERS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null
      };
    case t.CANCEL_SEARCH:
      return {
        ...state,
        loading: false,
        data: []
      }
    default:
      return state;
  }
}

export default combineReducers({
  stories: storiesReducer,
  users: usersReducer,
  articles: articlesReducer,
  beers: beersReducer
});
