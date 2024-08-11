import { getLanguage } from "./trad"

function Options({props}) {

    return (
        <div className="bg-black d-flex justify-content-center" style={{height : '25px'}}>
            <div className="w-75 d-flex justify-content-end">
                <Menu props={props} />
            </div>
        </div>
    )
}

function Menu({props}) {
    return (
        <ul className="text-white fw-bold d-flex gap-2" style={{listStyle : 'none'}}>
            <li type='button' className={`${props.language.home === 'Home' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('en'))}>EN</li>
            <li type='button' className={`${props.language.home === 'Accueil' && 'text-danger'}`} onClick={() => props.setLanguage(getLanguage('fr'))}>FR</li>
        </ul>
    )
}

export default Options