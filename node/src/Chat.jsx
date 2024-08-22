import { useState, useEffect } from "react"

function Chat({props}) {

    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(undefined)

    useEffect(() => {
        // if (!socket)
        //     setSocket()
        // else
        //     socket.onmessage = e => setMessages(...messages, JSON.parse(e.data))
        if (messages.length === 0)
            fetch('../json/chat.json').then(result => result.json().then(data => setMessages(data)))
    })

    let index = 0

    return (
        <div hidden={!props.displayChat} className="rounded bg-secondary-subtle border border-3 border-black h-75 p-2" style={{width : '300px', position : 'fixed', bottom : '80px', right : '35px'}}>
            <div className="overflow-auto" style={{height : '75%'}}>
                {messages.map(message => <Message key={index++} message={message} />)}
            </div>
            <div className="d-flex justify-content-center mt-4"><img type='button' src="arrow.svg" alt="" /></div>
            <hr />
            <Prompt props={props} socket={socket} />
        </div>
    )

}

function Message({message}) {

    return (
        <div>
            <span className="me-2 text-primary">{message.name}</span>
            :
            <span className="ms-2">{message.message}</span>
        </div>
    )

}

function Prompt({props, socket}) {

    const captureKey = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
			// socket.send(JSON.stringify({name : props.myProfile.name, message : document.getElementById('prompt').value}))
		}
	}

    return (
        <input id='prompt' onKeyDown={captureKey} className="rounded w-100" type="text" placeholder={props.myProfile ? props.language.chatOn : props.language.chatOff} disabled={props.myProfile} />
    )

}

export default Chat