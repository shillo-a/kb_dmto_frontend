import React from 'react'
import { DeleteRoleProjectButton } from './DeleteRoleProjectButton'
import { EditRoleProjectButton } from './EditRoleProjectButton'

export const RoleProjectExcerpt = ({roleProject}) => {
    return(
        <React.Fragment>
        <tr>
            <td>{roleProject.id}</td>
            <td>{roleProject.roleProject}</td>
            <td>
                <EditRoleProjectButton roleProjectId={roleProject.id}/>
                <DeleteRoleProjectButton roleProjectId={roleProject.id}/>
            </td>
        </tr>
        </React.Fragment>

    )
}