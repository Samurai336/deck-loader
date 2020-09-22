import JSZip from "jszip";
import { GenerateExportData } from "./dataFormatter.js"
const url = require('url');
const axios = require("axios");

const getImage = async (imageSourceUrl) => {
    const { data, status } = await axios.request({
        url: `https://cors-anywhere.herokuapp.com/${imageSourceUrl}`,
        mathod: "GET",
        responseType: "blob",
        validateStatus: false 
    })

    if(status === "404"){
        return null
    }
    return data; 
}

const handleCardImage = async ({cardSide, zippedPack}) => {
    if(cardSide.cardImageUrl.trim()){
        const imageUrl = cardSide.cardImageUrl; 
        const imageName = url.parse(imageUrl).path.replace(/\\|\//g,''); 
        const dataPath = `assets/${imageName}`; 
        const cardImage = await getImage(imageUrl); 
        if(cardImage){
            zippedPack.file(dataPath, cardImage); 
        }
        cardSide.cardImageAssetPath = dataPath; 
    }
}

const ZipDeck = async ({deck, zippedPack, exportType}) => {
    const deckData = JSON.parse(JSON.stringify(deck));
    if(deck.coverImage.trim()){
        const coverImageUrl = deck.coverImage; 
        const coverImageName = url.parse(coverImageUrl).path.replace(/\\|\//g,''); 
        const coverImageData = await getImage(coverImageUrl); 
        const dataPath = `assets/${coverImageName}`; 
        zippedPack.file(dataPath, coverImageData); 
        deckData.coverImageLocalAssetPath = dataPath; 
    }

    for(let i = 0; i < deckData.cards.length; i = i + 1){ 
        await handleCardImage({cardSide: deckData.cards[i].cardFront, zippedPack})
        await handleCardImage({cardSide: deckData.cards[i].cardBack, zippedPack})
    }

    const deckExportName = deckData.name.replace(/[^a-z0-9+]+/gi, '+'); 

    const {fileExtension, formatedDeckDataString} = GenerateExportData({exportType, deckData});

    zippedPack.file(`${deckExportName}.${fileExtension}`,JSON.stringify(formatedDeckDataString));
}

export async function ZipDecks({Decks, exportType="json"}){
    const zippedPack = new JSZip();
    for(let i = 0; i < Decks.length; i = i + 1){
        const deck = Decks[i]; 
        await ZipDeck({deck, zippedPack, exportType}); 
    }

   return zippedPack.generateAsync({type:"blob"}); 
}
