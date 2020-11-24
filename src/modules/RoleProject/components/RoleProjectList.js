import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllRoleProjects, selectAllRoleProjects, selectGetAllRoleProjectsError, selectGetAllRoleProjectsStatus } from '../roleProjectSlice'
import { RoleProjectExcerpt } from './RoleProjectExcerpt'

export const RoleProjectList = () => {

    const dispatch = useDispatch()

    const roleProjects = useSelector(selectAllRoleProjects)
    const getAllRoleProjectsStatus = useSelector(selectGetAllRoleProjectsStatus)

    useEffect(() => {
        if(getAllRoleProjectsStatus === 'idle'){
            dispatch(getAllRoleProjects())
        }
    }, [getAllRoleProjectsStatus, dispatch])

    let content = ''
    let roleProjectContent = ''
    if(getAllRoleProjectsStatus === 'loading'){
        content = <div>loading...</div>
    } else if (getAllRoleProjectsStatus === 'succeeded'){
        roleProjectContent = roleProjects.map(roleProject => {
            return (
                <RoleProjectExcerpt key={roleProject.id} roleProject={roleProject}/>
            )
        })

        content = 
        <table className="table table-sm">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">roleProject</th>
                    <th scope="col">Управление</th>
                </tr>
            </thead>
            <tbody>
                {roleProjectContent}
            </tbody>
        </table>
    }

    return(
        <div>
            <h4>RoleProjects:</h4>
            {content}
        </div>
    )
}