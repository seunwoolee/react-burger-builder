import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";
import Checkout from "./containters/Checkout/Checkout";
import Orders from "./containters/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="" exact component={BurgerBuilder}/>
        </Switch>
      </div>
    );
  }
}

export default App;
