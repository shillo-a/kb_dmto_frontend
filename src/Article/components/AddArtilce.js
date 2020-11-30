import React from 'react'
import AddSection from '../../Section/components/AddSection'

const AddArtilce = () => {
    return (
        <div>
        <input placeholder='Название статьи'></input>
        <br/>
        <br/>
        <AddSection/>
        <br/>
        <br/>
        <button className='btn btn-primary'>Сохранить статью</button>
        </div>
    )
}

export default AddArtilce;