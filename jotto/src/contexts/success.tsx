import React from 'react';

interface ContextProps {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const successContext = React.createContext<ContextProps | undefined>(undefined);

const useSuccess = () => {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
};

const SuccessProvider = (props: any) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => ({ success, setSuccess }), [success]);

  return <successContext.Provider value={value} {...props}></successContext.Provider>;
};

export default { SuccessProvider, useSuccess };
