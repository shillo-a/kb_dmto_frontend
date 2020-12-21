import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { Button, Container, Jumbotron, Tab, Tabs } from 'react-bootstrap';

import SectionTemplateService from '../../services/apis/section-template-service'
import ArticleService from '../../services/apis/article-service';
import TransformService from '../../services/transforms/section-template-transform'
import ArticleTransform from '../../services/transforms/article-transform';

import ArticleHeaderForm from './ArticleHeaderForm';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ArticleSectionsForm from './ArticleSectionsForm'
import SaveArticleDraftButton from './SaveArticleDraftButton';
import CancelButton from './CancelButton';


const ArticleMaster = ({ match }) => {

    const {publishedArticleId, draftArticleId} = match.params

    const [article, setArticle] = useState({
        articleId: '',
        title: '',
        categoryId: '',
        sections: [{
            head: '',
            body: null
        }],
        article_base_id: 0
    })
    
    const [templateSections, setTemplateSections] = useState([{
        head: '',
        body: null
    }])

    const [keyTab, setKeyTab] = useState('articleHeader')

    const [dummyObesrver, setDummyObesrver] = useState('')
    
    const [baseArticle, setBaseArticle] = useState('')

    // GA - get article
    const [statusGA, setStatusGA] = useState('idle')
    const getBaseArticle = (articleId) => {
        setStatusGA('loading')
        ArticleService.getArticle(articleId)
            .then(response => {
                setBaseArticle(
                    // НЕОБХОДИМО ТРАНСФОРМИРОВАТЬ ДАННЫЕ !!!
                    ArticleTransform.convertFromRawArticle(response.data)
                )
                setStatusGA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGA('failed')
            })
    }

    const [saveType, setSaveType] = useState({type: '', based: false, description: ''})
    useEffect(()=>{
        //для опубликованных
        if(publishedArticleId){
            //загружаем инфо по статье в "base article"
            getBaseArticle(publishedArticleId)
            setSaveType({type: 'save', based: true, description: 'Создание новой версии статьи'})
        //для дравтоф
        } else if (draftArticleId){
            getBaseArticle(draftArticleId)
            setSaveType({type: 'update', based: false, description: 'Редактирование статьи'})
        //для всех остальных
        } else {
            setSaveType({type: 'save', based: false, description: 'Создание новой статьи'})
        }
    }, [publishedArticleId, draftArticleId])

    //Если создаем статью на оснвое опубликованной или редактируем свой draft
    useEffect(()=>{
        if(baseArticle && publishedArticleId){
            setArticle(prevState => {
                return {...prevState, title: baseArticle.title, categoryId: baseArticle.categoryId, sections: baseArticle.sections}
            })
        } else if (baseArticle && draftArticleId){
            setArticle(baseArticle)
        }
        // для обновление DraftEditor
        setDummyObesrver(Math.random())
    }, [baseArticle])


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
        setDummyObesrver(Math.random())
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

        // Выбросили draggable за зону droppable
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
        setDummyObesrver(Math.random())
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <h3>Мастер статей</h3>
                <span>{saveType.description}</span>
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
                            title={article.title}
                            categoryId={article.categoryId}
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
                    <Button className="mr-2" onClick={() => setKeyTab('preview')}>Продолжить</Button>
                    <Button className="mr-2" onClick={addSectionHandler}>Добавить раздел</Button>
                    <Button className="mr-2" onClick={createSectionsFromTemplateHandler}>Создать разделы из шаблона</Button>
                </Tab>

                <Tab eventKey='preview' title='3. Предпросмотр'>
                    <ArticlePreview 
                        article={article}
                        categoryId={article.categoryId}
                    />
                    <Button onClick={() => setKeyTab('save')}>Продолжить</Button>
                </Tab>

                <Tab eventKey='save' title='4. Сохранение'>
                    <Container className="mt-3">
                        <SaveArticleDraftButton
                            article={article}
                            articleId={article.articleId}
                            addArticleId={addArticleId}
                            saveType={saveType}
                        />
                        <CancelButton/>
                    </Container>
                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default ArticleMaster;