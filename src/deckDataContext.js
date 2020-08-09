import React, { createContext, useContext, useReducer } from 'react';

const decksJsonData = createContext({deckData: []});  

function updateDecksJsonData(deckJsonDataCurrentState, action){
  switch(action.type){
    case 'updateCards':{
      return {deckData: action.data.usableDecks}; 
    }
    default: {
      return deckJsonDataCurrentState; 
    }
  }
}

export function DecksContextProvider({children}){
  const [deckDataState, setDeckData] = useReducer(updateDecksJsonData,{deckData: []}); 

  return (
    <decksJsonData.Provider value={{ deckDataState, setDeckData }}>
      {children}
    </decksJsonData.Provider>
  ); 
}

export function useDeckData(){
  const deckJsonDataContext = useContext(decksJsonData); 
  return deckJsonDataContext; 
}
