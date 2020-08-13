import React from 'react';

interface Params {
  success: boolean;
}

const Congrats: React.FC<Params> = ({ success }) => {
  return <div data-test="component-congrats">{success && <h2 data-test="congrats-message">Congratulations!</h2>}</div>;
};

export default Congrats;
