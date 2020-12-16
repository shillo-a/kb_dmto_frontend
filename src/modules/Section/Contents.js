import React from 'react'
import { HashLink } from 'react-router-hash-link';

const Contents = ({ sections }) => {

    var content = ''
    if(sections){
        content = sections.map((section, index) => {
            return (
                
                <HashLink 
                    key={index} 
                    className="text-dark"
                    smooth to={'#'+section.head}>
                    <li>{section.head}</li>
                </HashLink>
            )
        })
    }
    return (
        <React.Fragment>
            <h5>Оглавление</h5>
            <ol>
                {content}
            </ol>
        </React.Fragment>
        
    )
}

export default Contents
