import React from 'react'

const ArticleStatus = ({ statusArticle }) => {
    var status = <span></span>
    if(statusArticle.id === 'draft'){
        status = <span className="p-1 bg-secondary text-white">{statusArticle.statusArticle}</span>
    } else 
    if(statusArticle.id === 'consider'){
        status = <span className="p-1 bg-warning text-dark">{statusArticle.statusArticle}</span>
    } else
    if(statusArticle.id === 'decline'){
        status = <span className="p-1 bg-danger text-white">{statusArticle.statusArticle}</span>
    } 

    return (
        <React.Fragment>
            {status}
        </React.Fragment>
    )
}

export default ArticleStatus
