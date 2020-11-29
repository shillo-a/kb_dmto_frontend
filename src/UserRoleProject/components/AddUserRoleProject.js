import React, { useState } from 'react';
import UserRoleProjectService from '../services/UserRoleProjectService';

const AddUserRoleProject = () => {
  const initialUserRoleProjectState = {
    userId: null,
    roleProjectId: null,
    projectId: null,
    statusId: null,
  };
  const [userRoleProject, setUserRoleProject] = useState(
    initialUserRoleProjectState
  );
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserRoleProject({ ...userRoleProject, [name]: value });
  };

  const saveUserRoleProject = () => {
    var data = {
      userId: userRoleProject.userId,
      roleProjectId: userRoleProject.roleProjectId,
      projectId: userRoleProject.projectId,
      statusId: userRoleProject.statusId,
    };

    UserRoleProjectService.createUserRoleProject(data)
      .then((response) => {
        setUserRoleProject({
          userRoleProject: response.data.userRoleProject,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUserRoleProject = () => {
    setUserRoleProject(initialUserRoleProjectState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>User-Role-Project успешно добавлен</h4>
          <button className='btn btn-success' onClick={newUserRoleProject}>
            Добавить
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='userId'>UserID</label>
            <input
              type='text'
              className='form-control'
              id='userId'
              required
              value={userRoleProject.userId}
              onChange={handleInputChange}
              name='userId'
            />
          </div>

          <button onClick={saveUserRoleProject} className='btn btn-success'>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUserRoleProject;
