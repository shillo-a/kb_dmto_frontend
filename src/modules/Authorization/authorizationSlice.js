import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import AuthService from './authorizationApi';
import DataService from '../../modules/UserRoleProject/authorizationApi';

const initialState = {
    register: {
        status: 'idle',
        error: null,
        registeredUser: {}
    },
    login: {
        status: 'idle',
        error: null,
        currentUser: {}
    }
}

export const register = createAsyncThunk('auth/register', async ({username, email, password}) => {
    const response = await AuthService.register(username, email, password)
    return {
        username:username, 
        password:password
    }
})

export const login = createAsyncThunk('auth/login', async ({username, password}) => {
    const response = await AuthService.login(username, password)
    return response 
})

export const checkLogin = createAsyncThunk('auth/checkLogin', async() => {
    const response = await DataService.getUserInfo()
    return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetRegisterStatus(state){
            state.register.status = 'idle'
        },
        resetLoginStatus(state){
            state.login.status = 'idle'
        },
        logout(state){
            state.login.status = 'idle';
            state.login.currentUser = {};
            AuthService.logout();
        }

    },
    extraReducers: {
        [register.pending]: (state) => {
            state.register.status = 'loading'
        },
        [register.fulfilled]: (state, action) => {
            state.register.status = 'succeeded'
            state.register.registeredUser = action.payload
        },
        [register.rejected]: (state, action) => {
            state.register.status = 'failed'
            state.register.error = action.error.message
        },

        [login.pending]: (state) => {
            state.login.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.login.status = 'succeeded'
            state.login.currentUser = action.payload
        },
        [login.rejected]: (state, action) => {
            state.login.status = 'failed'
            state.login.error = action.error.message
        },

        [checkLogin.pending] : (state) => {
            state.login.status = 'loading'
        },
        [checkLogin.fulfilled]: (state, action) => {
            state.login.status = 'succeeded'
            state.login.currentUser = action.payload
        },
        [checkLogin.rejected]: (state, action) => {
            state.login.status = 'failed'
            state.login.error = action.error.message
        }

    }
})

export const { resetRegisterStatus, resetLoginStatus, logout } = authSlice.actions
export default authSlice.reducer