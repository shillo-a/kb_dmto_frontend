import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import CategoryService from '../../services/apis/category-service'

const ArticleHeaderForm = ({ title, categoryId, changeTitleHandler, changeCategoryHandler }) => {

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
            return(<option key={category.id} data-key={category.id} value={category.id}>{category.category}</option>)
        })
    }

    return (
        <Form>
            <Form.Group controlId="articleHeader">
                <Form.Label>Название статьи:</Form.Label>
                <Form.Control type="text" placeholder="Укажите название статьи" onChange={changeTitleHandler} value={title ? title : ''}/>
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>Тип статьи:</Form.Label>
                <Form.Control as="select" onChange={changeCategoryHandler} value={categoryId ? categoryId: 'default'}>
                    <option value="default" disabled >Выберите тип статьи</option>
                    {options}
                </Form.Control>
            </Form.Group>
        </Form>     
    )
}

export default ArticleHeaderForm
