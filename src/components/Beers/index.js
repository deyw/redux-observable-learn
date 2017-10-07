import React from 'react';
import {
  compose,
  setDisplayName,
  defaultProps,
  withHandlers,
  withPropsOnChange,
  branch,
  renderComponent,
  renderNothing,
  pure
} from 'recompose';
import { connect } from 'react-redux';
import { searchBeers, cancelSearch } from '../../reducers/actions';

import Search from './Search';

const BeersHOC = compose(
  setDisplayName('Beers'),
  defaultProps({
    loading: false,
    data: []
  }),
  connect(
    ({ beers }) => ({
      data: beers.data,
      loading: beers.loading
    }),
    null
  ),
  withPropsOnChange(['data'], ({ data }) => ({
    _beers:
      data.length > 0 &&
      data.map(beer => (
        <li key={beer.id}>
          <figure>
            <img src={beer.image_url} height="180" alt={beer.name} />
          </figure>
          <p>
            {beer.name} <small>{beer.tagline}</small>
          </p>
        </li>
      ))
  })),
  branch(
    ({ loading }) => loading,
    renderComponent(() => <p>Loading...</p>),
    renderComponent(({ data, _beers }) => (
      <div>
        <h3>Search results: ({data.length})</h3>
        {_beers}
      </div>
    ))
  ),
  pure
);

const Beers = BeersHOC(renderNothing());

const enhance = compose(
  connect(
    ({ beers }) => ({
      error: beers.error,
      loading: beers.loading
    }),
    { searchBeers, cancelSearch }
  ),
  withHandlers({
    _handleSearch: ({ searchBeers }) => query => {
      searchBeers(query);
    }
  })
);

const BeersComp = ({ error, _handleSearch, loading, cancelSearch }) => (
  <div style={{ margin: '40px' }}>
    <Search
      onChange={_handleSearch}
      defaultValue={''}
      errorMessage={error}
      loading={loading}
      cancel={cancelSearch}
    />
    <Beers />
  </div>
);

export default enhance(BeersComp);
