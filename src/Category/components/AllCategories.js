import React, { useEffect, useState } from 'react'
import { CardGroup, Row , Spinner } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import Category from './Category';

const AllCategories = () => {

    const [categories, setCategories] = useState('')

    const getAllCategories = () => {
        CategoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }

    useEffect(()=>{
        if(!categories){
            getAllCategories()
        } else {return}    
    }, [categories])

    var content = ''
    if(!categories){
        content = <Spinner animation="border" variant="primary" />
    } else {
        content = categories.map(category => {
            return(
                <Category key={category.id} category={category}/>
            )
        })
    }

    return (
    <CardGroup>
        <Row>
            {content}
        </Row>
    </CardGroup>
    )
}

export default AllCategories;
