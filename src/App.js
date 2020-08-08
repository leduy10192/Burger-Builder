import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from  '../src/hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(()=> {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=> {
  return import('./containers/Auth/Auth');
})


class App extends Component {
  // state = {
  //   show: true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000)
  // }
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render(){
    // let routes = (
    //   <Switch> 
    //     <Route path='/auth' component={Auth}/>
    //     <Route path='/' component={BurgerBuilder}/>
    //     {/* Redirect if using exact
    //     <Route path='/' exact component={BurgerBuilder}/>
    //     <Redirect to="/"/> */} 
    //   </Switch>
    // )
    // if (this.props.isAuthenticated)  {
    //   routes = (
    //     <Switch> 
    //       <Route path='/checkout' component={Checkout}/>
    //       <Route path='/orders' component={Orders}/>
    //       <Route path='/logout' component={Logout}/>
    //       <Route path='/auth' component={Auth}/>
    //       <Route path='/' component={BurgerBuilder}/>
    //     </Switch> 
    //   );
    // }
    return (
      <div>
        <Layout>
          {/* Only load one of these routes the 1st one that matches */}
          <Switch> 
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/' component={BurgerBuilder}/>
          </Switch>
          {/* {routes} */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()  => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
