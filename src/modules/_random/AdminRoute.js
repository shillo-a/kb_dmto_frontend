import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({permissions, component: Component, ...rest}) => {
    console.log(permissions.isAuthenticated, permissions.isAdministrator)
    return (
        <Route {...rest} render={(props) => permissions.isAuthenticated&&permissions.isAdministrator? (<Component {...props}/>) : (<Redirect to='/home'/>)}/>
    )
}

export default AdminRoute
