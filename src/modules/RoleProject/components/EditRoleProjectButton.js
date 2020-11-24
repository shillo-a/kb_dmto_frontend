import React from 'react'
import { Link } from 'react-router-dom'

export const EditRoleProjectButton = ({roleProjectId}) => {

    return(
        <Link to={`/admin/roleprojects/edit/${roleProjectId}`} className="btn btn-warning">
            Изменить
        </Link>
    )
}