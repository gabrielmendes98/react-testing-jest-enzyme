import React from 'react';
import hookActions from './actions/hookActions';

import './App.css';

type Action = {
  type: 'setSecretWord';
  payload: string;
};

type State = {
  secretWord: string | null;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord: string) => dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return (
    <div data-test="component-app" className="App">
      <h1>Jotto</h1>
    </div>
  );
}

export default App;
