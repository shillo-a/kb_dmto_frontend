const convertFromRawSectionTemplate = (startData) => {

    //Сортировка происходит в backend
    const finishData = startData.map(row => {
        return {head: row.head, body: row.body}
    })

    return finishData
}

export default {
    convertFromRawSectionTemplate
};