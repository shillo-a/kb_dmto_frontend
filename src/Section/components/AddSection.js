import React, { useEffect, useState } from 'react'
import DraftEditor from './DraftEditor'
import SectionService from '../services/SectionService'

const AddSection = () => {

    const [section, setSection] = useState({
        head: 'Блок 2',
        body: '',
        orderNum: 4,
        article: {id: 24},
        userTemp: 'owner'
    })

    // head: 'test',
    //     body: JSON.stringify({test:'test'}),
    //     orderNum: 1,
    //     article: {id: 24},
    //     userTemp: 'owner'

    // useEffect(()=>{
    //     SectionService.createSection(section)
    // }, [])

    const createBodyHandler = (body) => {
        setSection(
            prevState => {
                return {...prevState, body: body}
            }
        )
        console.log(section)
    }

    const saveSectionHandler = () => {
        SectionService.createSection(section)
    }

    return (
        <div>
        <input placeholder="Название раздела"></input>
        <DraftEditor onCreateBody={createBodyHandler}/>
        <button className='btn btn-primary' onClick={saveSectionHandler}>Сохранить раздел</button>
        </div>
    )
}

export default AddSection