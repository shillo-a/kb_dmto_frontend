import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getRoleProject, selectRoleProjectById, selectGetRoleProjectStatus, updateRoleProject } from '../roleProjectSlice'

export const EditRoleProjectPage = ({ match }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { roleProjectId } = match.params

    const getRoleProjectStatus = useSelector(selectGetRoleProjectStatus)
    
    useEffect(()=>{
        dispatch(getRoleProject(roleProjectId))
    }, [])

    const [role_project_id, setRoleProjectId] = useState('')
    const [role_project, setRoleProject] = useState('')
    
    const roleProject = useSelector(state => selectRoleProjectById(state, roleProjectId))

    useEffect(()=>{
        if(getRoleProjectStatus === 'succeeded'){
            setRoleProjectId(roleProject.id)
            setRoleProject(roleProject.roleProject)
        }
    }, [getRoleProjectStatus])

    const submitHandler = (e) => {
        e.preventDefault()
        if (role_project_id && role_project){
            dispatch(updateRoleProject({currentId:roleProjectId, id:role_project_id, roleProject:role_project}))
            history.push('/admin/roleprojects/')
        }
    }

    const roleProjectIdChangeHandler = (e) => {setRoleProjectId(e.target.value)}
    const roleProjectChangeHandler = (e) => {setRoleProject(e.target.value)}

    return(
        <div className="container">
            <h1>Edit Role Project Page</h1>
            <h4>Изменить RoleProject</h4>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="roleProjectId">id roleProject: </label>
                    <input type="text" className="form-control" id="roleProjectId" onChange={roleProjectIdChangeHandler} value={role_project_id} disabled="disabled"/>
                </div>
                <div className="form-group">
                    <label htmlFor="roleProject">Наименование roleProject: </label>
                    <input type="text" className="form-control" id="roleProject" onChange={roleProjectChangeHandler} value={role_project}/>
                </div>
                <button type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    )
}