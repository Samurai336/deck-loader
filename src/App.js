import React from 'react';
import './App.css';
import Uploader from "./components/uploader";
import DeckPack from "./components/deckPack";
import { DecksContextProvider } from "./deckDataContext";

function App() {
  return (
      <div className="App">
      <h1>Tiny Deck Rescue</h1>
        <DecksContextProvider>
            <Uploader />
            <DeckPack />
        </DecksContextProvider>
        <div id="header">
          <div id="header-content">
            Want to contribute? Source code can be found <a href="https://github.com/Samurai336/DulingoDeckConverter">here</a>
             and <a href="https://github.com/Samurai336/deck-loader"> here</a>. Pull requests welcome. 
          </div>

        </div>
      </div>
  );
}

export default App;
