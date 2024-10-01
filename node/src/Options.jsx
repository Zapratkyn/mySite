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
                <span className="text-white fw-bold mx-2">|</span>
                <Languages props={props} />
                <span className="text-white fw-bold mx-2">|</span>
                <NightModeToggle props={props} />
            </div>
        </div>
    )
}

function NightModeToggle({props}) {

    return (
        <img className="my-1" type='button' onClick={() => props.setNightMode(!props.nightMode)} src={'/images/' + (props.nightMode ? 'moon-fill' : 'brightness-high-fill' ) + '.svg'} alt="" />
    )

}

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
                props.socket.close()
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
                props.socket.close()
                props.setMessages(props.messages.filter(message => message.type !== 'whisp' && message.type !== 'iWhisp'))
                props.navigate('/')
            }
        })
    }

    const browse = () => {
        props.setCurrentPage('/profile')
        props.navigate('/profile/' + props.myProfile.id)
    }

    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            {/* <li><Greetings props={props} /></li> */}
            {/* <li>|</li> */}
            <li type='button' className="optionButton" onClick={browse}>{props.language.profile}</li>
            <li type='button' className="optionButton" onClick={logout}>{props.language.logout}</li>
        </ul>
    )

}

function MenuOut({props}) {

    const browse = page => {
        props.setCurrentPage('/sign')
        props.navigate(page)
    }
    
    return (
        <ul className="d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className="optionButton" onClick={() => browse('/signin')}>{props.language.signIn}</li>
            <li type='button' className="optionButton" onClick={() => browse('/signup')}>{props.language.signUp}</li>
        </ul>
    )

}

function Languages({props}) {
    return (
        <div className="text-white fw-bold d-flex gap-2" style={{listStyle : 'none'}}>
            <span type='button' className={`${props.language.home === 'Home' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('en'))}>EN</span>
            <span type='button' className={`${props.language.home === 'Accueil' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('fr'))}>FR</span>
        </div>
    )
}

export default Options