import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const UserRoute = ({permissions, component: Component, ...rest}) => {
    console.log(permissions.isAuthenticated)
    return (
        <Route {...rest} render={(props) => permissions.isAuthenticated? (<Component {...props}/>) : (<Redirect to='/login'/>)}/>
    )
}

export default UserRoute
