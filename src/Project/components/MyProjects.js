import React, { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService';
import { Link } from 'react-router-dom';

const MyProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProjects();
  }, []);

  //Мои Проекты
  const retrieveProjects = () => {
    //Мои Проекты
    if (props.match.params.type === 'admin') {
      ProjectService.getActiveProjectAdmin()
        .then((response) => {
          setProjects(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //Проекты с моим участием
    if (props.match.params.type === 'part') {
      ProjectService.getActiveProjectPart()
        .then((response) => {
          setProjects(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const refreshList = () => {
    retrieveProjects();
    setCurrentProject(null);
    setCurrentIndex(-1);
  };

  const setActiveProject = (project, index) => {
    setCurrentProject(project);
    setCurrentIndex(index);
  };

  return (
    <div className='list row'>
      <div className='col-md-6'>
        <h4>Мои проекты</h4>

        <ul className='list-group'>
          {projects &&
            projects.map((project, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveProject(project, index)}
                key={index}
              >
                {project.project.project}
              </li>
            ))}
        </ul>
      </div>
      <div className='col-md-6'>
        {currentProject ? (
          <div>
            <h4>Проект</h4>
            <div>
              <label>
                <strong>ID Проектa:</strong>
              </label>{' '}
              {currentProject.id}
            </div>
            <div>
              <label>
                <strong>Проект:</strong>
              </label>{' '}
              {currentProject.project.project}
            </div>
            <div>
              <label>
                <strong>Роль:</strong>
              </label>{' '}
              {currentProject.roleProject.roleProject}
            </div>

            <Link
              to={'/project/' + currentProject.id}
              className='badge badge-warning'
            >
              Изменить
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Выберите проект...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
