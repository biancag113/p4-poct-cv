import './App.css';
import React from 'react';
// import { Home } from './views/Home';
// import { About } from './views/About';
// import NavBar from './components/NavBar.js';
import Header from './components/Header.js';
import Signin from './Signin.js';
// import profile from './components/profile.png'; 
// import Footer from './components/Footer.js';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div id='container'>
      <h2>Point of Care</h2>
      <div id='signin'><Signin /></div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Routes} />
        <Route exact path="/Signin" component={Signin} />
      </Switch>
    </div>
  );
};

export default Routes;