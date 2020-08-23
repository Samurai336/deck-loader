import React from "react";
import "./App.css";
import Uploader from "./components/uploader";
import DeckPack from "./components/deckPack";
import { DecksContextProvider } from "./deckDataContext";

function App() {
  return (
    <div className="App" id="page-container">
      <div id="content-wrap">
        <h1>Tiny Deck Rescue</h1>
        <DecksContextProvider>
          <Uploader />
          <DeckPack />
        </DecksContextProvider>
      </div>
      <div id="manipulate">
        Want to contribute?
        <br />
        Source code can be found{" "}
        <a  rel="noopener noreferrer"  target="_blank"  href="https://github.com/Samurai336/DulingoDeckConverter">
          here
        </a>{" "}
        and <a rel="noopener noreferrer"  target="_blank"  href="https://github.com/Samurai336/deck-loader"> here</a>.
        <br /> Pull requests welcome.
      </div>
    </div>
  );
}
export default App;
