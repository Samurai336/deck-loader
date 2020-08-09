import TinyDeckConverter from '../clients/tinydeckconverterclient.js'
import { useDeckData } from "../deckDataContext";
import {ZipDecks} from "../converters/deckZipper"
import React, {useState} from "react";



export default function Uploader() { 
    const [deckFile, setDeckFile] = useState(null);
    const { deckDataState, setDeckData } = useDeckData();
    const tinyDeckConverterClient = new TinyDeckConverter(); 

    async function onFileChange(event) {
        setDeckFile(event.target.files[0]); 
         
        const deckFileFormData = new FormData(); 
        deckFileFormData.append("dulingoDeckCsvFile", 
        event.target.files[0], 
        event.target.files[0].name); 

        const deckData = await tinyDeckConverterClient.convertDeck({deckFileFormData});
        setDeckData({ type: "updateCards", data: deckData}); 
    }

    async function downloadAllDecks(){
        const deckZip = await ZipDecks(deckDataState.deckData); 
 
        const file = new Blob([deckZip], {type: 'application/zip'});
        
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = `AllDecks.zip`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    function fileData (){
        if(deckFile){
            return(
            <div> 
            <h2>File Details:</h2> 
            <p>File Name: {deckFile.name}</p> 
            <p>File Type: {deckFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {deckFile.lastModifiedDate.toDateString()} 
            </p> 
            <button onClick={downloadAllDecks}>
                Download All Decks
            </button>
          </div> 
            ); 
        }  
        return (
            <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        )
    }
    return (
        <div>
        <div> 
            <input type="file" onChange={(e) => onFileChange(e)} />
        </div>
            {fileData()}
        </div>
    ); 
}

