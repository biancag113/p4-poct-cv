import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    return(
        <div id='navbar'>
            <button><Link style={{ textDecoration: 'none', color: '#FFF' }} to="/YourTests">Your Tests</Link></button>
            {/* <button><Link style={{ textDecoration: 'none', color: '#FFF' }} to="/AddTest">Add Tests</Link></button> */}
            <button><Link style={{ textDecoration: 'none', color: '#FFF' }} to="/Messages">Messages</Link></button>
            <button><Link style={{ textDecoration: 'none', color: '#FFF' }} to="/Help">Help</Link></button>
      </div>
    )
}

export default NavBar;


