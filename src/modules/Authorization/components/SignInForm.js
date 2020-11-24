import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { login } from '../authorizationSlice'

export const SignInForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const loginStatus = useSelector(state => state.auth.login.status)
    const currentUserName = useSelector(state => state.auth.login.currentUser.username)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /* после успешного входа, перебрасывание на личную страницу пользователя */
    
    useEffect(() => {
        if(loginStatus === 'succeeded'){
            history.push(`/account/${currentUserName}`)
        } else if(loginStatus === 'failed'){}
    }, [loginStatus])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login({username, password}))
    }

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    
    return(
        <div className="container registration-form">
        <h3>Sign In Form:</h3>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" className="form-control" id="username" onChange={usernameChangeHandler} value={username}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" className="form-control" id="password" onChange={passwordChangeHandler} value={password}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    </div>
    )
}