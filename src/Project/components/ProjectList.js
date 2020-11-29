import React, { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    retrieveProjects();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveProjects = () => {
    ProjectService.getProjectAll()
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
        <h4>Список Проектов</h4>

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
                {project.project}
              </li>
            ))}
        </ul>

        <form action='add' target='_blank'>
          <button className='m-3 btn btn-sm btn-success'>
            Добавить Project
          </button>
        </form>
      </div>
      <div className='col-md-6'>
        {currentProject ? (
          <div>
            <h4>Проект</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{' '}
              {currentProject.id}
            </div>
            <div>
              <label>
                <strong>Project:</strong>
              </label>{' '}
              {currentProject.project}
            </div>

            <Link
              to={'/project/' + currentProject.id}
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

export default ProjectList;
