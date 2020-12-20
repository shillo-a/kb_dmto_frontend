import React, { useEffect, useState } from 'react'
import { Card, Container, Spinner } from 'react-bootstrap'
import CommentService from '../../services/apis/comment-service'

import Comment from './Comment'

const AllArticleComments = ({ articleId }) => {

    const [comments, setComments] = useState('')

    // GAC - get all comments
    const [statusGAC, setStatusGAC] = useState('idle')
    const getAllComments = (articleId) => {
        setStatusGAC('loading')
        CommentService.getAllComments(articleId)
            .then(response => {
                console.log(response.data)
                setComments(response.data)
                setStatusGAC('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGAC('failed')
            })
    }

    useEffect(()=>{
        getAllComments(articleId)
    }, [articleId])

    var content = ''
    if(statusGAC === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(statusGAC === 'succedded' && comments){
        content = comments.map(comment => {
            return(
                <Comment key={comment.id} comment={comment}/>
            )
        })
    } else if(statusGAC === 'succedded' && !comments){
        content = <div>Комментарии отсутствуют</div>
    }

    return (
        <Container>
            {content}
        </Container>
    )
}

export default AllArticleComments
