import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import ArticleService from '../../services/apis/article-service'
import SectionService from '../../services/apis/section-service'
import TransformService from '../../services/transforms/section-transform'

const SaveArticleDraftButton = ({ article, articleId, addArticleId }) => {

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

    //создаем статью только если нет articleId
    const saveArticleHandler = (event) =>{
        if(!articleId){
            saveArticle(article)
        }   
    }

    //если появился articleId сохраняем
    useEffect(()=>{
        if(articleId){
            addSectionsToArticle(
                articleId, 
                //Преобразуем текст c JSON в string JSON
                TransformService.convertSectionBodyToJsonString(article.sections)
            )
        }
    }, [articleId])

    return (
        <React.Fragment>
            {/* {console.log(JSON.stringify(article.sections[0].body))}
            {console.log(article.sections[0].body)} */}
            <Button onClick={saveArticleHandler}>Сохранить</Button>
        </React.Fragment>
    )
}

export default SaveArticleDraftButton