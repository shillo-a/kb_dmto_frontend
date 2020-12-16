import React, { useState, useEffect } from 'react';
import { Jumbotron, Tab, Tabs } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Redirect, Route, useHistory } from 'react-router-dom';

import ProfileArticleManager from '../ProfileArticleManager/ProfileArticleManager';
import ProfileArticleModeration from '../ProfileArticleModeration/ProfileArticleModeration';
import ProfileSettings from './ProfileSettings';

const Profile = ({ match, location, currentUser, permissions }) => {

    const { path } = match;

    //Куда был выполнен вход (подсветка таба)
    const [key, setKey] = useState(location)

    //Определяем по какой ссылки зашёл пользователь для подсветки tab-a
    useEffect(()=>{
        setKey(location.pathname)
    }, [location])

  //Определяем внутри профиля на какую ссылку необходимо осуществить переход
  const history = useHistory()
  useEffect(()=>{
      if (key === `${path}/moderation`){history.push(`${path}/moderation`)} 
      else if(key === `${path}/articles`){history.push(`${path}/articles`)} 
      else if(key === `${path}/settings`){history.push(`${path}/settings`)}
  }, [key])

  return (
    <React.Fragment>

        <Jumbotron>
            <h3>Здравствуйте, {currentUser.username} !</h3>
        </Jumbotron>

        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="justify-content-center">
            {permissions.isModerator ? <Tab eventKey={`${path}/moderation`} title='На модерации'></Tab> : <></>}
            <Tab eventKey={`${path}/articles`} title='Мои статьи'></Tab>
            <Tab eventKey={`${path}/settings`} title='Настройки'></Tab>
        </Tabs>

        <div className="tabs">
            <Switch>
                <Route path={`${path}/moderation`} render={(props) => permissions.isAuthenticated&&permissions.isModerator?(<ProfileArticleModeration {...props}/>):(<Redirect to='/home'/>)}/>
                <Route path={`${path}/articles`} component={ProfileArticleManager}/>
                <Route path={`${path}/settings`} component={ProfileSettings}/>
            </Switch>
        </div>

    </React.Fragment>

  );
};

export default Profile;
