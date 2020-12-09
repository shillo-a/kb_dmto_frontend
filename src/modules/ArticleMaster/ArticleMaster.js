import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { Button, Container, Jumbotron, Tab, Tabs } from 'react-bootstrap';

import SectionTemplateService from '../../services/apis/section-template-service'
import TransformService from '../../services/transforms/section-template-transform'
import ArticleHeaderForm from './ArticleHeaderForm';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ArticleSectionsForm from './ArticleSectionsForm'
import SaveArticleDraftButton from './SaveArticleDraftButton';

const ArticleMaster = () => {

    const [keyTab, setKeyTab] = useState('articleHeader')

    const [dummyObesrver, setDummyObesrver] = useState('')

    const [templateSections, setTemplateSections] = useState([{
        head: '',
        body: null
    }])

    const createSectionsFromTemplateHandler = () => {
        //выгружаем шаблоны разделов
        getTemplateSections(article.categoryId)
    }

    //При изменении шаблонов, подгрузка их в article
    useEffect(()=>{
        setArticle(prevState => {
            return {...prevState, sections: templateSections}
        })
        // для обновление DraftEditor
        setDummyObesrver(
            Math.random()
        )
    }, [templateSections])


    //GTS - get template sections
    const [statusGTS, setStatusGTS] = useState('idle')
    const getTemplateSections = (categoryId) => {
        setStatusGTS('loading')
        SectionTemplateService.getTemplateSections(categoryId)
            .then(response => {
                setTemplateSections(
                    // НЕОБХОДИМО ТРАНСФОРМИРОВАТЬ ДАННЫЕ !!!
                    TransformService.convertFromRawSectionTemplate(response.data)
                )
                setStatusGTS('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGTS('failed')
            })
    }

    const [article, setArticle] = useState({
        articleId: '',
        title: null,
        categoryId: null,
        sections: [{
            head: '',
            body: null
        }],
        article_base_id: 0
    })

    const addArticleId = (articleId) => {
        setArticle(prevState => {
            return {...prevState, articleId: articleId}
        })
    }

    const changeTitleHandler = (event) => {
        setArticle(prevState => {
            return {...prevState, title: event.target.value}
        })
    }

    const changeCategoryHandler = (event) => {
        const selectedIndex = event.target.options.selectedIndex
        const categoryId = event.target.options[selectedIndex].getAttribute('data-key')
        setArticle(prevState => {
            return {...prevState, categoryId: categoryId}
        }) 
    }

    const emptySection = {
        head: '',
        body: null
    }

    const addSectionHandler = () => {
        setArticle(prevState => {
            return {...prevState, sections: [...prevState.sections, emptySection]}
        }) 
    }

    const deleteSectionHandler = (index) => {
        setArticle(prevState => {
            const currSections = prevState.sections
            const removedSection = prevState.sections.splice(index, 1)
            return {...prevState, sections:currSections}
        }) 
    }

    const changeSectionHeadHandler = (event, index) => {
        const updatedSection = article.sections[index]
        updatedSection.head = event.target.value
        setArticle(prevState => {
            const currSections = prevState.sections
            currSections[index] = updatedSection
            return {...prevState, sections:currSections}
        }) 
    }

    const changeSectionBodyHandler = (data, index) => {
        const updatedSection = article.sections[index]
        updatedSection.body = data
        setArticle(prevState => {
            const currSections = prevState.sections
            currSections[index] = updatedSection
            return {...prevState, sections:currSections}
        }) 
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        // Выбросили drggable за зону droppable
        if(!destination){
            return
        }

        //Положение draggable не изменилось
        if(
            destination.draggableId === source.droppableId &&
            destination.index === source.index){
                return
            }
        
        //Положение draggable изменилось
        const newSections = Array.from(article.sections)
        newSections.splice(source.index, 1)
        newSections.splice(destination.index, 0, article.sections[draggableId])
        
        setArticle(prevState => {return {...prevState, sections:newSections}})

        // для обновление DraftEditor
        setDummyObesrver(
            Math.random()
        )
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <h3>Мастер статей</h3>
            </Jumbotron>
            <Tabs id='articleMaster' activeKey={keyTab} onSelect={key => setKeyTab(key)}>

                <Tab eventKey='instruction' title='Инструкция'>
                    <Container className="mt-3">
                        Инструкция по созданию статьи
                    </Container>
                </Tab>

                <Tab eventKey='articleHeader' title='1. Заголовок и категория'>
                    <Container className="mt-3">
                        <ArticleHeaderForm 
                            changeTitleHandler={changeTitleHandler} 
                            changeCategoryHandler={changeCategoryHandler}
                            />
                        <Button onClick={() => setKeyTab('sections')}>Продолжить</Button>
                    </Container>
                </Tab>

                <Tab eventKey='sections' title='2. Разделы'>
                    <DragDropContext
                        onDragEnd = {onDragEnd}
                    >
                    <ArticleSectionsForm 
                        sections={article.sections} 
                        deleteSectionHandler = {deleteSectionHandler}
                        changeSectionHeadHandler = {changeSectionHeadHandler}  
                        changeSectionBodyHandler = {changeSectionBodyHandler}
                        dummyObesrver={dummyObesrver}
                    />
                    </DragDropContext>
                    <Button onClick={() => setKeyTab('preview')}>Продолжить</Button>
                    <Button onClick={addSectionHandler}>Добавить раздел</Button>
                    <Button onClick={createSectionsFromTemplateHandler}>Создать разделы из шаблона</Button>
                </Tab>

                <Tab eventKey='preview' title='3. Предпросмотр'>
                    <ArticlePreview 
                        article={article}
                    />
                    <Button onClick={() => setKeyTab('save')}>Продолжить</Button>
                </Tab>

                <Tab eventKey='save' title='4. Сохранение'>
                    <Container className="mt-3">
                        <SaveArticleDraftButton
                            article={article}
                            articleId={article.articleId}
                            addArticleId={addArticleId}
                        />
                        <Button onClick={()=>{console.log(article)}} disabled>Опубликовать</Button>
                        <Button onClick={()=>{console.log(article)}}>Отменить</Button>
                    </Container>
                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default ArticleMaster;