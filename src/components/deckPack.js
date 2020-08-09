import React from "react";

import { useDeckData } from "../deckDataContext";
import Deck from "./deck";


export default function DeckPack(){
    const { deckDataState } = useDeckData();

    function buildDecks(){
        const { deckData } = deckDataState; 

        if(deckData){
            const deckPack = deckData.map( deck =>{
                return(
                    <Deck
                        key={deck.name}
                        name={deck.name}
                        description={deck.description}
                        coverImage={deck.coverImage}
                        cards={deck.cards}
                    /> 
                )
            })
            return(
                <div> 
                    {deckPack}
                </div>
            );
        }
        return (
            <div> 
                Decks not loaded
            </div>
        );
    }

    return (
        <div>
            {buildDecks()}
        </div>
    ); 


}