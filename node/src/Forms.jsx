import { useNavigate } from "react-router-dom"
import Title from "./Helpers"

export function SignIn({props}) {

    const navigate = useNavigate()

    const isWrong = () => {
        let issue = false
        let forms = ['username', 'password']
        for (let form of forms) {
            let input = document.getElementById(form)
            if (input.value === '') {
                input.setAttribute('class', 'form-control border border-3 border-danger w-50')
                issue = false
            }
        }
        return issue
    }

    const signIn = () => {
        if (!isWrong()) {
            fetch('/profiles/signIn', {
                method : 'POST', 
                body : JSON.stringify({
                    username : document.getElementById('username').value,
                    password : document.getElementById('password').value
                })
            }).then(response => {
                if (response.status === 404)
                    document.getElementById('signInError').innerHTML = props.language.signInError
                else {
                    response.json().then(data => {
                        props.setMyProfile(data)
                        navigate('/profiles/' + data.id)
                    })
                }
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
        <section>
            <Title title={props.language.signIn} />
            <form className="rounded border border-3 mt-5 w-50 d-flex flex-column align-items-center p-3 fw-bold gap-2" style={{margin : 'auto'}}>
                <label htmlFor="username">{props.language.username}</label>
                <input className="form-control w-50" onKeyDown={typing} type="text" name="username" id="username" />
                <label htmlFor="password">{props.language.password}</label>
                <input className="form-control w-50" onKeyDown={typing} type="text" name="password" id="password" />
                <button onClick={signIn} type='button' className="btn btn-secondary mt-3">{props.language.connexion}</button>
                <span id='signInError'></span>
                <span onClick={() => navigate('/signup')} type='button' className="mt-3 text-primary text-decoration-underline">{props.language.createAccount}</span>
            </form>
        </section>
    )

}

export function SignUp({props}) {

    return (
        <form className="bg-danger" action="/login">
            <label htmlFor="username">{props.language.username}</label>
            <input type="text" name="username" id="username" />
        </form>
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