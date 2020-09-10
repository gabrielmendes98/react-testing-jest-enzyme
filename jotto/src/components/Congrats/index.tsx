import React from 'react';

import languageContext from '../../contexts/language';
import stringsModule from '../../lib/strings';
import successContext from '../../contexts/success';

const Congrats = () => {
  const [success] = React.useContext(successContext);
  const language = React.useContext(languageContext);
  return (
    <div data-test="component-congrats">
      {success && <h2 data-test="congrats-message">{stringsModule.getStringByLanguage(language, 'congrats')}</h2>}
    </div>
  );
};

export default Congrats;
