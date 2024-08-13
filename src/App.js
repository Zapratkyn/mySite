import Header from './Header.jsx'
import { useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('fr'))

  const props = {language, setLanguage}

  return (
    <>
      <Options props={props} />
      <Header props={props} />
      <hr />
      <Body props={props} />
    </>
  )
}

export default App;
