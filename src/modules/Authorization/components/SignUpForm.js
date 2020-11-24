import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { register } from '../authorizationSlice'

export const SignUpForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const registerStatus = useSelector(state => state.auth.register.status)
    const loginStatus = useSelector(state => state.auth.login.status)
    const currentUserName = useSelector(state => state.auth.login.currentUser.username)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        if(registerStatus === 'succeeded'){
            history.push('/signin')
        } else if(registerStatus === 'failed'){}
    }, [registerStatus])

    useEffect(() => {
        if(loginStatus === 'succeeded'){
            history.push(`/account/${currentUserName}`)
        } else if(loginStatus === 'failed'){}
    }, [loginStatus])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register({username, email, password}))
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className="container registration-form">
            <h3>Sign Up Form:</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email address: </label>
                    <input type="email" className="form-control" id="email" onChange={emailChangeHandler} value={email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" className="form-control" id="username" onChange={usernameChangeHandler} value={username}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control" id="password" onChange={passwordChangeHandler} value={password}/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}