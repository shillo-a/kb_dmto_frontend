import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import NavbarMain from '../src/modules/Navbar/NavbarMain';

import Register from '../src/modules/Authorization/Register';
import Login from '../src/modules/Authorization/Login';
import Home from '../src/modules/Home/Home';
import Profile from '../src/modules/Profile/Profile';

import AllPublishedArticles from '../src/modules/PublishedArticles/AllPublishedArticles';
import PublishedArticle from '../src/modules/PublishedArticles/PublishedArticle';
import ArticleMaster from '../src/modules/ArticleMaster/ArticleMaster';

const App = () => {
  
  return (
    <React.Fragment>
        <NavbarMain/>
        <Container className='container mt-3'>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/profile' component={Profile} />

                <Route exact path={'/category/:categoryId/:categoryKey'} component={AllPublishedArticles} />
                <Route exact path={'/article/:articleId'} component={PublishedArticle} />
                <Route exact path={'/articlemaster'} component={ArticleMaster} />

                <Redirect to={'/login'}/>
            </Switch>
        </Container>
    </React.Fragment>
  );
};

export default App;
