import Header from './Header.jsx'
import { useEffect, useState } from 'react';
import { getLanguage } from './trad.js'
import Options from './Options.jsx';
import Body from './Body.jsx';
import Chat from './Chat.jsx';
import { getCurrentPage, handleMessage } from './Helpers.jsx';

function App() {

  const [language, setLanguage] = useState(getLanguage('en'))
  const [displayChat, setDisplayChat] = useState(false)
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [myProfile, setMyProfile] = useState(undefined)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(undefined)

  const props = {language, setLanguage, currentPage, setCurrentPage, myProfile, setMyProfile, displayChat, messages, socket}
  
  const handleMessage = e => {

    let data = JSON.parse(e.data)
    if (Object.keys(data).includes('language')) {
      setLanguage(getLanguage(data.language))
      setMyProfile(data)
    }
    else
      setMessages([...messages, data])
  }

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('wss://' + window.location.host + '/ws/chat/')
      newSocket.onmessage = e => handleMessage(e)
      setSocket(newSocket)
    }
  }, [socket, messages])

  // console.log(myProfile)


  return (
    <>
      <Options props={props} />
      <Header props={props} />
      <Body props={props} />
      <Chat props={props} socket={socket} />
      <img className='rounded-circle border border-black border-3 p-2' onClick={() => setDisplayChat(!displayChat)} src="images/wechat.svg" alt="" style={{position : 'fixed', bottom : '20px', right : '30px'}} />
    </>
  )
}

export default App;
