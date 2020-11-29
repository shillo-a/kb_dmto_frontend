import http from '../../http-common';
import authHeader from '../../Authorization/services/auth-header';

const getUserRoleProjectAll = () => {
  return http.get('/owner/userroleprojects', { headers: authHeader() });
};

const getUserRoleProject = (id) => {
  return http.get('/owner/userroleprojects/' + id, { headers: authHeader() });
};

const createUserRoleProject = (data) => {
  return http.post('/owner/userroleprojects', data, { headers: authHeader() });
};

const updateUserRoleProject = (id, data) => {
  return http.put('/owner/userroleprojects/' + id, data, {
    headers: authHeader(),
  });
};

const deleteUserRoleProject = (id) => {
  return http.delete('/owner/userroleprojects/' + id, {
    headers: authHeader(),
  });
};

export default {
  getUserRoleProjectAll,
  getUserRoleProject,
  createUserRoleProject,
  updateUserRoleProject,
  deleteUserRoleProject,
};
