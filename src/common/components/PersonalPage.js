import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProjectsInfo } from '../../modules/Project/components/ProjectsInfo'
import { createUserProject } from '../../modules/Project/projectSlice'

export const PersonalPage = ({ match }) => {

    const dispatch = useDispatch()

    const { username } = match.params
    const currentUser = useSelector(state => state.auth.login.currentUser)

    // if(currentUser.username!==username){
    // }

    // const clickHandler = (e) => {
    //     dispatch(createUserProject('test'))
    // }

    return(
        <div className="container">
            <h1>PersonalPage of {username}</h1>
            <br></br>
            <p>asdasd</p>
            <p>asdasd</p>
            <p>asdasd</p>
            <p>asdasd</p>
            <p>asdasd</p>
            <p>asdasd</p>
        </div>
    )
    
}