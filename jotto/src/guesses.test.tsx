import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../tests/testUtils';
import successContext from './contexts/success';
import Input from './components/Input';
import guessedWordsContext from './contexts/guessedWords';
import GuessedWords from './components/GuessedWords';

const setup = (secretWord = 'party', guessedWordsStrings: string[] = []) => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'submit-button');

  guessedWordsStrings.forEach((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });

  return { wrapper, inputBox, submitButton };
};

describe('test word guesses', () => {
  let wrapper: any;
  let inputBox: any;
  let submitButton: any;

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      ({ wrapper, inputBox, submitButton } = setup('party', ['agile']));
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });

      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });

      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });

      test('Input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });

      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });

  describe('empty guessedWords', () => {
    beforeEach(() => {
      ({ wrapper, inputBox, submitButton } = setup('party', []));
    });

    test('guessedWords shows correct guesses after incorrect guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');

      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
