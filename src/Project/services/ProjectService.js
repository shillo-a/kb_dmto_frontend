import http from '../../http-common';
import authHeader from '../../Authorization/services/auth-header';

const getProjectAll = () => {
  return http.get('/owner/projects', { headers: authHeader() });
};

const getProject = (id) => {
  return http.get('/owner/projects/' + id, { headers: authHeader() });
};

const createProject = (data) => {
  return http.post('/owner/projects', data, { headers: authHeader() });
};

const updateProject = (id, data) => {
  return http.put('/owner/projects/' + id, data, { headers: authHeader() });
};

const deleteProject = (id) => {
  return http.delete('/owner/projects/' + id, { headers: authHeader() });
};

//Создание Проекта текущим пользователем
const createProjectCurrUser = (data) => {
  return http.post('/projects/create', data, { headers: authHeader() });
};

//Получение активных Проектов по текущему Пользователю, где он Админ - Мои проекты
const getActiveProjectAdmin = () => {
  return http.get('/userroleprojects/projects/admin', {
    headers: authHeader(),
  });
};

//Получение активных Проектов по текущему Пользователю, где он Участник - Проекты с моим участием
const getActiveProjectPart = () => {
  return http.get('/userroleprojects/projects/part', { headers: authHeader() });
};

export default {
  getProjectAll,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  createProjectCurrUser,
  getActiveProjectAdmin,
  getActiveProjectPart,
};
