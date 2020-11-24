import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createRoleProject } from '../roleProjectSlice'

export const AddRoleProjectForm = () => {

    const dispatch = useDispatch()

    const [roleProjectId, setRoleProjectId] = useState('')
    const [roleProject, setRoleProject] = useState('')

    const canSave = [roleProjectId, roleProject].every(Boolean)

    const submitHandler = (e) => {
        e.preventDefault()
        if(canSave){
            dispatch(
                createRoleProject({id: roleProjectId, roleProject: roleProject})
            )
            setRoleProjectId('')
            setRoleProject('')
        }
    }

    const roleProjectIdChangeHandler = (e) => {setRoleProjectId(e.target.value)}
    const roleProjectChangeHandler = (e) => {setRoleProject(e.target.value)}

    return(
        <div>
            <h4>Добавить RoleProject</h4>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="roleProjectId">id roleProject: </label>
                    <input type="text" className="form-control" id="roleProjectId" onChange={roleProjectIdChangeHandler} value={roleProjectId}/>
                </div>
                <div className="form-group">
                    <label htmlFor="roleProject">Наименование roleProject: </label>
                    <input type="text" className="form-control" id="roleProject" onChange={roleProjectChangeHandler} value={roleProject}/>
                </div>
                <button type="submit" className="btn btn-primary">Добавить</button>
            </form>
        </div>
    )
}