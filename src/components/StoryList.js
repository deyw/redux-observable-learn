import React from 'react';
import {
  compose,
  defaultProps,
  withPropsOnChange,
  branch,
  renderComponent,
  renderNothing,
  pure
} from 'recompose';

import Story from './Story';

const StoryList = ({ _items }) => <div>{_items}</div>;

const HOC = compose(
  defaultProps({
    items: []
  }),
  withPropsOnChange(['items'], ({ items }) => ({
    _items: items.map(item => <Story {...item} key={item.id} />)
  })),
  branch(
    ({ items }) => items.length,
    renderComponent(StoryList),
    renderComponent(() => null)
  ),
  pure
);

export default HOC(renderNothing());
