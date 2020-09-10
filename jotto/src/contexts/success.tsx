import React from 'react';

const successContext = React.createContext([] as (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]);

function useSuccess() {
  const context = React.useContext(successContext);

  if (context.length === 0) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
}

const SuccessProvider: React.FC = (props) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props}></successContext.Provider>;
};

export { SuccessProvider, useSuccess };

export default successContext;
