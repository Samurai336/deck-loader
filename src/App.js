import React from 'react';
import './App.css';
import Uploader from "./components/uploader";
import DeckPack from "./components/deckPack";
import { DecksContextProvider } from "./deckDataContext";

function App() {
  return (
      <div className="App">
      <DecksContextProvider>
          <Uploader />
          <DeckPack />
      </DecksContextProvider>
      </div>
  );
}

export default App;
