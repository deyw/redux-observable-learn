import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import {
  types,
  clearStories,
  fetchUsersFullFilled,
  fetchArticlesSuccess,
  receiveBeers,
  searchBeersLoading,
  searchBeersError
} from '../reducers/actions';

const topArticles =
  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
const url = id =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

const beersUrl = 'https://api.punkapi.com/v2/beers';

const search = term => `${beersUrl}?beer_name=${encodeURIComponent(term)}`;

const ajax = term => Observable.ajax.getJSON(search(term));

function loadStoriesEpic(action$) {
  return action$
    .ofType(types.LOAD_STORIES)
    .switchMap(() => Observable.of(clearStories()).delay(2000));
}

function fetchUserEpic(action$) {
  return action$.ofType(types.FETCH_USER).switchMap(({ payload }) =>
    Observable.ajax
      .getJSON(`https://api.github.com/users/${payload}`)
      .map(user => fetchUsersFullFilled(user))
      .delay(1000)
  );
}

function fetchArticlesEpic(action$) {
  return action$.ofType(types.FETCH_ARTICLES).switchMap(({ payload }) =>
    Observable.ajax
      .getJSON(topArticles)
      // slice first 5 ids
      .map(ids => ids.slice(0, 5))
      .map(ids => ids.map(url))
      .map(urls => urls.map(url => Observable.ajax.getJSON(url)))
      .mergeMap(reqs => Observable.forkJoin(reqs))
      .map(articles => fetchArticlesSuccess(articles))
  );
}

function searchBeersEpic(action$) {
  return action$
    .ofType(types.SEARCH_BEERS)
    .debounceTime(500)
    .filter(action => action.payload !== '')
    .switchMap(({ payload }) => {
      const loading = Observable.of(searchBeersLoading(true))

      const blockers = Observable.merge(
        action$.ofType(types.CANCEL_SEARCH),
        // action$.ofType(types.NAVIGATE)
      )
      
      const request = ajax(payload)
        .delay(1500)
        .takeUntil(blockers)
        .map(receiveBeers)
        .catch(err => Observable.of(searchBeersError(err)));

      return Observable.concat(
        loading,
        request
      );
    });
    
}

export default combineEpics(
  loadStoriesEpic,
  fetchUserEpic,
  fetchArticlesEpic,
  searchBeersEpic
);
