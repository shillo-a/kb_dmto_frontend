import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import './styles/messages.css'

const Message = ({ messageConfirm, showMC, setShowMC, actionConfirmDescription, actionConfirm }) => {

    const handleClose = () => setShowMC(false)
    
    return (
        <Modal show={showMC} onHide={handleClose} backdrop="static" centered className="text-center">
            <Modal.Header closeButton className="pt-1 pb-1">
            </Modal.Header>
            <Modal.Body>{messageConfirm}</Modal.Body>
            <Modal.Body className="pt-1">
                <Button className="mr-2" variant="secondary" onClick={actionConfirm}>{actionConfirmDescription}</Button>
                <Button variant="primary" onClick={handleClose}>Отмена</Button>
            </Modal.Body>
        </Modal>
        
    )
}

export default Message
