import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import NavBar from './components/NavBar.js';
import { AddTest } from './views/AddTest';
import { Help } from './views/Help';
import { Messages } from './views/Messages';
import { Routes } from './Routes.js';
import { YourTests } from './views/YourTests';
import { Route, Switch, Redirect } from 'react-router-dom';
// import  { listProducts } from './graphql/queries'
// import { useEffect, useState } from 'react';
import Amplify from 'aws-amplify';


Amplify.configure(awsconfig);

function Signin() {


  return (
    <div id="App">

      <header>
        <AmplifySignOut className='signout' />
      </header>

      <body>
      <YourTests />
      </body>
    

      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Routes} />
        <Route exact path="/YourTests" component={YourTests} />
        <Route exact path="/AddTest" component={AddTest} />
        <Route exact path="/Help" component={Help} />
        <Route exact path="/Messages" component={Messages} />
      </Switch>
      </div>
  );
}


export default withAuthenticator(Signin)
