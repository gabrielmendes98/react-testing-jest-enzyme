import React, { useState } from 'react';

interface Props {
  secretWord: string;
}

const Input: React.FC<Props> = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setCurrentGuess('');
  }

  return (
    <div data-test="component-input">
      <form>
        <input
          data-test="input-box"
          placeholder="enter guess"
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button data-test="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
