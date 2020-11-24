import axios from 'axios'
import { authHeader } from '../../common/services/auth-header'

import { API_URL } from '../../settings'

const getUserInfo = () => {
    return axios.get(API_URL + "users/info", { headers: authHeader() })
}

const getUserProjects = () => {
    return axios.get(API_URL + "userroleprojects/projects", { headers: authHeader() })
}

const createUserProject = (project) => {
    return axios.post(API_URL + `userroleprojects/createproject/${project}`, { headers: authHeader() })
}

export default {
    getUserProjects,
    getUserInfo,
    createUserProject 
}