import React from 'react';

const successContext = React.createContext(false);

function useSuccess() {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
}

const SuccessProvider = (props: any) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props}></successContext.Provider>;
};

export default { SuccessProvider, useSuccess };
