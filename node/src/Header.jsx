import { useNavigate } from "react-router-dom"

function Header({props}) {

    return (
        <header className="border-bottom d-flex justify-content-center" style={{height : '150px', position : 'sticky', top : '0px'}}>
            <div className="w-75 h-100 d-flex justify-content-between align-items-center">
                <Initials />
                <SiteName props={props} />
                <Menu props={props} />
            </div>
        </header>
    )

}

function Initials() {

    return (
        <p 
            className="h1 rounded-circle border border-3 border-black p-3 fw-bold d-flex align-items-center justify-content-center" 
            style={{height : '100px', width : '100px'}}>
                GP
        </p>
    )

}

function SiteName({props}) {

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fw-bold">Gilles Poncelet</h1>
            <h3 className="fw-bold">{props.language.dev}</h3>
        </div>
    )

}

function Menu({props}) {

    const navigate = useNavigate()

    const browse = page => {
        document.documentElement.scrollTop = 0
        props.setCurrentPage(page)
        navigate(page)
    }

    // useEffect(() => {
    //     if (window.location.pathname === '/bio')
    //         props.setCurrentPage('/bio')
    //     else if (window.location.pathname !== '/')
    //         props.setCurrentPage('/projects')
    // }, [props])

    return (
        <nav className="fw-bold fs-5 d-flex gap-3" style={{listStyle : 'none'}}>
            <li type='button' className={`navLink ${props.currentPage === '/' && 'text-decoration-underline'}`} onClick={() => browse('/')}>
                <img src="./home.svg" alt="" />
                <span type='button' className="text-decoration-none">{props.language.home}</span>
            </li>
            <li type='button' className={`navLink ${props.currentPage === '/bio' && 'text-decoration-underline'}`} onClick={() => browse('/bio')}>
                <img src="./bio.svg" alt="" />
                <span type='button' className="text-decoration-none">Bio</span>
            </li>
            <li type='button' className={`navLink ${props.currentPage === '/projects' && 'text-decoration-underline'}`} onClick={() => browse('/projects')}>
                <img src="./projects.svg" alt="" />
                <span type='button' className="text-decoration-none">{props.language.projects}</span>
            </li>
        </nav>
    )
}

export default Header