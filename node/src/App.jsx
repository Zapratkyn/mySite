import Header from './Header.jsx'
import { useEffect, useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';
import Chat from './Chat.jsx';
import { getCurrentPage } from './Helpers.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('fr'))
  const [displayChat, setDisplayChat] = useState(false)
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [myProfile, setMyProfile] = useState(undefined)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(undefined)
  const navigate = useNavigate()

  const props = {language, setLanguage, currentPage, setCurrentPage, myProfile, setMyProfile, displayChat, messages, setMessages, socket, setSocket, navigate}

  useEffect(() => {
    if (!socket) {
      fetch('/chat/init').then(response => {
        if (response.status === 200) {
          setSocket(new WebSocket('wss://' + window.location.host + '/ws/chat/'))
          response.json().then(data => setMessages(data.data))
        }
      })
    }
    else {
      socket.onclose = () => setSocket(new WebSocket('wss://' + window.location.host + '/ws/chat/'))
      socket.onmessage = e =>  {
        let data = JSON.parse(e.data)
        if (Object.keys(data).includes('language')) {
          setLanguage(getLanguage(data.language))
          setMyProfile(data)
        }
        else if (Object.keys(data).includes('success'))
          setLanguage(getLanguage(language.language))
        else
          setMessages([...messages, data])
      }
    }
  }, [socket, messages, language])

  return (
    <div className='d-flex flex-column vh-100'>
      <Options props={props} />
      <Header props={props} />
      <Body props={props} />
      <Chat props={props} />
      <Footer props={props} />
      <img type='button' className='rounded-circle border border-black border-3 p-2' onClick={() => setDisplayChat(!displayChat)} src="/images/wechat.svg" alt="" style={{position : 'fixed', bottom : '20px', right : '30px'}} />
    </div>
  )
}

export default App;
