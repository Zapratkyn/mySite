import { getLanguage } from "./trad"
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'

function Options({props}) {

    return (
        <div className="bg-dark d-flex justify-content-center" style={{height : '25px'}}>
            <div className={`d-flex justify-content-end fw-bold text-white ${useMediaQuery({query: '(min-width: 481px)'}) ? 'w-75' : 'w-100 pe-3'}`}>
                {props.myProfile ?
                    props.myProfile.id === 'admin' ?
                        <MenuAdmin props={props} /> :
                        <MenuIn props={props} /> :
                        <MenuOut props={props} />}
                <span className="text-white fw-bold ms-4">|</span>
                <Languages props={props} />
            </div>
        </div>
    )
}

// function Greetings({props}) {

//     return (
//         <span className="d-flex gap-1">
//             <span>{props.language.hello}</span>
//             <span>{props.myProfile.name}</span>
//         </span>
//     )

// }

function MenuAdmin({props}) {

    const token = Cookies.get('csrftoken')
    
    const logout = () => {
        fetch('/profiles/signout', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin'
        }).then(response => {
            if (response.status === 200) {
                props.setMyProfile(undefined)
                props.setCurrentPage('/')
                props.navigate('/')
            }
        })
    }

    const browse = () => {
        props.setCurrentPage('/admin')
        props.navigate('/admin')
    }

    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className="optionButton" onClick={browse}>Admin</li>
            <li type='button' className="optionButton" onClick={logout}>{props.language.logout}</li>
        </ul>
    )

}

function MenuIn({props}) {

    const token = Cookies.get('csrftoken')
    
    const logout = () => {
        fetch('/profiles/signout', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin'
        }).then(response => {
            if (response.status === 200) {
                props.setMyProfile(undefined)
                props.setCurrentPage('/')
                props.socket.send(JSON.stringify({action : 'logout'}))
                props.navigate('/')
            }
        })
    }

    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            {/* <li><Greetings props={props} /></li> */}
            {/* <li>|</li> */}
            <li type='button' className="optionButton" onClick={() => props.navigate('/profile/' + props.myProfile.id)}>{props.language.profile}</li>
            <li type='button' className="optionButton" onClick={logout}>{props.language.logout}</li>
        </ul>
    )

}

function MenuOut({props}) {
    
    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className="optionButton" onClick={() => props.navigate('/signin')}>{props.language.signIn}</li>
            <li type='button' className="optionButton" onClick={() => props.navigate('/signup')}>{props.language.signUp}</li>
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