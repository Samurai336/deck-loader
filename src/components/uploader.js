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
            <div max-width="400px" > 
						<h3>
								You can now preview your Tiny Card Decks Below. 
							<br/>
						</h3>
							<h2>Step 3a</h2>
							Click `Download All Decks` to download your deckdata and assets in a zip file.<br/>
							The zip file, will contain each decks data as a JSON file and all your cards image resource will be in a folder called assets.
							<br/>
							<button onClick={downloadAllDecks}>
                Download All Decks
            	</button>
							<h2>Step 3b</h2>
							Download individual decks in a zip file by clicking `Download this Deck` next to each decks preview button.<br/>
							The zip file, will contain that decks data as a JSON file and all its image resource will be in a folder called assets.
							<br/>
          </div> 
            ); 
        }  
        return (
            <div> 
            <br /> 
          </div> 
        )
    }
    return (
        <div>
        <h2>Step 1</h2>
            <p>
                Go to <a rel="noopener noreferrer"  target="_blank"  href="https://support.duolingo.com/hc/en-us/articles/360043909772"> the shutdown FAQ </a> and follow the instructions under "What will happen to our existing decks?".
            </p>
            <p>
                Following the instructions and use <a rel="noopener noreferrer"  target="_blank"  href="https://drive-thru.duolingo.com/">drive through</a> download your deck data. The file you need will be called `decks.csv`.
            </p>
        <h2>
            Step 2
        </h2>
            <p>
                Upload your decks.csv file here 
            </p>
        <div> 
            <input type="file" onChange={(e) => onFileChange(e)} />
        </div>
            {fileData()}
        </div>
    ); 
}

