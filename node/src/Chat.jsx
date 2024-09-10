import { useEffect, useState } from "react"

function Chat({props}) {

    const [autoScroll, setAutoScroll] = useState(true)

    return (
        <div hidden={!props.displayChat} className="rounded bg-secondary-subtle border border-3 border-black h-75 p-2" style={{width : '300px', position : 'fixed', bottom : '80px', right : '35px', zIndex : '3'}}>
            <ChatWindow props={props} autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
            <ToBottomButton setAutoScroll={setAutoScroll} />
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
        <div onWheel={unScroll} id='chatDiv' className="overflow-auto" style={{height : '75%'}}>
            {props.messages.map(message => <Message key={index++} message={message} props={props} />)}
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

function Message({message, props}) {

    if (message.type === 'system')
        return <div className="text-primary">{message.message}</div>

    else if (message.type === 'error')
        return <div className="text-danger fw-bold">{message.target + ' : '} {props.language['chatError_' + message.code]}</div>

    else if (message.type === 'iWhisp')
        return (
            <div>
                <span className='text-success'>{props.language.to + ' ' + message.target}</span>
                <span>{' : ' + message.message}</span>
            </div>
        )

    return (
        <div>
            <span className={`${message.type === 'message' ? 'text-primary' : 'text-success'}`}>{message.name} {message.type === 'whisp' && props.language.whisps}</span>
            <span>{' : ' + message.message}</span>
        </div>
    )

}

function Prompt({props}) {

    const captureKey = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
            props.socket.send(JSON.stringify({
                action : 'chat',
                item : {
                    type : 'whisp',
                    target : 'Test2',
                    message : document.getElementById('prompt').value
                }
		    }))
            document.getElementById("prompt").value = ''
        }
	}

    return (
        <input id='prompt' onKeyDown={captureKey} className="rounded w-100" type="text" placeholder={props.myProfile ? props.language.chatOn : props.language.chatOff} disabled={!props.myProfile} />
    )

}

export default Chat