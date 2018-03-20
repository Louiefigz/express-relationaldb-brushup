import React, { Component } from 'react';
import SignUp from "./components/user_account/signUp";

import { Route, Switch} from 'react-router-dom';

import Root from './components/rootComponents';



export default class App extends Component {

  render() {
    return (
      <Switch>
          <Route  path="/signup" name="Signup Page" component={SignUp}/>
          <Route  path="/" name="Root Component" component={Root}/>
      </Switch>
    );
  }
}



