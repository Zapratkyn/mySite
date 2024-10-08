import { useEffect, useState } from "react"
import { getMessage, Loading, getLinks } from "./Helpers"
import { useMediaQuery } from 'react-responsive'

function Chat({props}) {

    const lg = useMediaQuery({query: '(min-width: 400px)'})
    const [autoScroll, setAutoScroll] = useState(true)

    return (
        <div hidden={!props.displayChat} className={`rounded bg-secondary-subtle border border-3 border-black h-75 p-2 ${props.displayChat && 'd-flex flex-column'}`} style={{width : lg ? '300px' : '250px', position : 'fixed', bottom : '80px', right : '35px', zIndex : '3'}}>
            {props.socket && props.socket.readyState !== 1 ?
            <div className="flex-grow-1 d-flex align-items-center justify-content-center"><Loading /></div> :
            <ChatWindow props={props} autoScroll={autoScroll} setAutoScroll={setAutoScroll} />}
            {!autoScroll && <ToBottomButton setAutoScroll={setAutoScroll} />}
            <hr />
            <Prompt props={props} />
        </div>
    )

}

function ChatWindow({props, autoScroll, setAutoScroll}) {

    useEffect(() => {
        if (autoScroll) {
            let chatDiv = document.getElementById('chatDiv')
            chatDiv.scrollTop = chatDiv.scrollHeight
        }
    }, [props.messages, autoScroll])

    useEffect(() => {
        let chatDiv = document.getElementById('chatDiv')
        chatDiv.scrollTop = chatDiv.scrollHeight
    })

    const checkScrollDirectionIsUp = e => {
		if (e.wheelDelta) {
		  return e.wheelDelta > 0;
		}
		return e.deltaY < 0;
	  }

    const unScroll = e => {
        if (checkScrollDirectionIsUp(e))
            setAutoScroll(false)
    }

    let index = 0

    return (
        <div onWheel={unScroll} id='chatDiv' className="overflow-auto flex-grow-1 noScrollBar">
            {props.messages.map(message => <Message key={index} id={index++} message={message} props={props} />)}
        </div>
    )

}

function ToBottomButton({setAutoScroll}) {

    const toBottom = () => {
        let chatDiv = document.getElementById('chatDiv')
        chatDiv.scrollTop = chatDiv.scrollHeight
        setAutoScroll(true)
    }

    return <div onClick={toBottom} className="d-flex justify-content-center mt-4"><img type='button' src="/images/arrow.svg" alt="" /></div>
}

function Message({id, message, props}) {

    useEffect(() => {
        if (message.type !== 'error')
            document.getElementById('message_' + id).innerHTML = getLinks(message.message.replace(/<.[^<>]*>/g, ''))
    }, [message])

    if (message.type === 'admin')
        return <div id={'message_' + id} className="text-primary fw-bold">{"Admin : " + message.message}</div>

    else if (message.type === 'error')
        return <div id={'message_' + id} className="text-danger fw-bold">{message.target && message.target + ' : '} {props.language['chatError_' + message.code]}</div>

    else if (message.type === 'iWhisp')
        return (
            <div>
                <span className='text-success'>{props.language.to + ' ' + message.target}</span>
                <span id={'message_' + id}></span>
            </div>
        )

    const sendWhisp = () => {
        let prompt = document.getElementById('prompt')
        prompt.value = '/w ' + message.name + ' '
        prompt.focus()
    }

    return (
        <div>
            {props.myProfile && message.id === props.myProfile.id ?
                <span className='text-danger'>{props.language.me}</span> :
                <span type='button' data-bs-toggle='dropdown' className={`fw-bold ${message.type === 'message' ? 'text-primary' : 'text-success'}`}>{message.name} {message.type === 'whisp' && props.language.whisps}</span>}
            <ul className="dropdown-menu">
                <li className="fw-bold ps-2">{message.name}</li>
                <li type='button' className="dropdown-divider"></li>
                <li type='button' className="menuLink fw-bold px-2" onClick={() => props.navigate('/profile/' + message.id)}>{props.language.seeProfile}</li>
                <li type='button' className="menuLink fw-bold px-2" onClick={sendWhisp}>{props.language.sendWhisp}</li>
            </ul>
            <span className="text-dark">{' : '}</span>
            <span id={'message_' + id}></span>
        </div>
    )

}

function Prompt({props}) {

    const captureKey = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
            let message = getMessage(document.getElementById('prompt').value, props.myProfile.name)
            if (message.type === 'error')
                props.setMessages([...props.messages, message])
            else {
                props.socket.send(JSON.stringify(message))
            }
            document.getElementById("prompt").value = message.type === 'whisp' ? '/w ' + message.target + ' ' : ''
        }
	}

    return (
        <input rows='1' id='prompt' onKeyDown={captureKey} className="w-100 form-control" type="text" placeholder={props.myProfile ? props.language.chatOn : props.language.chatOff} disabled={!props.myProfile} />
    )

}

export default Chat