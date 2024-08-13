import { useNavigate } from "react-router-dom"

function Header({props}) {

    return (
        <div className="bg-white d-flex justify-content-center" style={{height : '150px', position : 'sticky', top : '0px'}}>
            <div className="w-75 h-100 d-flex justify-content-between align-items-center">
                <img className="rounded-circle h-75" src="images/pic.png" alt="" />
                <div>
                    <h1 className="fw-bold">Gilles Poncelet</h1>
                    <h3>{props.language.dev}</h3>
                </div>
                <Menu props={props} />
            </div>
        </div>
    )

}

function Menu({props}) {

    const navigate = useNavigate()

    return (
        <nav className="fw-bold fs-5 d-flex gap-3" style={{listStyle : 'none'}}>
            <li type='button' className="navLink" onClick={() => navigate('/')}>
                <img src="./home.svg" alt="" />
                {props.language.home}
            </li>
            <li type='button' className="navLink" onClick={() => navigate('/bio')}>
                <img src="./bio.svg" alt="" />
                Bio
            </li>
            <li type='button' className="navLink" onClick={() => navigate('/projects')}>
                <img src="./projects.svg" alt="" />
                {props.language.projects}
            </li>
        </nav>
    )
}

export default Header