import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import CategoryService from '../../Category/services/CategoryService'

const ArticleHeaderForm = ({ changeTitleHandler, changeCategoryHandler }) => {

    const [categories, setCategories] = useState('')

    //GAC - get all categories
    const [statusGAC, setStatusGAC] = useState('idle')
    const getAllCategories = () => {
        setStatusGAC('loading')
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data)
                setStatusGAC('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGAC('failed')
            })
    }

    useEffect(()=>{
        if(!categories){
            getAllCategories()
        } else {return}    
    }, [categories])

    var options = ''
    if (!categories){
        return (<option></option>)
    } else { options = categories.map((category)=>{
            return(<option key={category.id} data-key={category.id}>{category.category}</option>)
        })
    }

    return (
        <Form>
            <Form.Group controlId="articleHeader">
                <Form.Label>Название статьи:</Form.Label>
                <Form.Control type="text" placeholder="Укажите название статьи" onChange={changeTitleHandler}/>
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>Тип статьи:</Form.Label>
                <Form.Control as="select" onChange={changeCategoryHandler} defaultValue={'default'}>
                    <option value="default" disabled >Выберите тип статьи</option>
                    {options}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="useTemplate">
                <Form.Check type="checkbox" label="Создать разделы из шаблона"/>
            </Form.Group>
        </Form>     
    )
}

export default ArticleHeaderForm
