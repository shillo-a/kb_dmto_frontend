const convertFromRawArticle = (startData) => {

    // Выбираем все секции из данных и отчищаем от потворяющихся значений
    const sections = startData.map(row => {
        return{ 
            head: row.head, 
            body: JSON.parse(row.body)
        }
    })

    // Выбираем первые значения из array
    const articleId = startData[0].id
    const title = startData[0].title
    const categoryId = startData[0].categoryId.id
    const status = {id: startData[0].statusArticleId.id, statusArticle: startData[0].statusArticleId.statusArticle}
    const user = {id: startData[0].userId.id}
    // Формируем новый объект
    const finishData = {
        articleId: articleId,
        title: title,
        sections: sections,
        categoryId: categoryId,
        status: status, //draft consider decline publiched archive?
        user: user,
        // НЕ ХВАТАЕТ ИНФОРМАЦИИ В backend
        article_base_id: 0
    }

    return finishData
}

const convertInRawArticle = (startData) => {

}

export default {
    convertFromRawArticle,
    convertInRawArticle
};