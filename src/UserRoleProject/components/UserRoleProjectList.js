import React, { useState, useEffect } from 'react';
import UserRoleProjectService from '../services/UserRoleProjectService';
import { Link } from 'react-router-dom';

const UserRoleProjectList = () => {
  const [userRoleProjects, setUserRoleProjects] = useState([]);
  const [currentUserRoleProject, setCurrentUserRoleProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveUserRoleProjects();
  }, []);

  const retrieveUserRoleProjects = () => {
    UserRoleProjectService.getUserRoleProjectAll()
      .then((response) => {
        setUserRoleProjects(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUserRoleProjects();
    setCurrentUserRoleProject(null);
    setCurrentIndex(-1);
  };

  const setActiveUserRoleProject = (userRoleProject, index) => {
    setCurrentUserRoleProject(userRoleProject);
    setCurrentIndex(index);
  };

  // const removeAllProjects = () => {
  //   ProjectService.removeAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const findByTitle = () => {
  //   ProjectService.findByTitle(searchTitle)
  //     .then((response) => {
  //       setProjects(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className='list row'>
      <div className='col-md-6'>
        <h4>Список User-Role-Project</h4>

        <ul className='list-group'>
          {userRoleProjects &&
            userRoleProjects.map((userRoleProject, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveUserRoleProject(userRoleProject, index)}
                key={index}
              >
                {userRoleProject.id}
              </li>
            ))}
        </ul>

        <form action='add' target='_blank'>
          <button className='m-3 btn btn-sm btn-success'>
            Добавить User-Role-Project
          </button>
        </form>
      </div>
      <div className='col-md-6'>
        {currentUserRoleProject ? (
          <div>
            <h4>User-Role-Project</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{' '}
              {currentUserRoleProject.id}
            </div>
            <div>
              <label>
                <strong>User_Id:</strong>
              </label>{' '}
              {currentUserRoleProject.project}
            </div>

            <Link
              to={'/userroleproject/' + currentUserRoleProject.id}
              className='badge badge-warning'
            >
              Редактировать
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Выберите Проект ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRoleProjectList;
