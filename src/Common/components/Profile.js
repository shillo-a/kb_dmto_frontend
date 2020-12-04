import React from 'react';
import AuthService from '../../Authorization/services/auth.service';
import { Container, Jumbotron, Tab, Tabs } from 'react-bootstrap';
import ProfileArcticleManager from '../../UserArticle/components/ProfileArcticleManager';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  console.log(currentUser)

  return (
    <React.Fragment>
      <Jumbotron>
        <h3>Здравствуйте, {currentUser.username} !</h3>
      </Jumbotron>
      <Tabs defaultActiveKey='articleManager' id='profile'>
        <Tab eventKey='articleManager' title='Управление статьями'>
          <ProfileArcticleManager />
        </Tab>
        <Tab eventKey='profileManager' title='Управление аккаунтом'>
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
