import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from '../authorizationSlice'

export const LogoutButton = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const loginStatus = useSelector(state => state.auth.login.status)

    useEffect(() => {
        if(loginStatus === 'idle'){
            history.push('/')
        } else if(loginStatus === 'failed'){}
    }, [loginStatus])

    const clickHandler = (e) => {
        dispatch(logout())
    }

    return(
            <button type="button" className="dropdown-item" onClick={clickHandler}>Выйти</button>
    )
}