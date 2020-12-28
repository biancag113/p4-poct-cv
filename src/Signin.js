//GraphQL endpoint: https://4uy7rxusbnclzikom6uvz2z4du.appsync-api.us-west-2.amazonaws.com/graphql
//GraphQL API KEY: da2-hqmi3cs7rvfkjiist2tqk6nhhm

import './App.css';
import React from 'react';


import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import NavBar from './components/NavBar.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { AddTest } from './views/AddTest';
import { Help } from './views/Help';
import { Home } from './views/Home';
import { Messages } from './views/Messages';
import { YourTests } from './views/YourTests';

import { Routes } from './Routes.js';
import { Route, Switch, Redirect } from 'react-router-dom';

Amplify.configure(awsconfig);

function Signin() {
  return (
    <div id="App">
      <AmplifySignOut />
      <NavBar />

      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Routes} />
        <Route exact path="/AddTest" component={AddTest} />
        <Route exact path="/Help" component={Help} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Messages" component={Messages} />
        <Route exact path="/YourTests" component={YourTests} />
      </Switch>

    </div>
  );
}

export default withAuthenticator(Signin)
