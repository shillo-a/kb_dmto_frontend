import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import ArticleService from '../../services/apis/article-service'
import MessageSuccess from '../Messages/MessageSuccess'

const PublishArticleButton = ({ articleId }) => {

    const history = useHistory()

    // CFCTP - change from consider to published
    const [statusCFCTP, setStatusCFCTP] = useState('idle')
    const changeFromConsiderToPublished = (articleId) => {
        setStatusCFCTP('loading')
        ArticleService.changeFromConsiderToPublished(articleId)
            .then(response => {
                setShowMS(true)
                setStatusCFCTP('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCFCTP('failed')
            })
    }

    const handleChangeStatus = (e) =>{
        changeFromConsiderToPublished(articleId)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья опубликована'
    const actionSuccess = () => {
        history.push(`/article/${articleId}`)
        window.location.reload()
    }

    return (
        <>

        <Button className="mr-2" size="sm" variant="success" onClick={handleChangeStatus}>Опубликовать</Button>

        <MessageSuccess 
            messageSuccess={messageSuccess}
            showMS={showMS} 
            setShowMS={setShowMS}
            actionSuccess={actionSuccess}
        />

        </>
    )
}

export default PublishArticleButton
