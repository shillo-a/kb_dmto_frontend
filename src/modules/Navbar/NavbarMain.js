import React, { useState, useEffect } from 'react';
import { Dropdown, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FileEarmarkPlus, PlusSquare } from 'react-bootstrap-icons';

import './style/navbar.css'

import AuthService from '../../services/apis/auth-service';

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

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} id="dropdownProfile">
                    <PlusSquare size={25}/>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight>
                    <Dropdown.Item href="/articlemaster">Создать статью</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} id="dropdownProfile">
                    {currentUser.username}
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight>
                    <Dropdown.Item href="/profile">Личный кабинет</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/login" onClick={logOut}>Выйти</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            

            </Nav>
          ):(null)}

        </Navbar.Collapse>

      </Navbar>
    )
}

export default NavbarMain;