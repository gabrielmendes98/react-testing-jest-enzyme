import React from 'react';

import languageContext from '../../contexts/language';
import stringsModule from '../../lib/strings';
import guessedWordsContext from '../../contexts/guessedWords';

const GuessedWords = () => {
  const { guessedWords } = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  return (
    <div data-test="component-guessed-words">
      {guessedWords.length === 0 ? (
        <span data-test="guess-instructions">{stringsModule.getStringByLanguage(language, 'guessPrompt')}</span>
      ) : (
        <div data-test="guessed-words">
          <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
          <table>
            <thead>
              <tr>
                <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                <th>{stringsModule.getStringByLanguage(language, 'mathingLettersColumnHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((word, index) => (
                <tr data-test="guessed-word" key={index}>
                  <td>{word.guessedWord}</td>
                  <td>{word.letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuessedWords;
