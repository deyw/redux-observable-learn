import React from 'react';
import { connect } from 'react-redux';
import StoryList from './StoryList';
import { loadStories, clearStories } from '../reducers/actions';


const Stories = ({ loadStories, clearStories, items }) => (
  <div>
   <button type="button" onClick={loadStories}>Load top 3 stories</button>
   <button type="button" onClick={clearStories}>Clear</button>
    <StoryList items={items} />
  </div>
);

export default connect(({ stories }) => ({
  items: stories.items
}), { loadStories, clearStories })(Stories);