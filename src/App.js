import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import NavbarMain from './Common/components/NavbarMain';

import Login from './Authorization/components/Login';
import Register from './Authorization/components/Register';
import Home from './Common/components/Home';
import Profile from './Common/components/Profile';
import BoardUser from './Common/components/BoardUser';
import BoardModerator from './Common/components/BoardModerator';
import BoardOwner from './Common/components/BoardOwner';

import RoleArticleList from './RoleArticle/components/RoleArticleList';
import RoleArticle from './RoleArticle/components/RoleArticle';
import AddRoleArticle from './RoleArticle/components/AddRoleArticle';

import AllPublishedArticles from './Article/components/AllPublishedArticles';
import PublishedArticle from './Article/components/PublishedArticle';
import ArticleMaster from './ArticleMaster/components/ArticleMaster';



const App = () => {
  
  return (
    <div>
      <NavbarMain/>
      <div className='container mt-3'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          
          <Route exact path={'/category/:categoryId/:categoryKey'} component={AllPublishedArticles} />
          <Route exact path={'/article/:articleId'} component={PublishedArticle} />
          <Route exact path={'/articlemaster'} component={ArticleMaster} />

          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />

          <Route path='/rolearticle/all' component={RoleArticleList} />
          <Route exact path='/rolearticle/add' component={AddRoleArticle} />
          <Route path='/rolearticle/:id' component={RoleArticle} />

          <Redirect to={'/home'}/>
          
        </Switch>
      </div>
    </div>
  );
};

export default App;
