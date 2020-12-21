import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import NavbarMain from '../src/modules/Navbar/NavbarMain';

import Register from '../src/modules/Authorization/Register';
import Login from '../src/modules/Authorization/Login';
import Home from '../src/modules/Home/Home';

import Profile from '../src/modules/Profile/Profile';
import AdminPanel from '../src/modules/AdminPanel/AdminPanel'
import ArticleManager from '../src/modules/ArticleManager/ArticleManager';

import AllPublishedArticles from '../src/modules/PublishedArticles/AllPublishedArticles';
import PublishedArticle from '../src/modules/PublishedArticles/PublishedArticle';
import ArticleMaster from '../src/modules/ArticleMaster/ArticleMaster';

import FooterMain from './modules/Footer/FooterMain';

import AuthService from '../src/services/apis/auth-service'

// Role-based-access-control (RBAC)
// unathorized
// athorized - ROLE_USER, ROLE_MODERATOR, ROLE_OWNER

const App = () => {
    // для всего приложения запрашиваем текущего пользователя только здесь
    const [currentUser, setCurrentUser] = useState('')

    const [permissions, setPermissions] = useState({
            isAuthenticated: false,
            isUser: false,
            isModerator: false,
            isAdministrator: false
        })

    const [statusFetchData, setStatusFetchData] = useState(false)
    useEffect(()=>{
        
        const user = AuthService.getCurrentUser();
        if(user){
            setCurrentUser(user)
            setPermissions(prevState => {
                return({
                    ...prevState,
                    isAuthenticated: true,
                    isUser: user.roles.includes('ROLE_USER'),
                    isModerator: user.roles.includes('ROLE_MODERATOR'),
                    isAdministrator: user.roles.includes('ROLE_OWNER')
                })
            })
        } else {
            setPermissions(prevState => {
                return({
                    ...prevState,
                    isAuthenticated: false,
                    isUser: false,
                    isModerator: false,
                    isAdministrator: false
                })
            })
        }
        setStatusFetchData(true)
    }, [])

  return (
    <React.Fragment>
        <NavbarMain currentUser={currentUser} permissions={permissions}/>
            { statusFetchData ? 
                <Container className='container mt-3'>
                <Switch>
                
                    <Route exact path='/home' render={(props) => permissions.isAuthenticated?(<Home {...props}/>):(<Redirect to='/login'/>)} />
                    <Route path='/profile' render={(props) => permissions.isAuthenticated?(<Profile {...props} currentUser={currentUser} permissions={permissions}/>):(<Redirect to='/login'/>)}/>
                    
                    <Route exact path={'/article-manager/:articleId'} render={(props) => permissions.isAuthenticated?(<ArticleManager {...props} permissions={permissions} currentUser={currentUser}/>):(<Redirect to='/login'/>)}/>

                    <Route exact path={'/category/:categoryId/:categoryKey'} render={(props) => permissions.isAuthenticated?(<AllPublishedArticles {...props}/>):(<Redirect to='/login'/>)}/>
                    <Route exact path={'/article/:articleId'} render={(props) => permissions.isAuthenticated?(<PublishedArticle {...props} currentUser={currentUser}/>):(<Redirect to='/login'/>)}/>
                    
                    {/* Создание новой статьи */}
                    <Route exact path={'/article-master/'} render={(props) => permissions.isAuthenticated?(<ArticleMaster {...props}/>):(<Redirect to='/login'/>)}/>
                    {/* Редактирование published статьи */}
                    <Route exact path={'/article-master/base/:publishedArticleId'} render={(props) => permissions.isAuthenticated?(<ArticleMaster {...props}/>):(<Redirect to='/login'/>)}/>
                    {/* Редактирование draft статьи */}
                    <Route exact path={'/article-master/:draftArticleId'} render={(props) => permissions.isAuthenticated?(<ArticleMaster {...props}/>):(<Redirect to='/login'/>)}/>

                    
                    <Route exact path='/admin' render={(props) => permissions.isAuthenticated&&permissions.isAdministrator?(<AdminPanel {...props}/>):(<Redirect to='/home'/>)}/>
                    <Route exact path='/admin/register' render={(props) => permissions.isAuthenticated&&permissions.isAdministrator?(<Register {...props}/>):(<Redirect to='/home'/>)}/>
                   
            
                    <Route exact path='/login' render={(props) => !permissions.isAuthenticated?(<Login {...props}/>):(<Redirect to='/home'/>)}/>

                    <Redirect to='/home'/>
                </Switch>
            </Container>
            :
            <></>
            }
            
        <FooterMain />
    </React.Fragment>
  );
};

export default App;
