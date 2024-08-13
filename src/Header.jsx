import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Header({props}) {

    return (
        <header className="bg-white d-flex justify-content-center" style={{height : '150px', position : 'sticky', top : '0px'}}>
            <div className="w-75 h-100 d-flex justify-content-between align-items-center">
                <img className="rounded-circle h-75" src="images/pic.png" alt="" />
                <div className="d-flex flex-column align-items-center">
                    <h1 className="fw-bold">Gilles Poncelet</h1>
                    <h3 className="fw-bold">{props.language.dev}</h3>
                </div>
                <Menu props={props} />
            </div>
        </header>
    )

}

function Menu({props}) {

    const [currentPage, setCurrentPage] = useState('/')
    const navigate = useNavigate()

    const browse = page => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setCurrentPage(page)
        navigate(page)
    }

    return (
        <nav className="fw-bold fs-5 d-flex gap-3" style={{listStyle : 'none'}}>
            <li type='button' className={`navLink ${currentPage === '/' && 'text-decoration-underline'}`} onClick={() => browse('/')}>
                <img src="./home.svg" alt="" />
                <span type='button' className="text-black text-decoration-none">{props.language.home}</span>
            </li>
            <li type='button' className={`navLink ${currentPage === '/bio' && 'text-decoration-underline'}`} onClick={() => browse('/bio')}>
                <img src="./bio.svg" alt="" />
                <span type='button' className="text-black text-decoration-none">Bio</span>
            </li>
            <li type='button' className={`navLink ${currentPage === '/projects' && 'text-decoration-underline'}`} onClick={() => browse('/projects')}>
                <img src="./projects.svg" alt="" />
                <span type='button' className="text-black text-decoration-none">{props.language.projects}</span>
            </li>
        </nav>
    )
}

export default Header