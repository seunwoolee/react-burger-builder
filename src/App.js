import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";
import Checkout from "./containters/Checkout/Checkout";
import Orders from "./containters/Orders/Orders";
import Auth from "./containters/Auth/Auth";
import Logout from "./containters/Auth/Logout/Logout";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="" exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
        )
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Switch>
            )
        }


        return (
          <div>
            <Layout />
              {routes}
          </div>
        );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

// export default withRouter(connect(null, mapDispatchToProps)(App));
export default connect(null, mapDispatchToProps)(App);
