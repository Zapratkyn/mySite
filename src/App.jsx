import Header from './Header.jsx'
import { useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';
import Chat from './Chat.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('en'))
  const [displayChat, setDisplayChat] = useState(false)
  const [currentPage, setCurrentPage] = useState('/')
  const [myProfile, setMyProfile] = useState(undefined)

  const props = {language, setLanguage, currentPage, setCurrentPage, myProfile, setMyProfile, displayChat}

  return (
    <>
      <Options props={props} />
      <Header props={props} />
      <Body props={props} />
      <Chat props={props} />
      <img className='rounded-circle border border-black border-3 p-2' onClick={() => setDisplayChat(!displayChat)} src="images/wechat.svg" alt="" style={{position : 'fixed', bottom : '20px', right : '30px'}} />
    </>
  )
}

export default App;
