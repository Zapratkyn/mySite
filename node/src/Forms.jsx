import Title from "./Helpers"

function SignIn({props}) {

    return (
        <form action="/signIn">Sign In</form>
    )

}

export function Login({props}) {

    return (
        <form action="/login">Login</form>
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

export default SignIn