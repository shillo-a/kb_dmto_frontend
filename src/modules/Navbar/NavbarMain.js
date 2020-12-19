import React, { useState, useEffect } from 'react';
import { Dropdown, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { PlusSquare } from 'react-bootstrap-icons';

import './style/navbar.css'

import AuthService from '../../services/apis/auth-service';

const NavbarMain = ({ currentUser, permissions }) => {

    const history = useHistory()
    const linkSelectHandler = (pathname) => {
        history.push(pathname)
    }

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
          
          {permissions.isAuthenticated ? (
            <Nav className='main-nav'>

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} id="dropdownProfile">
                    <PlusSquare size={25}/>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight>
                    <Dropdown.Item href='/article-master'>Создать статью</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} id="dropdownProfile">
                    {currentUser.username}
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight >
                    {permissions.isAdministrator?
                        <Dropdown.Item onClick={() => {linkSelectHandler('/admin')}}>Панель администратора</Dropdown.Item>
                    :<></>}
                    {permissions.isModerator?
                        <Dropdown.Item onClick={() => {linkSelectHandler('/profile/moderation')}}>На модерации</Dropdown.Item>
                    :<></>}
                    <Dropdown.Item onClick={() => {linkSelectHandler('/profile/articles')}}>Мои статьи</Dropdown.Item>
                    <Dropdown.Item onClick={() => {linkSelectHandler('/profile/settings')}}>Настройки</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/login" onClick={logOut}>Выйти</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            

            </Nav>
          ):<>/</>}

        </Navbar.Collapse>

      </Navbar>
    )
}

export default NavbarMain;