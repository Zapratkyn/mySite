import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {Title} from "./Helpers"
import { getLanguage } from "./trad"

export function SignIn({props}) {

    const navigate = useNavigate()

    useEffect(() => {
        if (props.myProfile) {
            props.setCurrentPage('/')
            navigate('/')
        }
    }, [props, navigate])

    const isWrong = () => {
        let issue = false
        let forms = ['username', 'password']
        for (let form of forms) {
            let input = document.getElementById(form)
            if (input.value === '') {
                input.setAttribute('class', 'form-control border border-3 border-danger w-50')
                issue = true
            }
        }
        return issue
    }

    const signIn = () => {
        if (!isWrong()) {
            fetch('/profiles/signin', {
                method : 'POST', 
                body : JSON.stringify({
                    username : document.getElementById('username').value,
                    password : document.getElementById('password').value
                })
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        props.setMyProfile(data)
                        props.setLanguage(getLanguage(data.language))
                        props.socket.send(JSON.stringify({action : 'login'}))
                        // navigate('/profiles/' + data.id)
                        navigate('/')
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
                    <span onClick={() => navigate('/signup')} type='button' className="ms-1 mt-3 text-primary text-decoration-underline">
                        {props.language.createAccount}
                    </span>
                </span>
            </form>
        </section>
    )

}

export function SignUp({props}) {

    const navigate = useNavigate()

    useEffect(() => {
        if (props.myProfile) {
            props.setCurrentPage('/')
            navigate('/')
        }
    }, [props, navigate])

    const isWrong = () => {
        let issue = false
        let forms = ['username', 'password', 'passwordConfirm', 'email']
        for (let form of forms) {
            let input = document.getElementById(form)
            if (input.value === '') {
                input.setAttribute('class', 'form-control border border-3 border-danger w-50')
                issue = false
            }
        }
        let password = document.getElementById('password')
        let passwordConfirm = document.getElementById('passwordConfirm')
        if (password.value !== passwordConfirm.value) {
            password.setAttribute('class', 'form-control border border-3 border-danger w-50')
            passwordConfirm.setAttribute('class', 'form-control border border-3 border-warning w-50')
            document.getElementById('signUpError').innerHTML = props.language.signUpError_2
        }
        return issue
    }

    const signUp = () => {
        if (!isWrong()) {
            fetch('/profiles/signup', {
                method : 'POST', 
                body : JSON.stringify({
                    username : document.getElementById('username').value,
                    password : document.getElementById('password').value,
                    passwordConfirm : document.getElementById('passwordConfirm').value,
                    email : document.getElementById('email').value
                })
            }).then(response => {
                if (response.status === 201) {
                    response.json().then(data => {
                        props.setMyProfile(data)
                        props.socket.send(JSON.stringify({action : 'login'}))
                        navigate('/')
                        // navigate('/profiles/' + data.id)
                    })
                }
                else {
                    response.json().then(data => 
                        document.getElementById('signUpError').innerHTML = props.language['signUpError_' + data.error])
                }
            })
        }
    }

    const typing = e => {
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
                <input className="form-control w-50" onKeyDown={typing} type="text" name="username" id="username" />
                <label htmlFor="email">E-mail</label>
                <input className="form-control w-50" onKeyDown={typing} type="email" name="email" id="email" />
                <label htmlFor="password">{props.language.password}</label>
                <input className="form-control w-50" onKeyDown={typing} type="password" name="password" id="password" />
                <label htmlFor="passwordConfirm">{props.language.passwordConfirm}</label>
                <input className="form-control w-50" onKeyDown={typing} type="password" name="passwordConfirm" id="passwordConfirm" />
                <span className="h6">({props.language.allFieldsMandatory})</span>
                <button onClick={signUp} type='button' className="btn btn-secondary mt-3">{props.language.createAccount}</button>
                <span id='signUpError'></span>
            </form>
        </section>
    )

}

export function Suggest({props}) {

    return (
        <section>
            <Title title={props.language.suggest} />
            <p className="fw-bold ps-3">{props.language.suggestHead}</p>
            <form action='/suggestSubmit'>
                <fieldset className="d-flex flex-column align-items-center gap-3 mt-5">
                    <input className="w-25" type="text" name="title" maxLength='25' placeholder={props.language.suggestTitle} />
                    <textarea name="details" id="details" cols='80' rows='10' placeholder={props.language.suggestDetails}></textarea>
                    <input disabled={!props.myProfile} type="submit" className="btn btn-secondary" value={props.language.suggestSend} />
                    {!props.myProfile && <p>{props.language.suggestLoggedOut}</p>}
                    {props.myProfile && !props.myProfile.canSuggest && <p>{props.language.alreadySuggested}</p>}
                </fieldset>
            </form>
        </section>
    )

}