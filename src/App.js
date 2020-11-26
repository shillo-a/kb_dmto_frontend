import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardOwner from "./components/BoardOwner";

import TutorialsList from "./Tutorial/components/TutorialsList";
import Tutorial from "./Tutorial/components/Tutorial";
import AddTutorial from "./Tutorial/components/AddTutorial";

import RoleArticleList from "./RoleArticle/components/RoleArticleList";
import RoleArticle from "./RoleArticle/components/RoleArticle";
import AddRoleArticle from "./RoleArticle/components/AddRoleArticle";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showOwnerBoard, setShowOwnerBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowOwnerBoard(user.roles.includes("ROLE_OWNER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Портал
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Дом
            </Link>
          </li>
         
          {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
          )}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Доска модератора
              </Link>
            </li>
          )}

          {showOwnerBoard && (
            <li className="nav-item">
              <Link to={"/owner"} className="nav-link">
                Админка
              </Link>
            </li>
          )}

          
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Выйти
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Логин
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Регистрация
              </Link>
            </li>
          </div>
        )}
      </nav>

   
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/owner" component={BoardOwner} />
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />

          <Route path="/rolearticle/all" component={RoleArticleList} />
          <Route exact path="/rolearticle/add" component={AddRoleArticle} />
          <Route path="/rolearticle/:id" component={RoleArticle} />


       </Switch>
      </div>
    </div>
  );
};

export default App;