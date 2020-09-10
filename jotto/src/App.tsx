import React from 'react';
import hookActions from './actions/hookActions';

import Loader from 'react-loader-spinner';

import './App.css';
import Input from './components/Input';
import languageContext from './contexts/language';
import LanguagePicker from './components/LanguagePicker';
import { SuccessProvider } from './contexts/success';
import Congrats from './components/Congrats';
import GuessedWords from './components/GuessedWords';
import { GuessedWordsProvider } from './contexts/guessedWords';

type Action = {
  type: 'setSecretWord' | 'setLanguage';
  payload: string;
};

type State = {
  secretWord: string | null;
  language: string;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action!.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' });

  const setSecretWord = (secretWord: string) => dispatch({ type: 'setSecretWord', payload: secretWord });
  const setLanguage = (language: string) => dispatch({ type: 'setLanguage', payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return state.secretWord ? (
    <div data-test="component-app" className="App">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsProvider>
          <SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessProvider>
          <GuessedWords />
        </GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  ) : (
    <Loader data-test="spinner" type="Puff" color="#00BFFF" height={100} width={100} />
  );
}

export default App;
