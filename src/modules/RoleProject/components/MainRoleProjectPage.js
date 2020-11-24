import React, { useEffect } from 'react'
import { AddRoleProjectForm } from './AddRoleProjectForm'
import { RoleProjectList } from './RoleProjectList'
import { RoleProjectMessages } from './RoleProjectMessages'

export const MainRoleProjectPage = () => {

return(
    <div className="container">
        <h1>Role Project Page</h1>  
        <div className="row">
            <div className='col-md-9'>
                <AddRoleProjectForm />
                <RoleProjectList />
            </div>
            <div className='col-md-3'>
                <h4>Сообщения:</h4>
                <RoleProjectMessages/>
            </div>
        </div>
    </div>
)

}