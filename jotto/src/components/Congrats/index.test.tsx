import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../../../tests/testUtils';
import Congrats from './index';
import languageContext from '../../contexts/language';
import successContext from '../../contexts/success';

const setup = ({ success = false, language = 'en' } = {}) =>
  mount(
    <languageContext.Provider value={language}>
      <successContext.Provider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.Provider>
    </languageContext.Provider>
  );

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });

  test('correctly renders congrats string in pt', () => {
    const wrapper = setup({ success: true, language: 'pt' });
    expect(wrapper.text()).toBe('Parabens! Voce adivinhou a palavra!');
  });
});

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
