import Header from './Header.jsx'
import { useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('en'))
  const [currentPage, setCurrentPage] = useState('/')
  const [myProfile, setMyProfile] = useState(undefined)

  const props = {language, setLanguage, currentPage, setCurrentPage, myProfile, setMyProfile}

  return (
    <>
      <Options props={props} />
      <Header props={props} />
      <Body props={props} />
    </>
  )
}

export default App;
