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

const ArticleManager = ({ match, permissions }) => {

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
            {article ? <>
            <Container className="p-3 mb-3 sticky-top bg-light text-dark shadow-sm">
                
                {console.log(article)}
                {article.status.id==='draft'||article.status.id==='decline'?
                    <>
                    <Button className="mr-2" size="sm" variant="success">Отправить на проверку</Button>
                    <Button className="mr-2" size="sm" onClick={transitionRedactionHandler}>Редактировать</Button>
                    <Button className="mr-2" size="sm" variant="danger">Удалить</Button>
                    </>
                    :
                    <></>
                }
                {article.status.id==='consider'?
                    <>
                    <Button className="mr-2" size="sm" variant="warning">Отозвать с публикации</Button>
                    <Button className="mr-2" size="sm" variant="danger">Отклонить</Button>
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
                    {console.log(article)}
                    {/* ИНФОРМАЦИИ ПОКА НЕТ В РЕСПОНСЕ */}
                    <ArticleStatus statusArticle={article.status}/>
                </Jumbotron>
                <Container>
                    <Contents sections={article.sections}/>
                    <ArticleSections sections={article.sections}/>
                    <CommentManager />
            </Container>
            </>: <></>}
        </React.Fragment>
    )
}

export default ArticleManager
