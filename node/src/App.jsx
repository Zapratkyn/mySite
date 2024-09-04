import Header from './Header.jsx'
import { useEffect, useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';
import Chat from './Chat.jsx';
import { getCurrentPage } from './Helpers.jsx';
import { useNavigate } from 'react-router-dom';

function App() {

  const [language, setLanguage] = useState(getLanguage('en'))
  const [displayChat, setDisplayChat] = useState(false)
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [myProfile, setMyProfile] = useState(undefined)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(undefined)
  const navigate = useNavigate()

  const props = {language, setLanguage, currentPage, setCurrentPage, myProfile, setMyProfile, displayChat, messages, socket, navigate}

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('wss://' + window.location.host + '/ws/chat/')
      newSocket.onmessage = e => {
        let data = JSON.parse(e.data)
        if (Object.keys(data).includes('language')) {
          setLanguage(getLanguage(data.language))
          setMyProfile(data)
        }
        else
          setMessages([...messages, data])
      }
      setSocket(newSocket)
    }
  }, [socket, messages])


  return (
    <>
      <Options props={props} />
      <Header props={props} />
      <Body props={props} />
      <Chat props={props} />
      <img className='rounded-circle border border-black border-3 p-2' onClick={() => setDisplayChat(!displayChat)} src="/images/wechat.svg" alt="" style={{position : 'fixed', bottom : '20px', right : '30px'}} />
    </>
  )
}

export default App;
