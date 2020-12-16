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

    // Формируем новый объект
    const finishData = {
        articleId: articleId,
        title: title,
        sections: sections,
        
        // НЕ ХВАТАЕТ ИНФОРМАЦИИ В backend
        status: {id:'draft', statusArticle:'Черновик'}, //draft consider decline publiched archive?
        categoryId: 4,
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