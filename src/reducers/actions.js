export const types = {
  LOAD_STORIES: 'LOAD_STORIES',
  CLEAR_STORIES: 'CLEAR_STORIES',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_FULLFILLED: 'FETCH_USER_FULLFILLED',
  FETCH_ARTICLES: 'FETCH_ARTICLES',
  FETCH_ARTICLES_FULLFILLED: 'FETCH_ARTICLES_FULLFILLED',
  SEARCH_BEERS: 'SEARCH_BEERS',
  SEARCH_BEERS_LOADING: 'SEARCH_BEERS_LOADING',
  SEARCH_BEERS_ERROR: 'SEARCH_BEERS_ERROR',
  RECEIVED_BEERS: 'RECEIVED_BEERS',
  CANCEL_SEARCH: 'CANCEL_SEARCH'
};

export const loadStories = () => ({
  type: types.LOAD_STORIES
});

export const clearStories = () => ({
  type: types.CLEAR_STORIES
});

export const fetchUser = user => ({
  type: types.FETCH_USER,
  payload: user
});

export const fetchUsersFullFilled = user => ({
  type: types.FETCH_USER_FULLFILLED,
  payload: user
});

export const fetchArticles = (count = 5) => ({
  type: types.FETCH_ARTICLES,
  payload: count
});

export const fetchArticlesSuccess = articles => ({
  type: types.FETCH_ARTICLES_FULLFILLED,
  payload: articles
});

export const searchBeers = query => ({
  type: types.SEARCH_BEERS,
  payload: query
});

export const searchBeersLoading = (loading) => ({
  type: types.SEARCH_BEERS_LOADING,
  payload: loading
})

export const receiveBeers = beers => ({
  type: types.RECEIVED_BEERS,
  payload: beers
});

export const searchBeersError = err => ({
  type: types.SEARCH_BEERS_ERROR,
  payload: err.message
});

export const cancelSearch = () => ({
  type: types.CANCEL_SEARCH
});
