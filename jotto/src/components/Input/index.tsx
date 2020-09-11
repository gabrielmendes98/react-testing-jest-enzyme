import React from 'react';

import languageContext from '../../contexts/language';
import stringsModule from '../../lib/strings';
import successContext from '../../contexts/success';

interface Props {
  secretWord: string;
}

const Input: React.FC<Props> = ({ secretWord }) => {
  const { success, setSuccess } = successContext.useSuccess();
  const language = React.useContext(languageContext);
  const [currentGuess, setCurrentGuess] = React.useState('');

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setCurrentGuess('');
  }

  if (success) return null;

  return (
    <div data-test="component-input">
      <form>
        <input
          data-test="input-box"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button data-test="submit-button" onClick={handleSubmit}>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

export default Input;
