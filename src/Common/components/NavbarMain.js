import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AuthService from '../../Authorization/services/auth.service';

const NavbarMain = () => {
    
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showOwnerBoard, setShowOwnerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        
        if (user) {
          setCurrentUser(user);
          setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
          setShowOwnerBoard(user.roles.includes('ROLE_OWNER'));
        }}, []);
    
    const logOut = () => {
        AuthService.logout();
    };
    
    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand>
          <Link to={'/home'} className='navbar-brand'>БЗКС</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {currentUser ? (
            <Nav>
              <Link to={'/profile'} className='nav-link'>{currentUser.username}</Link>
              <a href={'/login'} className='nav-link' onClick={logOut}>Выйти</a>
            </Nav>
          ):(null)}
        </Navbar.Collapse>

      </Navbar>
    )
}

export default NavbarMain;