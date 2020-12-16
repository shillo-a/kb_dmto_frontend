import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { CardHeading } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const ConsiderArticleExcerpt = ({ considerArticle }) => {
    return (
        <tr>
            <td>{considerArticle.title}</td>
            <td>{considerArticle.category}</td>
            <td className="text-center">
                <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Перейти к управлению статьей</Tooltip>}>
                    <Link to={`/article-manager/${considerArticle.id}`}>
                        <CardHeading size="22" className="text-dark"/>
                    </Link>
                </OverlayTrigger>
            </td>
            
        </tr>
    )
}

export default ConsiderArticleExcerpt
