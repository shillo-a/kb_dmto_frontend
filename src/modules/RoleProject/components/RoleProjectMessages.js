import React from 'react'
import { useSelector } from 'react-redux'

import { selectRoleProjectMessages } from '../roleProjectSlice'



export const RoleProjectMessages = () => {

    const errors = useSelector(selectRoleProjectMessages)
    .filter(function (element) {
        return element != null;
    });

    let content = ''
    if(errors.length>0){
        content = errors.map(error => {
            return(
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{error}</strong> 
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            ) 
        })
    }

    return(
        <div>
           {content}
        </div>
    )
}
