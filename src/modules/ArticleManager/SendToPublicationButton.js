import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import ArticleService from '../../services/apis/article-service'
import MessageSuccess from '../Messages/MessageSuccess'

const SendToPublicationButton = ({ articleId }) => {

    // CFDTC - change from draft to consider
    const [statusCFDTC, setStatusCFDTC] = useState('idle')
    const changeFromDraftToConsider = (articleId) => {
        setStatusCFDTC('loading')
        ArticleService.changeFromDraftToConsider(articleId)
            .then(response => {
                setShowMS(true)
                setStatusCFDTC('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCFDTC('failed')
            })
    }

    const handleChangeStatus = (e) =>{
        changeFromDraftToConsider(articleId)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья отправлена на проверку модератору!'
    const actionSuccess = () => {
        window.location.reload()
    }

    return (
        <>
        <Button className="mr-2" size="sm" variant="success" onClick={handleChangeStatus}>Отправить на проверку</Button>

        <MessageSuccess 
            messageSuccess={messageSuccess}
            showMS={showMS} 
            setShowMS={setShowMS}
            actionSuccess={actionSuccess}
        />

        </>
    )

}

export default SendToPublicationButton
