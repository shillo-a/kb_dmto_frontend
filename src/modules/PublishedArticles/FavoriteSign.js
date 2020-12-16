import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BookmarkPlus, BookmarkCheckFill, CheckCircleFill} from 'react-bootstrap-icons';

import UserArticleService from '../../services/apis/user-article-service';

const FavoriteSign = ({ articleId }) => {

    const [articleIsFavorite, setArticleIsFavorite] = useState(false)

    // CAIF  check article is favorite
    const [statusCAIF, setStatusCAIF] = useState('idle')
    const checkArticleIsFavorite = (articleId) => {
        setStatusCAIF('loading')
        UserArticleService.checkArticleIsFavorite(articleId)
            .then(response => {
                setStatusCAIF('succedded')
                setArticleIsFavorite(true)
            })
            .catch(error => {
                console.log(error)
                setStatusAATF('failed')
                setArticleIsFavorite(false)
            })
    }

    // AATF - add article to favorite
    const [statusAATF, setStatusAATF] = useState('idle')
    const addArticleToFavorite = (articleId) => {
        setStatusAATF('loading')
        UserArticleService.addArticleToFavorite(articleId)
            .then(response => {
                setStatusAATF('succedded')
                setArticleIsFavorite(true)
            })
            .catch(error => {
                console.log(error)
                setStatusAATF('failed')
            })
    }

    // RAFF - remove article from favorite
    const [statusRAFF, setStatusRAFF] = useState('idle')
    const removeArticleFromFavorite = (articleId) => {
        setStatusRAFF('loading')
        UserArticleService.removeArticleFromFavorite(articleId)
            .then(response => {
                setStatusRAFF('succedded')
                setArticleIsFavorite(false)
            })
            .catch(error => {
                console.log(error)
                setStatusRAFF('failed')
            })
    }

    useEffect(() => {
        checkArticleIsFavorite(articleId)
    }, [])

    const addToFavoriteHandler = (event) => {
        addArticleToFavorite(articleId)
    }

    const removeFromFavoriteHandler = (event) => {
        removeArticleFromFavorite(articleId)
    }

    var favoriteSign = ''
    if(articleIsFavorite){
        favoriteSign = 
        <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Убрать из избранного</Tooltip>}>
            <Button variant="link" onClick={removeFromFavoriteHandler}>
                <BookmarkCheckFill size={30}/>
            </Button>
        </OverlayTrigger>
    } else {
        favoriteSign = 
        <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Добавить в избранное</Tooltip>}>
            <Button variant="link" onClick={addToFavoriteHandler}>
                <BookmarkPlus size={30}/>
            </Button>
        </OverlayTrigger>
    }

    //Дополнительная кнопка, если статья является твоей
    //<Button variant="link"><CheckCircleFill size={30}/></Button>

    return (
        <div>
            {favoriteSign}
        </div>
    )
}

export default FavoriteSign
