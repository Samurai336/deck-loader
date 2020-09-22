const converDataToCSV = ({cards}) =>{ 
    return cards.reduce((csvString, {cardFront, cardBack}) => {
        const cleanFrontText = cardFront.cardText.replace(/,/g, '-');
        const cleanBackText = cardBack.cardText.replace(/,/g, '-');

        return `${csvString}${cleanFrontText},${cleanBackText};`
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