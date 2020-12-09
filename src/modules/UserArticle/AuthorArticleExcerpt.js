import React from 'react'
import { Button } from 'react-bootstrap'

const AuthorArticleExcerpt = ({ authorArticle }) => {

    var availableButtons = <td align="center"></td>
    if(authorArticle.article.statusArticle.id === 'draft'){
        availableButtons = (
            <React.Fragment>
                <Button className="mr-2" size="sm">Редактировать</Button>
                <Button className="mr-2" size="sm" variant="success">Опубликовать</Button>
                <Button size="sm" variant="danger">Удалить</Button>
            </React.Fragment>
        )
    } else if (authorArticle.article.statusArticle.id === 'consider')
        availableButtons = (
            <React.Fragment>
                <Button className="mr-2" size="sm" variant="warning">Отозвать с публикации</Button>
            </React.Fragment>
        )

    return (
        <tr>
            <td>{authorArticle.article.title}</td>
            <td>{authorArticle.article.category.category}</td>
            <td>{authorArticle.article.statusArticle.statusArticle}</td>
            <td >{availableButtons}</td>
        </tr>
     
    )
}

export default AuthorArticleExcerpt

