const converDataToCSV = ({cards}) =>{ 
    return cards.reduce((csvString, {cardFront, cardBack}) => {
        return `${csvString}${cardFront.cardText},${cardBack.cardText};`
    },"")
}
export function GenerateExportData({exportType="json", deckData}){
    switch(exportType) {
        case "csv": 
            return {fileExtension: exportType,
                formatedDeckDataString: converDataToCSV(deckData)
            }

        case "json":
        default:
            return {
                fileExtension: exportType,
                formatedDeckDataString: JSON.stringify(deckData)
            }
    }
}