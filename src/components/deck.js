import React, {useState}  from "react";
import {v1 as uuid} from "uuid"; 
import {Collapse} from 'react-collapse';

import Card from "./card";
import {ZipDecks} from "../converters/deckZipper"
import StackGrid from "react-stack-grid";

export default function Deck(props){
    const [deckContentVisible, setDeckContentVisible] = useState(false);

    async function downloadDeck(){
			const deckZip = await ZipDecks([props]); 
     
			const file = new Blob([deckZip], {type: 'application/zip'});
			
			const deckExportName = props.deckName.replace(/[^a-z0-9+]+/gi, '+'); 
			 
			const element = document.createElement("a");
			element.href = URL.createObjectURL(file);
      element.download = `${deckExportName}.zip`;
    	document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
    }

    function generateTitle({name, description, coverImage }){
        return (
            <div>
                <img alt="deckCoverImage" src={coverImage} width="100px;" onError={i => i.target.style.display='none'} />
                <br/>
                 <button onClick={() => setDeckContentVisible(!deckContentVisible)}>
                   {name}
                </button>
								<br/>
								<button id={name} onClick={downloadDeck}>
									Download Deck
                </button>
            </div>
            );
    }

    function generateCardGrid({cards}){

        const cardsJsx = cards.map(cardData =>{
            return (
                <Card 
                   cardData={cardData}
                   key={`${cardData.cardFront.cardText}-${cards.deckName}-${uuid()}`}
                />
            )
        })
        return(
            <div>
            <StackGrid columnWidth={200}>
                {cardsJsx}
            </StackGrid>
            </div>
        )
    }
    
    return( 
        <div>
            <h2>
               {generateTitle(props)}
            </h2>
            <h3>
                {props.description}
            </h3>
            <Collapse isOpened={deckContentVisible}>
             {generateCardGrid(props)}
             </Collapse>
        </div>
    ); 
}
