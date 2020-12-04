import React, { useState } from 'react'
import { Button, Container, Jumbotron, Tab, Tabs } from 'react-bootstrap';

import ArticleHeaderForm from './ArticleHeaderForm';
import ArticleSectionsForm from './ArticleSectionsForm'

const ArticleMaster = () => {

    const [keyTab, setKeyTab] = useState('articleHeader')

    const [article, setArticle] = useState({
        title: null,
        caregoryId: null,
        sections: [{
            head: '',
            body: null
        }],
    })

    const emptySection = {
        head: '',
        body: null
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
            return {...prevState, caregoryId: categoryId}
        }) 
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

    return (
        <React.Fragment>
            <Jumbotron>
                <h3>Мастер статей</h3>
            </Jumbotron>
            <Tabs id='articleMaster' activeKey={keyTab} onSelect={key => setKeyTab(key)}>

                <Tab eventKey='instruction' title='Инструкция'>
                    Инструкция по созданию статьи
                </Tab>

                <Tab eventKey='articleHeader' title='1. Заголовок и категория'>
                    <Container>
                        <ArticleHeaderForm 
                            changeTitleHandler={changeTitleHandler} 
                            changeCategoryHandler={changeCategoryHandler}

                            />
                        <Button onClick={() => setKeyTab('sections')}>Продолжить</Button>
                    </Container>
                </Tab>

                <Tab eventKey='sections' title='2. Разделы'>
                    <Container>
                        <ArticleSectionsForm 
                            sections={article.sections} 
                            addSectionHandler={addSectionHandler}
                            deleteSectionHandler = {deleteSectionHandler}
                            changeSectionHeadHandler = {changeSectionHeadHandler}  
                            changeSectionBodyHandler = {changeSectionBodyHandler}
                            />
                        <Button onClick={() => setKeyTab('save')}>Продолжить</Button>
                    </Container>
                </Tab>

                <Tab eventKey='save' title='3. Сохранение'>
                    <div>Предварительный просмотр</div>
                    <div>Сохрнить как черновик</div>
                    <div>Опубликовать</div>
                    <Button onClick={()=>{console.log(article)}}>test</Button>
                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default ArticleMaster;