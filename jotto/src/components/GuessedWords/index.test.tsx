import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import GuessedWords from './index';
import guessedWordsContext from '../../contexts/guessedWords';

interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}

const setup = (mockGuessedWords: GuessedWord[] = []) => {
  const mockUseGuessedWords = jest.fn().mockReturnValue({
    guessedWords: mockGuessedWords,
    setGuessedWords: jest.fn(),
  });
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <GuessedWords />
    </guessedWordsContext.GuessedWordsProvider>
  );
};

describe('if there are no words guessed', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper: any;
  const guessedWords = [
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
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe('language context', () => {
  test('correctly renders guess instructions string in english', () => {
    const wrapper = setup();
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toEqual('Try to guess the secret word!');
  });

  test('correctly renders guess instructions string in pt', () => {
    const mockUseContext = jest.fn().mockReturnValue('pt');
    React.useContext = mockUseContext;

    const wrapper = setup();
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toEqual('Tente adivinhar a palavra!');
  });
});
