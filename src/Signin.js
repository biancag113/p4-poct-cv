//GraphQL endpoint: https://4uy7rxusbnclzikom6uvz2z4du.appsync-api.us-west-2.amazonaws.com/graphql
//GraphQL API KEY: da2-hqmi3cs7rvfkjiist2tqk6nhhm

import './Signin.css';
import React from 'react';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import NavBar from './components/NavBar.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Routes } from './Routes.js';
import { Route, Switch, Redirect } from 'react-router-dom';

Amplify.configure(awsconfig);

function Signin() {
  return (
    <div className="App">
      <header className="App-header">
      <Header />
       <h2>Point of Care</h2>
      </header>
      <div id='signout'><AmplifySignOut /></div>
      <Switch>
        <NavBar />
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Routes} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withAuthenticator(Signin)
