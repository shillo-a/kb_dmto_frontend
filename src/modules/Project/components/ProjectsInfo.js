import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserProjects, selectAllProjects } from '../projectSlice'
import { ProjectExcerpt } from './ProjectExcerpt'

export const ProjectsInfo = () => {

    const dispatch = useDispatch()

    const projects = useSelector(selectAllProjects)
    const projectsStatus = useSelector(state => state.projects.status)
    const projectsError = useSelector(state => state.projects.error)

    useEffect(()=>{
        if(projectsStatus === 'idle'){
            dispatch(getUserProjects())
        }
    }, [projectsStatus, dispatch])

    let content = ''

    if (projectsStatus === 'loading'){
        content = <div>loading...</div>
    } else if (projectsStatus === 'succeeded'){
        content = projects.map(project => {
            return <ProjectExcerpt key={project.id} project={project}/>
        })
    } else if (projectsStatus === 'failed'){
        content = <div>{projectsError}</div>
    }

    return(
        <div className="col">
            { content }
        </div>
    )
}