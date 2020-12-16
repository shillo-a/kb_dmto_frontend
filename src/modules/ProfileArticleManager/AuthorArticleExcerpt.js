import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Tools, CardHeading} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import ArticleStatus from '../Article/ArticleStatus'

const AuthorArticleExcerpt = ({ authorArticle }) => {

    return (
        <tr>
            <td>{authorArticle.article.title}</td>
            <td>{authorArticle.article.category.category}</td>
            <td>
                <ArticleStatus statusArticle={authorArticle.article.statusArticle}/>
            </td>
            <td className="text-center">
                <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Перейти к управлению статьей</Tooltip>}>
                    <Link to={`/article-manager/${authorArticle.article.id}`}>
                        <CardHeading size="22" className="text-dark"/>
                    </Link>
                </OverlayTrigger>
            </td>
            
        </tr>
        
     
    )
}

export default AuthorArticleExcerpt





    // var availableButtons = <td align="center"></td>
    // if(
    //     authorArticle.article.statusArticle.id === 'draft' || 
    //     authorArticle.article.statusArticle.id === 'decline'
    // ){
    //     availableButtons = (
    //         <React.Fragment>
    //             <Button className="mr-2" size="sm">Редактировать</Button>
    //             <Button className="mr-2" size="sm" variant="success">Опубликовать</Button>
    //             <Button size="sm" variant="danger">Удалить</Button>
    //         </React.Fragment>
    //     )
    // } else if (authorArticle.article.statusArticle.id === 'consider')
    //     availableButtons = (
    //         <React.Fragment>
    //             <Button className="mr-2" size="sm" variant="warning">Отозвать с публикации</Button>
    //         </React.Fragment>
    //     )

    