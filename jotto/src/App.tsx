import React from 'react';
import './App.css';

import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';

function App() {
  return (
    <div data-test="component-app" className="App">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords
        guessedWords={[
          {
            guessedWord: 'train',
            letterMatchCount: 3,
          },
          {
            guessedWord: 'agile',
            letterMatchCount: 1,
          },
          {
            guessedWord: 'party',
            letterMatchCount: 5,
          },
        ]}
      />
    </div>
  );
}

export default App;
