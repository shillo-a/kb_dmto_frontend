import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import DataService from '../../modules/UserRoleProject/authorizationApi';

const initialState = {
    projects: [],
    status: 'idle',
    error: null
}

export const getUserProjects = createAsyncThunk('projects/getUserProjects', async() => {
    const response = await DataService.getUserProjects()
    return response.data
})

export const createUserProject = createAsyncThunk('projects/createUserProject', async(project) => {
    const response = await DataService.createUserProject(project)
    return response
})

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

    },
    extraReducers:{

        [getUserProjects.pending] : (state) => {
            state.status = 'loading'
        },
        [getUserProjects.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.projects = action.payload
        },
        [getUserProjects.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [createUserProject.fulfilled]: (state, action) => {
            state.projects.push(action.payload)
        }
    }
})

export const selectAllProjects = (state) => {
    const rawProjects = state.projects.projects
    const projects = rawProjects.map(rawProject => {
        return rawProject.project
    })
    return projects
}

export default projectSlice.reducer


