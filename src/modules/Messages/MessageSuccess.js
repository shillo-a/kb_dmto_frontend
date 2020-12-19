import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import './styles/messages.css'

const Message = ({ messageSuccess, showMS, setShowMS, actionSuccess}) => {

    const handleClose = () => {
        setShowMS(false)
        actionSuccess()
    }

    return (
        <Modal show={showMS} onHide={handleClose} backdrop="static" centered className="text-center">
            <Modal.Header closeButton className="pt-1 pb-1">
            </Modal.Header>
            <Modal.Body>{messageSuccess}</Modal.Body>
            <Modal.Body className="pt-1">
                <Button variant="primary" onClick={handleClose}>ОК</Button>
            </Modal.Body>
        </Modal>
        
    )
}

export default Message
