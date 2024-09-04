import { Route, Routes } from "react-router-dom"
import Home from "./Home.jsx"
import Bio from "./Bio.jsx"
import { Projects, ProjectPage } from "./Projects.jsx"
import { CurrentProject, Contact, Poll } from "./Widgets.jsx"
import NoPage from "./NoPage.jsx"
import Error from "./Error.jsx"
import { SignUp, SignIn, Suggest } from "./Forms.jsx"
import Admin from "./Admin.jsx"
import { EditProject, ReadSuggestion } from "./Admin.jsx"

function Body({props}) {

    return (
        <div className="w-100 d-flex align-items-center flex-column">
            <Links />
            <div className="w-75 p-3 d-flex gap-3">
                <MainFrame props={props} />
                <Widgets props={props} />
            </div>
        </div>
    )
}

function Links() {
    return (
        <nav className="w-75 d-flex gap-2 justify-content-end mt-3 pe-3" style={{listStyle : 'none'}}>
                <li>
                    <a href="https://www.linkedin.com/in/gilles-poncelet-b8a984a3" target='_blank' rel='noreferrer'>
                        <img src="/images/linkedin.png" alt="LinkedIn" style={{height : '30px'}} />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Zapratkyn" target='_blank' rel='noreferrer'>
                        <img src="/images/github.png" alt="GitHub" style={{height : '30px'}} />
                    </a>
                </li>
            </nav>
    )
}

function MainFrame({props}) {
    return (
        <main className="w-75 p-2 border-end">
            <Routes>
                <Route path='/' element={<Home props={props} />} />
                <Route path='/bio' element={<Bio props={props} />} />
                <Route path='/project' element={<Projects props={props} />} />
                <Route path="/project/:id" element={<ProjectPage props={props} />} />
                <Route path='/suggest' element={<Suggest props={props} />} />
                <Route path='/signup' element={<SignUp props={props} />} />
                <Route path='/signin' element={<SignIn props={props} />} />
                <Route path='/error' element={<Error props={props} />} />
                <Route path='/admin' element={<Admin props={props} />} />
                <Route path='/admin/newProject' element={<EditProject type='new' props={props} />} />
                <Route path='/admin/editProject/:id' element={<EditProject type='edit' props={props} />} />
                <Route path='/admin/suggestion/:id' element={<ReadSuggestion props={props} />} />
				<Route path="*" element={<NoPage props={props} />} />
            </Routes>
        </main>
    )
}

function Widgets({props}) {
    return (
        <div className="w-25 d-flex flex-column gap-2 mt-3">
            <CurrentProject props={props} />
            <Contact props={props} />
            <Poll props={props} />
        </div>
    )
}

export default Body