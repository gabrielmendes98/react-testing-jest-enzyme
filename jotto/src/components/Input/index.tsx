import React from 'react';

interface Props {
  secretWord: string;
}

const Input: React.FC<Props> = ({ secretWord }) => {
  return <div data-test="component-input"></div>;
};

export default Input;
