import React, { useEffect, useState } from 'react'
import { Button, Container, Jumbotron } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link';

import ArticleService from '../../services/apis/article-service'
import TransformService from '../../services/transforms/article-transform'
import ArticleSections from '../ArticleSections/ArticleSections'
import CommentManager from '../CommentManager/CommentManager'
import Contents from '../Section/Contents'
import ArticleStatus from '../Article/ArticleStatus'
import { useHistory } from 'react-router-dom';
import DeleteArticleButton from './DeleteArticleButton';

import SendToPublicationButton from './SendToPublicationButton';
import CallFromPublicationButton from './CallFromPublicationButton';
import DeclineArticleButton from './DeclineArticleButton';

import './styles/articleManager.css'


const ArticleManager = ({ match, permissions, currentUser }) => {

    const { articleId } = match.params
    const [article, setArticle] = useState('')

    // GA - get article
    const [statusGA, setStatusGA] = useState('idle')
    const getArticle = (articleId) => {
        setStatusGA('loading')
        ArticleService.getArticle(articleId)
            .then(response => {
                setArticle(
                    // НЕОБХОДИМО ТРАНСФОРМИРОВАТЬ ДАННЫЕ !!!
                    TransformService.convertFromRawArticle(response.data)
                )
                setStatusGA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGA('failed')
            })
    }

    useEffect(()=>{
        getArticle(articleId)
    }, [articleId])

    const history = useHistory()
    const transitionRedactionHandler = () => {
        history.push(`/article-master/${articleId}`)
    }

    return (
        <React.Fragment>
            {article && article.status.id!=='published' && (currentUser.id===article.user.id || permissions.isModerator) ? 
            <>
            <Container className="p-3 mb-3 sticky-top bg-light text-dark shadow-sm article-manager-nav">
                
                {article.status.id==='draft'?
                    <>
                    <SendToPublicationButton articleId={articleId}/>
                    </>
                    :
                    <></>
                }
                {article.status.id==='draft' || article.status.id==='decline'?
                    <>
                    <Button className="mr-2" size="sm" onClick={transitionRedactionHandler}>Редактировать</Button>
                    <DeleteArticleButton />
                    </>
                    :
                    <></>
                }
                {article.status.id==='consider' && currentUser.id===article.user.id ?
                    <>
                    <CallFromPublicationButton articleId={articleId}/>
                    </>
                    :
                    <></>
                }
                {article.status.id==='consider' && permissions.isModerator?
                    <>
                    <DeclineArticleButton articleId={articleId}/>
                    <Button className="mr-2" size="sm" variant="success">Опубликовать</Button>
                    </>
                    :
                    <></>
                }
                
                <HashLink smooth to={'#comments'}>
                    <Button className="mr-2 text-dark" size="sm" variant="link">К комментариям</Button>
                </HashLink>

            </Container>
                <Jumbotron>
                    <h3>{article.title}</h3>
                    <ArticleStatus statusArticle={article.status}/>
                </Jumbotron>
                <Container>
                    <Contents sections={article.sections}/>
                    <ArticleSections sections={article.sections}/>
                    <CommentManager articleId={articleId} currentUser={currentUser}/>
            </Container>
            </>: <></>}
        </React.Fragment>
    )
}

export default ArticleManager
