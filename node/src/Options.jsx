import { useNavigate } from "react-router-dom"
import { getLanguage } from "./trad"

function Options({props}) {

    return (
        <div className="bg-dark d-flex justify-content-center" style={{height : '25px'}}>
            <div className="w-75 d-flex justify-content-end fw-bold text-white">
                {props.myProfile ?
                    props.myProfile.id === 'admin' ?
                        <MenuAdmin props={props} /> :
                        <MenuIn props={props} /> :
                    <MenuOut props={props} />}
                <span className="text-white fw-bold ms-2">|</span>
                <Languages props={props} />
            </div>
        </div>
    )
}

function Greetings({props}) {

    return (
        <span className="d-flex gap-1">
            <span>{props.language.hello}</span>
            <span>{props.myProfile.name}</span>
        </span>
    )

}

function MenuAdmin({props}) {

    const navigate = useNavigate()

    const logout = () => {
        fetch('/profiles/signout', {method : 'POST'}).then(response => {
            if (response.status === 200) {
                props.setMyProfile(undefined)
                props.setCurrentPage('/')
                navigate('/')
            }
        })
    }

    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className="optionButton" onClick={() => navigate('/admin')}>Admin</li>
            <li type='button' className="optionButton" onClick={logout}>{props.language.logout}</li>
        </ul>
    )

}

function MenuIn({props}) {
    
    const navigate = useNavigate()

    const logout = () => {
        fetch('/profiles/signout', {method : 'POST'}).then(response => {
            if (response.status === 200) {
                props.setMyProfile(undefined)
                props.setCurrentPage('/')
                navigate('/')
            }
        })
    }

    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li><Greetings props={props} /></li>
            <li>|</li>
            <li type='button' className="optionButton" onClick={() => navigate('/profile/' + props.myProfile.id)}>{props.language.profile}</li>
            <li type='button' className="optionButton" onClick={logout}>{props.language.logout}</li>
        </ul>
    )

}

function MenuOut({props}) {

    const navigate = useNavigate()
    
    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className="optionButton" onClick={() => navigate('/signin')}>{props.language.signIn}</li>
            <li type='button' className="optionButton" onClick={() => navigate('/signup')}>{props.language.signUp}</li>
        </ul>
    )

}

function Languages({props}) {
    return (
        <ul className="text-white fw-bold d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className={`${props.language.home === 'Home' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('en'))}>EN</li>
            <li type='button' className={`${props.language.home === 'Accueil' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('fr'))}>FR</li>
        </ul>
    )
}

export default Options