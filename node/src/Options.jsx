import { useNavigate } from "react-router-dom"
import { getLanguage } from "./trad"

function Options({props}) {

    return (
        <div className="bg-dark d-flex justify-content-center" style={{height : '25px'}}>
            <div className="w-75 d-flex justify-content-end">
                <Menu props={props} />
                <span className="text-white fw-bold ms-5">|</span>
                <Languages props={props} />
            </div>
        </div>
    )
}

function Menu({props}) {
    
    const navigate = useNavigate()

    const log = () => {
        if (props.profile) {
            fetch('profiles/signout').then(response => {
                if (response.status === 200) {
                    props.setMyProfile(undefined)
                    if (props.currentPage !== '/') {
                        navigate('/')
                        props.setCurrentPage('/')
                    }
                }
                else
                    navigate("/error")
            })
        }
        else {
            navigate('/signin')
            props.setCurrentPage('/signin')
        }
    }

    const logout = () => {
        fetch('profiles/signout', {method : 'POST'}).then(response => {
            if (response.status === 200)
                navigate('/')
        })
    }

    return (
        <ul className="text-white fw-bold d-flex gap-2" style={{listStyle : 'none'}}>
            {/* {props.myProfile.id === 1 && <li type='button'><a href="/admin" target="_blank" ref='noreferrer'></a></li>} */}
            <li type='button' onClick={log}>{props.myProfile ? props.language.logout : props.language.signIn}</li>
            {!props.myProfile && <li onClick={() => navigate('/signup')} type='button'>{props.language.signUp}</li>}
            <li type='button' onClick={logout}>Log out</li>
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