import React, { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService';

const Project = (props) => {
  const initialProjectState = {
    project: '',
  };
  const [currentProject, setCurrentProject] = useState(initialProjectState);
  const [message, setMessage] = useState('');

  const getProject = (id) => {
    ProjectService.getProject(id)
      .then((response) => {
        setCurrentProject(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProject(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const updateProject = () => {
    ProjectService.updateProject(currentProject.id, currentProject)
      .then((response) => {
        console.log(response.data);
        setMessage('Проект успешно изменен');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = () => {
    ProjectService.deleteProject(currentProject.id)
      .then((response) => {
        console.log(response.data);
        props.history.push('/project/all');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProject ? (
        <div className='edit-form'>
          <h4>Проект</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='project'>Project</label>
              <input
                type='text'
                className='form-control'
                id='project'
                name='project'
                value={currentProject.project}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className='badge badge-danger mr-2' onClick={deleteProject}>
            Удалить
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateProject}
          >
            Редактировать
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p> Выберите Проект ...</p>
        </div>
      )}
    </div>
  );
};

export default Project;
