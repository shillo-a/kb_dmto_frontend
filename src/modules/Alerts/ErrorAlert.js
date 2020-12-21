import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorAlert = ({ errorMessage }) => {
    return (
        <>
        {errorMessage?
        <Alert variant="danger">Ошибка: {errorMessage}</Alert>
        : <></>
        }
        </>
    )
}

export default ErrorAlert
