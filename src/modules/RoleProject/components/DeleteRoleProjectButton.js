import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteRoleProject } from '../roleProjectSlice'

export const DeleteRoleProjectButton = ({roleProjectId}) => {
    const dispatch = useDispatch()

    const clickHandler = (e) => {
        dispatch(deleteRoleProject(roleProjectId))
    }
    return(
        <button className="btn btn-danger" onClick={clickHandler}>Удалить</button>
    )
}