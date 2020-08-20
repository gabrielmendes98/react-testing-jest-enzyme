import React from 'react';

import languageContext from '../../contexts/language';
import stringsModule from '../../lib/strings';

interface Params {
  success: boolean;
}

const Congrats: React.FC<Params> = ({ success }) => {
  const language = React.useContext(languageContext);
  return (
    <div data-test="component-congrats">
      {success && <h2 data-test="congrats-message">{stringsModule.getStringByLanguage(language, 'congrats')}</h2>}
    </div>
  );
};

export default Congrats;
