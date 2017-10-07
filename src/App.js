import React, { Component } from 'react';
import Stories from './components/Stories';
import Users from './components/Users';
import Articles from './components/Articles';
import Beers from './components/Beers';


class App extends Component {
  render() {
    return (
      <div>
        <Stories />
        <Users />
        <Articles />
        <Beers />
      </div>
    );
  }
}

export default App;
