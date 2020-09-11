import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { findByTestAttr } from '../../../tests/testUtils';
import Input from './index';
import languageContext from '../../contexts/language';
import successContext from '../../contexts/success';
import guessedWordsContext from '../../contexts/guessedWords';

const setup = ({ secretWord = 'party', language = 'en', success = false } = {}) =>
  mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={{ success, setSuccess: jest.fn() }}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
    </languageContext.Provider>
  );

test('input renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

describe('state controlled input field', () => {
  const mockSetCurrentGuess = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    wrapper = setup();
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('language context', () => {
  test('correctly renders input placeholder in english', () => {
    const wrapper = setup({ language: 'en' });
    const input = findByTestAttr(wrapper, 'input-box');
    expect(input.props().placeholder).toEqual('enter guess');
  });

  test('correctly renders input placeholder in pt', () => {
    const wrapper = setup({ language: 'pt' });
    const input = findByTestAttr(wrapper, 'input-box');
    expect(input.props().placeholder).toEqual('digite seu palpite');
  });

  test('correctly renders submit button in english', () => {
    const wrapper = setup({ language: 'en' });
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.text()).toEqual('Submit');
  });

  test('correctly renders submit button in pt', () => {
    const wrapper = setup({ language: 'pt' });
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.text()).toEqual('Enviar');
  });
});

test('input component does not show when success is true', () => {
  const wrapper = setup({ secretWord: 'party', success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
