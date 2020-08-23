const converterUrl = "https://tinydeckconverter.basileonline.com/"; 
const axios = require("axios");

class TinyDeckConverterClient {
    constructor(){
        this.tinyDeckConverterEndpoint = axios.create({baseUrl: converterUrl, validateStatus: null})
    }

    async _callTinyConverter({configuration}){
        const {status, data} = await this.tinyDeckConverterEndpoint(configuration); 

        if(status !== 200){
            // if there were problems bubble them up. 
            throw new Error({ 
                status, 
                data 
            });
        }
        
        return data; 
    }

    async convertDeck({deckFileFormData}){
        const configuration = {
            method: 'POST',
            url: converterUrl+"/duolingo/deck/conversion",
            data: deckFileFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        }

        return this._callTinyConverter({configuration})
    }
}

export default TinyDeckConverterClient; 