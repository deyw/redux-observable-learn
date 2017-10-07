import React from 'react';
import {
  compose,
  setDisplayName,
  defaultProps,
  withPropsOnChange,
  branch,
  renderComponent,
  renderNothing,
  pure
} from 'recompose';
import { connect } from 'react-redux';
import { fetchArticles } from '../reducers/actions';


const HOC = compose(
  setDisplayName('Articles'),
  connect(({ articles }) => ({
    data: articles.data,
    loading: articles.loading
  }), {
    fetchArticles
  }),
  defaultProps({
    loading: false,
    data: []
  }),
  withPropsOnChange(
    ['data'], ({ data }) => ({
      articles: data.map(({ id, title, url }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>url: {url}</p>
        </div>
      ))
    })
  ),
  branch(
    ({ loading }) => !loading,
    renderComponent(({ fetchArticles, articles }) => (
      <div>
        <button type="button" onClick={fetchArticles}>Load articles</button>
        {articles}
      </div>
    )),
    renderComponent(() => <p>Please wait...</p>)
  ),
  pure
);

export default HOC(renderNothing())
