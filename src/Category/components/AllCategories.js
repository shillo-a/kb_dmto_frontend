import React, { useEffect, useState } from 'react'
import { Row , Spinner } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import Category from './Category';

const AllCategories = () => {

    const [categories, setCategories] = useState('')

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
        <Row>
            {content}
        </Row> 
    )
}

export default AllCategories;
