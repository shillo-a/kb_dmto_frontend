import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import ArticleService from '../../services/apis/article-service'
import MessageSuccess from '../Messages/MessageSuccess'

const DeclineArticleButton = ({ articleId }) => {

    const history = useHistory()

    // CFCTDe - change from consider to decline
    const [statusCFCTDe, setStatusCFCTDe] = useState('idle')
    const changeFromConsiderToDecline = (articleId) => {
        setStatusCFCTDe('loading')
        ArticleService.changeFromConsiderToDecline(articleId)
            .then(response => {
                setShowMS(true)
                setStatusCFCTDe('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCFCTDe('failed')
            })
    }

    const handleChangeStatus = (e) =>{
        changeFromConsiderToDecline(articleId)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья отклонена!'
    const actionSuccess = () => {
        history.push('/profile/moderation')
        window.location.reload()
    }

    return (
        <>
        <Button className="mr-2" size="sm" variant="danger" onClick={handleChangeStatus}>Отклонить</Button>

        <MessageSuccess 
            messageSuccess={messageSuccess}
            showMS={showMS} 
            setShowMS={setShowMS}
            actionSuccess={actionSuccess}
        />

        </>
    )

}

export default DeclineArticleButton
