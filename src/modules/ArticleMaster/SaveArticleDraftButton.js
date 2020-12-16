import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import ArticleService from '../../services/apis/article-service'
import SectionService from '../../services/apis/section-service'
import TransformService from '../../services/transforms/section-transform'

const SaveArticleDraftButton = ({ article, articleId, addArticleId, saveType}) => {

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

    //создаем статью только если saveType==="save"
    const saveArticleHandler = (event) =>{
        if(saveType.type==="save"){
            saveArticle(article)
        } else if (saveType.type==="update"){
            console.log('Обновление статьи')
        }
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

    return (
        <React.Fragment>
            <Button onClick={saveArticleHandler} className="mr-2">Сохранить</Button>
        </React.Fragment>
    )
}

export default SaveArticleDraftButton