import Header from './Header.jsx'
import { useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('en'))
  const [currentPage, setCurrentPage] = useState('/')

  const props = {language, setLanguage, currentPage, setCurrentPage}

  return (
    <>
      <Options props={props} />
      <Header props={props} />
      {/* <hr style={{position : 'sticky', top : '150px'}} /> */}
      <Body props={props} />
    </>
  )
}

export default App;
