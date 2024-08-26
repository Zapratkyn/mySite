function Chat({props}) {

    let index = 0

    return (
        <div hidden={!props.displayChat} className="rounded bg-secondary-subtle border border-3 border-black h-75 p-2" style={{width : '300px', position : 'fixed', bottom : '80px', right : '35px'}}>
            <div className="overflow-auto" style={{height : '75%'}}>
                {props.messages.map(message => <Message key={index++} message={message} />)}
            </div>
            <div className="d-flex justify-content-center mt-4"><img type='button' src="arrow.svg" alt="" /></div>
            <hr />
            <Prompt props={props} />
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

function Prompt({props}) {

    const captureKey = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
         props.socket.send(JSON.stringify({
            name : props.myProfile.name, 
            id : props.myProfile.id,
            message : document.getElementById('prompt').value}))
		}
	}

    return (
        <input id='prompt' onKeyDown={captureKey} className="rounded w-100" type="text" placeholder={props.myProfile ? props.language.chatOn : props.language.chatOff} disabled={!props.myProfile} />
    )

}

export default Chat