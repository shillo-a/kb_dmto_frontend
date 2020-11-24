import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { HomeNavbar } from './HomeNavbar'

export const HomePage = () => {

    const history = useHistory()

    const loginStatus = useSelector(state => state.auth.login.status)
    const currentUserName = useSelector(state => state.auth.login.currentUser.username)

    useEffect(() => {
        if(loginStatus === 'succeeded'){
            history.push(`/account/${currentUserName}`)
        } else if(loginStatus === 'failed'){}
    }, [loginStatus])

    return(
        <React.Fragment>
            <HomeNavbar />
            <div className='container'>

            <div className='row'>
                <h3 className=''>HomePage</h3>
            </div>

            <div className='row'>
                <h6 className=''>Info ... </h6>
            </div>

            </div>
        </React.Fragment>
        
    )
}