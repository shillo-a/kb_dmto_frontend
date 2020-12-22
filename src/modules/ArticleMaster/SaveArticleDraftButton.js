import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import ArticleService from '../../services/apis/article-service'
import SectionService from '../../services/apis/section-service'
import TransformService from '../../services/transforms/section-transform'

import MessageSuccess from '../Messages/MessageSuccess'

const SaveArticleDraftButton = ({ article, articleId, addArticleId, saveType}) => {

    const history = useHistory()
    const [saveStatus, setSaveStatus] = useState('')
    //CA - create article (without sections)
    const [statusCA, setStatusCA] = useState('idle')
    const saveArticle = (article) => {
        setStatusCA('loading')
        ArticleService.createArticle(article)
            .then(response => {
                //сохраняем id вновь созданной статьи
                addArticleId(response.data)
                setStatusCA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCA('failed')
            })
    }

    //если статья была успешно создана, то сохраняем к ней секции
    useEffect(()=>{
        if(statusCA === 'succedded'){
            addSectionsToArticle(
                articleId, 
                //Преобразуем текст c JSON в string JSON
                TransformService.convertSectionBodyToJsonString(article.sections)
            )
        }
    }, [statusCA])

    //ASTA - add sections to article
    const [statusASTA, setStatusASTA] = useState('idle')
    const addSectionsToArticle = (articleId, sections) => {
        setStatusASTA('loading')
        SectionService.addSectionsToArticle(articleId, sections)
            .then(response => {
                setStatusASTA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusASTA('failed')
            })
    }

    // CFCTD - change From Decline To Draft
    const [statusCFDeTDr, setStatusCFDeTDr] = useState('idle')
    const changeFromDeclineToDraft = (articleId) => {
        setStatusCFDeTDr('loading')
        ArticleService.changeFromDeclineToDraft(articleId)
            .then(response => {
                setStatusCFDeTDr('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCFDeTDr('failed')
            })
    }

    //ChA - change article (without sections)
    const [statusChA, setStatusChA] = useState('idle')
    const changeArticle = (articleId, article) => {
        setStatusChA('loading')
        ArticleService.changeArticle(articleId, article)
            .then(response => {
                setStatusChA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusChA('failed')
            })
    }

    //DSFA - delete sections from article
    const [statusDSFA, setStatusDSFA] = useState('idle')
    const deleteSectionsArticle = (articleId, callback) => {
        setStatusDSFA('loading')
        SectionService.deleteSectionsArticle(articleId)
            .then(response => {
                callback()
                setStatusDSFA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusDSFA('failed')
            })
    }

    //создаем статью только если saveType==="save"
    const saveArticleHandler = (event) =>{
        if(saveType.type==="save"){
            //выполняем сохранение статьи в БД
            saveArticle(article)
        } else if (saveType.type==="update"){
            //изменяем статус статьи на draft
            changeFromDeclineToDraft(articleId)
            //сохраняем изменения в БД
            ////выполняем update article
            changeArticle(articleId, {title: article.title, category:{ id: article.categoryId}})
            ////удаляем старые секции из статьи
            deleteSectionsArticle(
                articleId,
                ////сохраняем новые секции через каллбак
                () => {addSectionsToArticle(articleId, TransformService.convertSectionBodyToJsonString(article.sections))}
                )
        }
        setShowMS(true)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья сохранена!'
    const actionSuccess = () => {
        history.push(`/article-manager/${articleId}`)
        window.location.reload()
    }

    return (
        <React.Fragment>
            <Button onClick={saveArticleHandler} className="mr-2">Сохранить</Button>

            <MessageSuccess 
            messageSuccess={messageSuccess}
            showMS={showMS} 
            setShowMS={setShowMS}
            actionSuccess={actionSuccess}
        />
        </React.Fragment>
    )
}

export default SaveArticleDraftButton