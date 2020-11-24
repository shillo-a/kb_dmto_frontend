import axios from 'axios'
import { authHeader } from '../../common/services/auth-header'

import { API_URL } from '../../settings'

const getAllRoleProjects = () => {
    return axios.get(API_URL + "owner/rolesproject", { headers: authHeader() })
}

const getRoleProject = (currentId) => {
    return axios.get(API_URL + `owner/rolesproject/${currentId}`, { headers: authHeader() })
}

const createRoleProject = (id, roleProject) => {
    return axios.post(API_URL + "owner/rolesproject",
    {id: id, roleProject: roleProject},
    { headers: authHeader() })
}

const deleteRoleProject = (currentId) => {
    return axios.delete(API_URL + `owner/rolesproject/${currentId}`,
    { headers: authHeader() })
}

const updateRoleProject = (currentId, id, roleProject) => {
    return axios.put(API_URL + `owner/rolesproject/${currentId}`,
    {id: id, roleProject: roleProject},
    { headers: authHeader() })
}

export default {
    getAllRoleProjects,
    getRoleProject,
    createRoleProject,
    deleteRoleProject,
    updateRoleProject
}