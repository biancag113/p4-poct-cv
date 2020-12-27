import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    return(
        <div id='navbar'>
            <button><Link to="/Home">Home</Link></button>
            <button><Link to="/YourTests">Your Tests</Link></button>
            <button><Link to="/AddTest">Add Test</Link></button>
            <button><Link to="/Messages">Messages</Link></button>
            <button><Link to="/Help">Help</Link></button>
      </div>
    )
}

export default NavBar;


