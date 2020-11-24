import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { messageGenerator } from '../../common/services/messageGenerator';
import DataService from './roleProjectApi';

const initialState = {
    statuses: {
        getAllRoleProjects: 'idle',
        getRoleProject: 'idle',
        createRoleProject: 'idle',
        deleteRoleProject: 'idle',
        updateRoleProject: 'idle'
    },
    messages: [],
    roleProjects: []
}

export const getAllRoleProjects = createAsyncThunk(
    'roleProject/getAllRoleProjects', 
    async(dummy, {rejectWithValue}) => {
        try {
            const response = await DataService.getAllRoleProjects()
            return {data: response.data, httpStatus: response.status}
        } catch (err) {
            return {data: rejectWithValue(err.response.data), httpStatus: rejectWithValue(err.response.status)} 
        }
})

export const createRoleProject = createAsyncThunk(
    'roleProject/createRoleProject', 
    async({id, roleProject}, {rejectWithValue}) => {
        try {
            const response = await DataService.createRoleProject(id, roleProject)
            return {data: response.data, httpStatus: response.status}
        } catch (err) {
            return {data: rejectWithValue(err.response.data), httpStatus: rejectWithValue(err.response.status)} 
        }
})

export const deleteRoleProject = createAsyncThunk(
    'roleProject/deleteRoleProject', 
    async(id, {rejectWithValue}) => {
        try {
            const response = await DataService.deleteRoleProject(id)
            return {data: id, httpStatus: response.status}
        } catch (err) {
            return {data: rejectWithValue(err.response.data), httpStatus: rejectWithValue(err.response.status)} 
        }
})

export const getRoleProject = createAsyncThunk(
    'roleProject/getRoleProject', 
    async(currentId, { rejectWithValue }) => {
        try {
            const response = await DataService.getRoleProject(currentId)
            return response.data
        } catch (err) {
            console.log(err.response)
            return rejectWithValue(err)
        }
        
})





export const updateRoleProject = createAsyncThunk('roleProject/updateRoleProject', async({currentId, id, roleProject}) => {
    const response = await DataService.updateRoleProject(currentId, id, roleProject)
    return response.data
})

const roleProjectSlice = createSlice({
    name: 'roleProject',
    initialState,
    reducers:{},
    extraReducers:{
        [getAllRoleProjects.pending]: (state) => {
            state.statuses.getAllRoleProjects = 'loading'
        },
        [getAllRoleProjects.fulfilled]: (state, action) => {
            state.statuses.getAllRoleProjects = 'succeeded'
            state.roleProjects = action.payload.data
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },
        [getAllRoleProjects.rejected]: (state, action) => {
            state.statuses.getAllRoleProjects = 'failed'
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },

        [getRoleProject.pending]: (state) => {
            state.statuses.getRoleProject = 'loading'
        },
        [getRoleProject.fulfilled]: (state, action) => {
            state.statuses.getRoleProject = 'succeeded'
            const {id} = action.payload
            const existingRoleProject = state.roleProjects.find(roleProject => roleProject.id === id)
            if(!existingRoleProject){
                state.roleProjects.push(action.payload)
            }
        },
        [getRoleProject.rejected]: (state, action) => {
            state.statuses.getRoleProject = 'failed'
            console.log(action)
        },

        [createRoleProject.pending]: (state) => {
            state.statuses.createRoleProject = 'loading'
        },
        [createRoleProject.fulfilled]: (state, action) => {
            state.statuses.createRoleProject = 'succeeded'
            state.roleProjects.push(action.payload.data)
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },
        [createRoleProject.fulfilled]: (state, action) => {
            state.statuses.createRoleProject = 'failed'
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },

        [deleteRoleProject.pending]: (state) => {
            state.statuses.deleteRoleProject = 'loading'
        },
        [deleteRoleProject.fulfilled]: (state, action) => {
            state.statuses.deleteRoleProject = 'succeeded'
            state.roleProjects = state.roleProjects.filter(roleProject => {
                return roleProject.id !== action.payload.data
            })
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },
        [deleteRoleProject.rejected]: (state, action) => {
            state.statuses.deleteRoleProject = 'failed'
            state.messages.push(messageGenerator(action.payload.httpStatus))
        },

        [updateRoleProject.fulfilled]: (state, action) => {
            state.statuses.updateRoleProject = 'succeeded'
            const {id, roleProject} = action.payload
            const existingRoleProject = state.roleProjects.find(roleProject => roleProject.id === id)
            if (existingRoleProject) {
                existingRoleProject.id = id
                existingRoleProject.roleProject = roleProject
            }
        },

    }
})

export const selectAllRoleProjects = state => state.roleProject.roleProjects
export const selectRoleProjectById = (state, roleProjectId) => {
    return state.roleProject.roleProjects.find(roleProject => roleProject.id === roleProjectId)
}

export const selectGetAllRoleProjectsStatus = state => state.roleProject.statuses.getAllRoleProjects
export const selectGetRoleProjectStatus = state => state.roleProject.statuses.getRoleProject
export const selectCreateRoleProjectStatus = state => state.roleProject.statuses.createRoleProject
export const selectDeleteRoleProjectStatus = state => state.roleProject.statuses.deleteRoleProject
export const selectUpdateRoleProjectStatus = state => state.roleProject.statuses.updateRoleProject

export const selectRoleProjectMessages = state => state.roleProject.messages

export default roleProjectSlice.reducer
