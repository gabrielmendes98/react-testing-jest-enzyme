const languageStrings = {
  en: {
    congrats: 'Congratulations! You guessed the word!',
    submit: 'Submit',
    guessPrompt: 'Try to guess the secret word!',
    guessInputPlaceholder: 'enter guess',
    guessColumnHeader: 'Guessed Words',
    guessedWords: 'Guesses',
    mathingLettersColumnHeader: 'Matching Letters',
  },
  pt: {
    congrats: 'Parabens! Voce adivinhou a palavra!',
    submit: 'Enviar',
    guessPrompt: 'Tente adivinhar a palavra!',
    guessInputPlaceholder: 'digite seu palpite',
    guessColumnHeader: 'Palavras Adivinhadas',
    guessedWords: 'Palpites',
    mathingLettersColumnHeader: 'Letras Correspondentes',
  },
};

function getStringByLanguage(languageCode: string, stringKey: string, strings: any = languageStrings) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
}

export default {
  getStringByLanguage,
};
