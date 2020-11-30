import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './Authorization/services/auth.service';

import Login from './Authorization/components/Login';
import Register from './Authorization/components/Register';
import Home from './Common/components/Home';
import Profile from './Authorization/components/Profile';
import BoardUser from './Common/components/BoardUser';
import BoardModerator from './Common/components/BoardModerator';
import BoardOwner from './Common/components/BoardOwner';

import TutorialsList from './Tutorial/components/TutorialsList';
import Tutorial from './Tutorial/components/Tutorial';
import AddTutorial from './Tutorial/components/AddTutorial';

import RoleArticleList from './RoleArticle/components/RoleArticleList';
import RoleArticle from './RoleArticle/components/RoleArticle';
import AddRoleArticle from './RoleArticle/components/AddRoleArticle';

import ProjectList from './Project/components/ProjectList';
import Project from './Project/components/Project';
import AddProject from './Project/components/AddProject';
import CreateProjectCurrUser from './Project/components/CreateProjectCurrUser';
import MyProjects from './Project/components/MyProjects';

import UserRoleProjectList from './UserRoleProject/components/UserRoleProjectList';
import UserRoleProject from './UserRoleProject/components/UserRoleProject';
import AddUserRoleProject from './UserRoleProject/components/AddUserRoleProject';


import AllPublishedArcticles from './Article/components/AllPublishedArcticles';
import PublishedArcticle from './Article/components/PublishedArcticle';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showOwnerBoard, setShowOwnerBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowOwnerBoard(user.roles.includes('ROLE_OWNER'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/home'} className='navbar-brand'>
          TASKEL
        </Link>
        <div className='navbar-nav mr-auto'>
          {currentUser && (
            <li className='nav-item'>
              <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                  Проекты
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='/createproject'>
                    Новый проект
                  </Dropdown.Item>
                  <Dropdown.Item href='/myprojects/admin'>
                    Мои проекты
                  </Dropdown.Item>
                  <Dropdown.Item href='/myprojects/part'>
                    Проекты с моим участием
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Доска модератора
              </Link>
            </li>
          )}

          {showOwnerBoard && (
            <li className='nav-item'>
              <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                  Админка
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='/tutorials'>Tutorial</Dropdown.Item>
                  <Dropdown.Item href='/rolearticle/all'>
                    RoleProject
                  </Dropdown.Item>
                  <Dropdown.Item href='/project/all'>Project</Dropdown.Item>
                  <Dropdown.Item href='/userroleproject/all'>
                    UserRoleProject
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                Выйти
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Вход
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/register'} className='nav-link'>
                Регистрация
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          
          <Route exact path={'/category/:categoryId'} component={AllPublishedArcticles} />
          <Route exact path={'/arcticle/:arcticleId'} component={PublishedArcticle} />


          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/user' component={BoardUser} />
          <Route path='/mod' component={BoardModerator} />
          <Route path='/owner' component={BoardOwner} />

          <Route exact path='/add' component={AddTutorial} />
          <Route path='/tutorials/:id' component={Tutorial} />

          <Route path='/rolearticle/all' component={RoleArticleList} />
          <Route exact path='/rolearticle/add' component={AddRoleArticle} />
          <Route path='/rolearticle/:id' component={RoleArticle} />

          <Route path='/project/all' component={ProjectList} />
          <Route exact path='/project/add' component={AddProject} />
          <Route path='/project/:id' component={Project} />
          <Route exact path='/createproject' component={CreateProjectCurrUser}/>
          <Route exact path='/myprojects/:type' component={MyProjects} />

          <Route path='/userroleproject/all' component={UserRoleProjectList} />
          <Route exact path='/userroleproject/add' component={AddUserRoleProject}/>
          <Route path='/userroleproject/:id' component={UserRoleProject} />

          {/* <Route path='/article/:articleId' component={Article}/>
          <Route exact path='/add/article' component={AddArtilce}/> */}

          {/* ПРИ ВХОДЕ РЕДИРЕКТИМ НА ФОРМУ ВХОДА, ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН НА ГЛАВНУЮ СТРАНИЦУ */}
          <Redirect to={'/login'}/>
          
        </Switch>
      </div>
    </div>
  );
};

export default App;
