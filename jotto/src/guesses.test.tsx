import React from 'react';
import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../tests/testUtils';

import successContext from './contexts/success';
import Input from './components/Input';

const setup = (secretWord = 'party') => {
  const wrapper = mount(
    <successContext.SuccessProvider>
      <Input secretWord={secretWord} />
    </successContext.SuccessProvider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'submit-button');

  return { wrapper, inputBox, submitButton };
};

describe('test word guesses', () => {
  let wrapper: any;
  let inputBox: any;
  let submitButton: any;

  beforeEach(() => {
    ({ wrapper, inputBox, submitButton } = setup());
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
  });
});
