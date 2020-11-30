import React, { useEffect, useState } from 'react'
import ArticleService from '../services/ArticleService'

const PublishedArcticle = ({ match }) => {

    const { arcticleId } = match.params
    const [publishedArcticle, setPublishedArcticle] = useState('')
    const [status, setStatus] = useState('idle')

    const getPublishedArcticle = (arcticleId) => {
        setStatus('loading')
        ArticleService.getPublishedArcticle(arcticleId)
            .then(response => {
                setPublishedArcticle(response.data)
                setStatus('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatus('failed')
            })
    }

    useEffect(()=>{
        getPublishedArcticle(arcticleId)
    }, [arcticleId])

    return (
        <div>
            {console.log(publishedArcticle)}
        </div>
    )
}

export default PublishedArcticle;