import React from 'react'

export const ProjectExcerpt = ({project}) => {
    return(
        <div className="card">
        <h5 className="card-header">{project.project}</h5>
            <div className="card-body">
                <h5 className="card-title">....</h5>
                <p className="card-text">....</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}