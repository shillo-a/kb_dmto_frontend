const convertSectionBodyToJsonString = (startData) => {
    const finishData = startData.map((row, index) => {
        return {
            head: row.head, 
            body: JSON.stringify(row.body),
            orderNum: index+1
        }
    })
    return finishData
}

export default {
    convertSectionBodyToJsonString
};