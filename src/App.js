import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
          <BurgerBuilder/>

      </div>
    );
  }
}

export default App;
