import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons';

const DeleteSectionButton = ({ deleteSectionHandler, index }) => {
    return (
        <div className="text-right">
            <Button variant="link" onClick={() => {deleteSectionHandler(index)}}><Trash size={25} color='grey'/></Button>
        </div>
    )
}

export default DeleteSectionButton
