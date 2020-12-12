import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BookmarkPlus, BookmarkCheckFill} from 'react-bootstrap-icons';

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
        favoriteSign = <Button variant="link" onClick={removeFromFavoriteHandler}><BookmarkCheckFill size={30}/></Button>
    } else {
        favoriteSign = <Button variant="link" onClick={addToFavoriteHandler}><BookmarkPlus size={30}/></Button>
    }

    return (
        <div>
            {favoriteSign}
        </div>
    )
}

export default FavoriteSign
