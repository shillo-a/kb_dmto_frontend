import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { BookmarkPlus, BookmarkCheckFill} from 'react-bootstrap-icons';
import UserArticleService from '../../UserArticle/services/UserArticleService';

const FavoriteSign = ({ articleId }) => {
    console.log(articleId)

    // AATF - add article to favorite
    const [statusAATF, setStatusAATF] = useState('idle')
    // const addArticleToFavorite = (articleId) => {
    //     setStatusAATF('loading')
    //     UserArticleService.addArticleToFavorite()
    //         .then(response => {
    //             setStatusAATF('succedded')
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setStatusAATF('failed')
    //         })
    // }

    let ArticleIsFavorite = false

    const addToFavoriteHandler = (event) => {
        console.log("To faworite added")
        // addArticleToFavorite(20)
    }

    const removeFromFavoriteHandler = (event) => {
        console.log("Removed from favorite")
    }

    var favoriteSign = ''
    if(ArticleIsFavorite){
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
