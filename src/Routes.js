import './App.css';
import React from 'react';
// import { Home } from './views/Home';
// import { About } from './views/About';
// import NavBar from './components/NavBar.js';
import Header from './components/Header.js';
import Signin from './Signin.jsx';
// import profile from './components/profile.png'; 
import Footer from './components/Footer.js';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <h2>Point of Care</h2>
      <Signin />
    </div>
  );
};

export default Routes;