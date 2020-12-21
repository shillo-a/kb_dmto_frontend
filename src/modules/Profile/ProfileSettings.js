import React from 'react'
import AuthService from '../../services/apis/auth-service';

const ProfileSettings = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
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
{/* 
              <form action='' target='_blank'>
                <button className='m-3 btn btn-sm btn-primary'>
                  Сменить аватар
                </button>
              </form>
              <form action='' target='_blank'>
            <button className='m-3 btn btn-sm btn-primary'>Сменить пароль</button>
          </form> */}
            </div>
    )
}

export default ProfileSettings
