import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import ArticleService from '../../services/apis/article-service'
import MessageSuccess from '../Messages/MessageSuccess'

const CallFromPublicationButton = ({ articleId }) => {

    // CFCTD - change From Consider To Draft
    const [statusCFCTD, setStatusCFCTD] = useState('idle')
    const changeFromConsiderToDraft = (articleId) => {
        setStatusCFCTD('loading')
        ArticleService.changeFromConsiderToDraft(articleId)
            .then(response => {
                setShowMS(true)
                setStatusCFCTD('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCFCTD('failed')
            })
    }

    const handleChangeStatus = (e) =>{
        changeFromConsiderToDraft(articleId)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья отозвана с публикации!'
    const actionSuccess = () => {
        window.location.reload()
    }

    return (
        <>
        <Button className="mr-2" size="sm" variant="warning" onClick={handleChangeStatus}> Отозвать с публикации</Button>

        <MessageSuccess 
            messageSuccess={messageSuccess}
            showMS={showMS} 
            setShowMS={setShowMS}
            actionSuccess={actionSuccess}
        />
        </>
    )

}

export default CallFromPublicationButton
