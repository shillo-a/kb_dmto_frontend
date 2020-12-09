import React from 'react';
import { Jumbotron, Tab, Tabs } from 'react-bootstrap';

import AuthService from '../../services/apis/auth-service';
import ProfileArcticleManager from './ProfileArcticleManager';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <React.Fragment>
      <Jumbotron>
        <h3>Здравствуйте, {currentUser.username} !</h3>
      </Jumbotron>
      <Tabs defaultActiveKey='articleManager' id='profile' className="justify-content-center">
        <Tab eventKey='articleManager' title='Статьи'>
          <ProfileArcticleManager />
        </Tab>
        <Tab eventKey='profileManager' title='Настройки'>
          {
            <div className='container'>
              <br></br>
              <p>
                <strong>Логин:</strong> {currentUser.username}
              </p>
              <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{' '}
                ...{' '}
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )}
              </p>
              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <strong>Роли:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
              </ul>

              <form action='' target='_blank'>
                <button className='m-3 btn btn-sm btn-primary'>
                  Сменить аватар
                </button>
              </form>
              <form action='' target='_blank'>
            <button className='m-3 btn btn-sm btn-primary'>Сменить пароль</button>
          </form>
            </div>
            
          }
        </Tab>
      </Tabs>
    </React.Fragment>

  );
};

export default Profile;
