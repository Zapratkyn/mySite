import { Route, Routes } from "react-router-dom"
import Home from "./Home.jsx"
import Bio from "./Bio.jsx"
import Projects from "./Projects.jsx"
import { ProjectPage } from "./Projects.jsx"
import CurrentProject from "./Widgets.jsx"
import { Contact } from "./Widgets.jsx"
import NoPage from "./NoPage.jsx"

function Body({props}) {

    return (
        <div className="w-100 d-flex align-items-center flex-column">
            <Links />
            <div className="w-75 p-3 d-flex gap-3" style={{height : '2000px'}}>
                <MainFrame props={props} />
                <Widgets props={props} />
            </div>
        </div>
    )
}

function Links() {
    return (
        <nav className="w-75 d-flex gap-2 justify-content-end my-2 pe-3" style={{listStyle : 'none'}}>
                <li>
                    <a href="https://www.linkedin.com/in/gilles-poncelet-b8a984a3" target='_blank' rel='noreferrer'>
                        <img src="images/linkedin.png" alt="" style={{height : '30px'}} />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Zapratkyn" target='_blank' rel='noreferrer'>
                        <img src="images/github.png" alt="" style={{height : '30px'}} />
                    </a>
                </li>
            </nav>
    )
}

function MainFrame({props}) {
    return (
        <main className="w-75 rounded p-2">
            <Routes>
                <Route path='/' element={<Home props={props} />} />
                <Route path='/bio' element={<Bio props={props} />} />
                <Route path='/projects' element={<Projects props={props} />} />
                <Route path='/projects/:name' element={<ProjectPage props={props} />} />
				<Route path="*" element={<NoPage props={props} />} />
            </Routes>
        </main>
    )
}

function Widgets({props}) {
    return (
        <div className="w-25 d-flex flex-column gap-2">
            <CurrentProject props={props} />
            <Contact props={props} />
        </div>
    )
}

export default Body