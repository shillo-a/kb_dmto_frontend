import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PermissionsRoute = ({ component: Component, permissions, perfor, ...restProps }) => {
    console.log(permissions, perfor)

    var approved = false

    if(perfor="ROLE_USER" && permissions.isAuthenticated){
        approved = true} else 
    if(perfor="ROLE_MODERATOR" && permissions.isModerator){
        approved = true} else 
    if(perfor="ROLE_OWNER" && permissions.isAdministrator){
        approved = true}

        console.log(approved)
    return (
        <Route {...restProps} 
            render={(props) => {
                if(permissions.isAuthenticated){
                    if(approved){
                        return <Component {...props}/>
                    } else {
                        return <Redirect to='/home'/>
                    }
                } else {
                    return <Redirect to='/login'/>
                }
            }} 
        />
    )

}

export default PermissionsRoute
