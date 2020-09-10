import React, { useContext } from 'react';

interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}

interface ContextProps {
  guessedWords: GuessedWord[];
  setGuessedWords: React.Dispatch<React.SetStateAction<GuessedWord[]>>;
}

const guessedWordsContext = React.createContext<ContextProps | undefined>(undefined);

export function useGuessedWords() {
  const context = useContext(guessedWordsContext);

  if (!context) {
    throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
  }

  return context;
}

export function GuessedWordsProvider(props: any) {
  const [guessedWords, setGuessedWords] = React.useState([] as GuessedWord[]);

  const value = React.useMemo(() => ({ guessedWords, setGuessedWords }), [guessedWords]);

  return <guessedWordsContext.Provider value={value} {...props}></guessedWordsContext.Provider>;
}

export default { GuessedWordsProvider, useGuessedWords };
