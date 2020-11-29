import React from 'react';
import AuthService from '../services/auth.service';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Tabs defaultActiveKey='info' id='profile'>
      <Tab eventKey='info' title='Информация'>
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
          </div>
        }
      </Tab>

      <Tab eventKey='taks' title='Настройки'>
        <form action='' target='_blank'>
          <button className='m-3 btn btn-sm btn-primary'>Сменить пароль</button>
        </form>
      </Tab>
    </Tabs>

    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>
    //       <strong>{currentUser.username}</strong>  Профиль
    //     </h3>
    //   </header>
    //   <p>
    //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
    //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
    //   </p>
    //   <p>
    //     <strong>Id:</strong> {currentUser.id}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {currentUser.email}
    //   </p>
    //   <strong>Роли:</strong>
    //   <ul>
    //     {currentUser.roles &&
    //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    //   </ul>
    // </div>
  );
};

export default Profile;
