import React from 'react';

interface Props {
  setLanguage: (code: string) => void;
}

const LanguagePicker: React.FC<Props> = ({ setLanguage }) => {
  const languages = [
    { code: 'en', symbol: 'us' },
    { code: 'br', symbol: 'br' },
  ];

  return (
    <div data-test="component-language-picker">
      {languages.map((language) => (
        <span data-test="language-icon" key={language.code} onClick={() => setLanguage(language.code)}>
          {language.symbol}{' '}
        </span>
      ))}
    </div>
  );
};

export default LanguagePicker;
