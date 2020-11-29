import React, { useState, useEffect } from 'react';
import UserRoleProjectService from '../services/UserRoleProjectService';

const UserRoleProject = (props) => {
  const initialUserRoleProjectState = {
    userId: null,
    roleProjectId: null,
    projectId: null,
    statusId: null,
  };
  const [currentUserRoleProject, setCurrentUserRoleProject] = useState(
    initialUserRoleProjectState
  );
  const [message, setMessage] = useState('');

  const getUserRoleProject = (id) => {
    UserRoleProjectService.getUserRoleProject(id)
      .then((response) => {
        setCurrentUserRoleProject(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserRoleProject(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUserRoleProject({ ...currentUserRoleProject, [name]: value });
  };

  const updateUserRoleProject = () => {
    UserRoleProjectService.updateUserRoleProject(
      currentUserRoleProject.id,
      currentUserRoleProject
    )
      .then((response) => {
        console.log(response.data);
        setMessage('USER_ROLE_PROJECT успешно изменен');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUserRoleProject = () => {
    UserRoleProjectService.deleteUserRoleProject(currentUserRoleProject.id)
      .then((response) => {
        console.log(response.data);
        props.history.push('/userroleproject/all');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUserRoleProject ? (
        <div className='edit-form'>
          <h4>User-Role-Project</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='userRoleProject'>UserRoleProject</label>
              <input
                type='text'
                className='form-control'
                id='userRoleProject'
                name='userRoleProject'
                value={currentUserRoleProject.id}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className='badge badge-danger mr-2'
            onClick={deleteUserRoleProject}
          >
            Удалить
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateUserRoleProject}
          >
            Редактировать
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p> Выберите User-Role-Project ...</p>
        </div>
      )}
    </div>
  );
};

export default UserRoleProject;
