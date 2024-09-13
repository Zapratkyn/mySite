import { useState, useEffect } from "react"
import {Title, validateForm, validateSignup} from "./Helpers"
import Cookies from 'js-cookie'
import { getLanguage } from "./trad"

export function SignIn({props}) {

    const token = Cookies.get('csrftoken')

    useEffect(() => {
        if (props.myProfile) {
            props.setCurrentPage('/')
            props.navigate('/')
        }
    }, [props])

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const signIn = () => {
        let inputs = [
            document.getElementById('username'),
            document.getElementById('password')
        ]
        if (!validateForm(inputs))
            return
        fetch('/profiles/signin', {
            method : 'POST',
            headers: {'X-CSRFToken': getCookie("csrftoken")},
            mode : 'same-origin',
            body : JSON.stringify({
                username : inputs[0].value,
                password : inputs[1].value
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data)
                    props.setMyProfile(data)
                    props.setLanguage(getLanguage(data.language))
                    props.socket.send(JSON.stringify({action : 'login'}))
                    // props.navigate('/profiles/' + data.id)
                    props.navigate('/')
                })
            }
            else if(response.status !== 404) {
                response.json().then(data => 
                    document.getElementById('signInError').innerHTML = props.language['signInError_' + data.error])
            }
            else
                document.getElementById('signInError').innerHTML = props.language.signUpError_8
        })
    }

    const typing = e => {
        document.getElementById(e.target.id).setAttribute('class', 'form-control w-50')
        document.getElementById('signInError').innerHTML = ''
        if (e.keyCode === 13) {
            e.preventDefault()
            signIn()
        }
    }

    return (
        <section className="me-2">
            <Title title={props.language.signIn} />
            <form className="rounded border border-3 mt-5 w-50 d-flex flex-column align-items-center p-3 fw-bold gap-2" style={{margin : 'auto'}}>
                <label htmlFor="username">{props.language.username}</label>
                <input className="form-control w-50" onKeyDown={typing} type="text" name="username" id="username" />
                <label htmlFor="password">{props.language.password}</label>
                <input className="form-control w-50" onKeyDown={typing} type="password" name="password" id="password" />
                <span className="h6">({props.language.allFieldsMandatory})</span>
                <button onClick={signIn} type='button' className="btn btn-secondary mt-3">{props.language.connexion}</button>
                <span id='signInError'></span>
                <span>{props.language.noAccount} ?
                    <span onClick={() => props.navigate('/signup')} type='button' className="ms-1 mt-3 text-primary text-decoration-underline">
                        {props.language.createAccount}
                    </span>
                </span>
            </form>
        </section>
    )

}

export function SignUp({props}) {

    const token = Cookies.get('csrftoken')
    
    useEffect(() => {
        if (props.myProfile) {
            props.setCurrentPage('/')
            props.navigate('/')
        }
    }, [props])

    const signUp = () => {
        let inputs = [
            document.getElementById('username'),
            document.getElementById('password'),
            document.getElementById('passwordConfirm'),
            document.getElementById('email')
        ]
        if (!validateSignup(inputs))
            return
        fetch('/profiles/signup', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify({
                username : inputs[0].value,
                password : inputs[1].value,
                passwordConfirm : inputs[2].value,
                email : inputs[3].value
            })
        }).then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    props.setMyProfile(data)
                    props.socket.send(JSON.stringify({action : 'login'}))
                    props.navigate('/')
                    // props.navigate('/profiles/' + data.id)
                })
            }
            else {
                response.json().then(data => 
                    document.getElementById('signUpError').innerHTML = props.language['signUpError_' + data.error])
            }
        })
    }

    const typing = e => {
        if (e.target.id === 'password')
            document.getElementById('wrongPW').innerHTML = ''
        if (e.target.id === 'username')
            document.getElementById('wrongName').innerHTML = ''
        document.getElementById(e.target.id).setAttribute('class', 'form-control w-50')
        document.getElementById('signUpError').innerHTML = ''
        if (e.keyCode === 13) {
            e.preventDefault()
            signUp()
        }
    }

    return (
        <section className="me-2">
            <Title title={props.language.signUp} />
            <form className="rounded border border-3 mt-5 w-50 d-flex flex-column align-items-center p-3 fw-bold gap-2" style={{margin : 'auto'}}>
                <label htmlFor="username">{props.language.username}</label>
                <input className="form-control w-50" onKeyDown={typing} type="text" name="username" id="username" title={props.language.nameRegex} />
                <span id='wrongName' className="text-danger"></span>
                <label htmlFor="email">E-mail</label>
                <input className="form-control w-50" onKeyDown={typing} type="email" name="email" id="email" />
                <label htmlFor="password">{props.language.password}</label>
                <input className="form-control w-50" onKeyDown={typing} type="password" name="password" id="password" title={props.language.PWRegex} />
                <span id='wrongPW' className="text-danger"></span>
                <label htmlFor="passwordConfirm">{props.language.passwordConfirm}</label>
                <input className="form-control w-50" onKeyDown={typing} type="password" name="passwordConfirm" id="passwordConfirm" />
                <span className="h6">({props.language.allFieldsMandatory})</span>
                <span id='noMatch' className="text-danger"></span>
                <button onClick={signUp} type='button' className="btn btn-secondary mt-3">{props.language.createAccount}</button>
                <span id='signUpError'></span>
            </form>
        </section>
    )

}

export function Suggest({props}) {

    const [done, setDone] = useState(0)
    const token = Cookies.get('csrftoken')

    const send = () => {
        let inputs = [
            document.getElementById('title'),
            document.getElementById('details')
        ]
        if (!validateForm(inputs))
            return
        let toSend = {
            title : inputs[0].value,
            details : inputs[1].value
        }
        fetch('/projects/newSuggestion', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify(toSend)
        }).then(response => {
            if (response.status === 201) {
                setDone(-1)
                props.setMyProfile({...props.myProfile, onGoingSuggestion : true})
            }
            else if (response.status === 403)
                response.json().then(error => setDone(error.error))
        })
    }

    const typing = e => document.getElementById(e.target.id).setAttribute('class', 'form-control')

    if (done !== 0) {
        return (
            <section>
                <h1>{done < 0 ? props.language.suggestionSent : props.language['suggestionNotSent_' + done]}</h1>
                <button type='button' className="btn btn-secondary" onClick={() => props.navigate('/')}>OK</button>
            </section>
        )
    }

    return (
        <section>
            <Title title={props.language.suggest} />
            <p className="fw-bold ps-3">{props.language.suggestHead}</p>
            <form action='/suggestSubmit'>
                <fieldset className="d-flex flex-column align-items-center gap-3 mt-5 me-2">
                    <input onKeyDown={typing} className={`form-control w-75`} type="text" name="title" id='title' maxLength='25' placeholder={props.language.suggestTitle} />
                    <textarea onKeyDown={typing} className="form-control" name="details" id="details" rows='10' placeholder={props.language.suggestDetails}></textarea>
                    <button type='button' className="btn btn-secondary" onClick={send} disabled={!props.myProfile || props.myProfile.onGoingSuggestion}>
                        {props.language.suggestSend}
                    </button>
                    {!props.myProfile && <p>{props.language.suggestLoggedOut}</p>}
                    {props.myProfile && props.myProfile.onGoingSuggestion && <p>{props.language.suggestionNotSent_2}</p>}
                </fieldset>
            </form>
        </section>
    )

}