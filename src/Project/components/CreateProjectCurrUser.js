import React, { useState } from 'react';
import ProjectService from '../services/ProjectService';

const CreateProjectCurrUser = () => {
  const initialProjectState = {
    id: null,
    project: '',
  };
  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      project: project.project,
    };

    ProjectService.createProjectCurrUser(data)
      .then((response) => {
        setProject({
          project: response.data.project,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProject = () => {
    setProject(initialProjectState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>Проект успешно добавлен</h4>
          <button className='btn btn-success' onClick={newProject}>
            Добавить
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='project'>Проект</label>
            <input
              type='text'
              className='form-control'
              id='project'
              required
              value={project.project}
              onChange={handleInputChange}
              name='project'
            />
          </div>

          <button onClick={saveProject} className='btn btn-success'>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateProjectCurrUser;
