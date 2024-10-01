import { useMediaQuery } from 'react-responsive'

function Header({props}) {

    const lg = useMediaQuery({query: '(min-width: 680px)'})
    const burger = useMediaQuery({query: '(max-width: 500px)'})
    const menu = <Menu props={props} burger={burger} />

    return (
        <header className={`border-bottom d-flex justify-content-center pt-2 ${props.nightMode ? 'section-dark' : 'section-light'}`} style={{minHeight : lg ? '125px' : '100px', position : 'sticky', top : '0px', zIndex : '2'}}>
            <div className={`h-100 d-flex justify-content-between align-items-center ${useMediaQuery({query: '(min-width: 769px)'}) ? 'w-75' : 'w-100 px-5'}`}>
                <Initials lg={lg} props={props} />
                {lg && <SiteName props={props} />}
                {burger ? <Burger menu={menu} /> : menu}
            </div>
        </header>
    )

}

function Burger({menu}) {

    return (
        <div>
            <button type='button' className='nav-link' data-bs-toggle='dropdown' aria-expanded="false">
                <img src="/images/list.svg" alt="" />
            </button>
            {menu}
        </div>
    )

}

function Initials({lg, props}) {

    const size = lg ? '100px' : '70px'

    return (
        <p
            type='button'
            onClick={() => props.navigate('/')}
            className="h1 rounded-circle border border-3 border-black p-3 fw-bold d-flex align-items-center justify-content-center" 
            style={{height : size, width : size}}>
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

function Menu({props, burger}) {

    const browse = page => {
        document.documentElement.scrollTop = 0
        props.setCurrentPage(page)
        props.navigate(page)
    }

    return (
        <nav className={`fw-bold fs-5 ${burger ? 'dropdown-menu' : 'd-flex gap-2'}`}>
            <li type='button' className={`navLink d-flex justify-content-end pe-2 ${props.currentPage === '/' && 'text-decoration-underline'}`} onClick={() => browse('/')}>
                {props.language.home}
            </li>
            <li type='button' className={`navLink d-flex justify-content-end pe-2 ${props.currentPage === '/bio' && 'text-decoration-underline'}`} onClick={() => browse('/bio')}>
                Bio
            </li>
            <li type='button' className={`navLink d-flex justify-content-end pe-2 ${props.currentPage === '/project' && 'text-decoration-underline'}`} onClick={() => browse('/project')}>
                {props.language.projects}
            </li>
        </nav>
    )
}

export default Header